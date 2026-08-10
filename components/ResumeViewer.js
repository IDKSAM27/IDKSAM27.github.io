import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiDownload, FiFileText, FiMinus, FiPlus, FiRefreshCw, FiX } from 'react-icons/fi';
import styles from '../styles/ResumeViewer.module.css';

const MIN_SCALE = 0.75;
const MAX_SCALE = 3;
const SCALE_STEP = 0.15;
const PDF_SRC = '/resume.pdf';

export function ResumePageIcon() {
  return (
    <span className={styles.pageIconWrap} aria-hidden="true">
      <FiFileText className={styles.pageSheet} />
    </span>
  );
}

export function ResumeButton({
  buttonRef,
  onOpen,
  onHoverEnter,
  onHoverLeave,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="View resume"
      className={styles.resumeButton}
      onClick={onOpen}
      {...rest}
      onMouseEnter={(event) => {
        onHoverEnter?.(event);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        onHoverLeave?.(event);
        onMouseLeave?.(event);
      }}
    >
      <ResumePageIcon />
    </button>
  );
}

function PdfSurface({ scale, offset, dragging, onWheel, onDoubleClick, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onTouchStart, onTouchMove, onTouchEnd }) {
  const surfaceRef = useRef(null);
  const canvasRefs = useRef([]);
  const pageLayerRefs = useRef([]);
  const linkLayerRefs = useRef([]);
  const pdfDocRef = useRef(null);
  const loadingTaskRef = useRef(null);
  const [pdfjsLib, setPdfjsLib] = useState(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const loadModule = async () => {
      const pdfModule = await import('pdfjs-dist/webpack.mjs');
      if (!cancelled) setPdfjsLib(pdfModule);
    };

    loadModule().catch(() => {
      if (!cancelled) setPdfjsLib(null);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!pdfjsLib) return;
      const loadingTask = pdfjsLib.getDocument({ url: PDF_SRC });
      loadingTaskRef.current = loadingTask;
      const pdfDoc = await loadingTask.promise;
      if (cancelled) return;
      pdfDocRef.current = pdfDoc;

      const renderedPages = await Promise.all(
        Array.from({ length: pdfDoc.numPages }, async (_, index) => {
          const pageNumber = index + 1;
          const page = await pdfDoc.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 1 });
          const annotations = await page.getAnnotations({ intent: 'display' });

          return {
            number: pageNumber,
            width: viewport.width,
            height: viewport.height,
            annotations: annotations.filter(
              (annotation) =>
                annotation.subtype === 'Link' &&
                (annotation.url || annotation.action === 'GoToR' || annotation.dest)
            ),
          };
        })
      );

      if (!cancelled) setPages(renderedPages);
    };

    load().catch(() => {
      if (!cancelled) setPages([]);
    });

    return () => {
      cancelled = true;
      if (loadingTaskRef.current?.destroy) {
        loadingTaskRef.current.destroy();
      }
      loadingTaskRef.current = null;
      pdfDocRef.current = null;
    };
  }, [pdfjsLib]);

  useEffect(() => {
    let cancelled = false;
    let renderTasks = [];

    const renderPages = async () => {
      if (!pages.length || !pdfDocRef.current) return;
      const canvases = canvasRefs.current;
      const pageLayers = pageLayerRefs.current;

      renderTasks = [];
      for (let index = 0; index < pages.length; index += 1) {
        const pageMeta = pages[index];
        const canvas = canvases[index];
        const pageLayer = pageLayers[index];
        if (!canvas || !pageLayer) continue;

        const page = await pdfDocRef.current.getPage(pageMeta.number);
        if (cancelled) return;

        const containerWidth = surfaceRef.current?.clientWidth ?? window.innerWidth;
        const containerHeight = surfaceRef.current?.clientHeight ?? window.innerHeight;
        const fitScale = Math.min(containerWidth / pageMeta.width, containerHeight / pageMeta.height);
        const renderScale = fitScale * scale;
        const viewport = page.getViewport({ scale: renderScale });
        const deviceScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * deviceScale);
        canvas.height = Math.floor(viewport.height * deviceScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        pageLayer.style.width = `${Math.floor(viewport.width)}px`;
        pageLayer.style.height = `${Math.floor(viewport.height)}px`;

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) continue;
        context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);

        const renderTask = page.render({
          canvasContext: context,
          viewport,
        });
        renderTasks.push(renderTask);
        await renderTask.promise;

        const linkLayer = linkLayerRefs.current[index];
        if (linkLayer) {
          linkLayer.innerHTML = '';
          for (const annotation of pageMeta.annotations) {
            const rect = viewport.convertToViewportRectangle(annotation.rect);
            const left = Math.min(rect[0], rect[2]);
            const top = Math.min(rect[1], rect[3]);
            const width = Math.abs(rect[2] - rect[0]);
            const height = Math.abs(rect[3] - rect[1]);
            if (!width || !height) continue;

            const anchor = document.createElement('a');
            anchor.className = styles.pdfLink;
            anchor.href = annotation.url || '#';
            anchor.target = annotation.url && annotation.url.startsWith('http') ? '_blank' : '_self';
            anchor.rel = 'noopener noreferrer';
            anchor.style.left = `${left}px`;
            anchor.style.top = `${top}px`;
            anchor.style.width = `${width}px`;
            anchor.style.height = `${height}px`;
            anchor.setAttribute('aria-label', annotation.url || 'Resume link');
            if (!annotation.url) {
              anchor.addEventListener('click', (event) => {
                event.preventDefault();
              });
            }
            linkLayer.append(anchor);
          }
        }

        if (cancelled) return;
      }
    };

    renderPages().catch(() => {});

    return () => {
      cancelled = true;
      for (const task of renderTasks) {
        task.cancel?.();
      }
    };
  }, [pages, scale]);

  return (
    <div
      ref={surfaceRef}
      className={styles.pdfViewport}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      onWheel={onWheel}
      onDoubleClick={onDoubleClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.pdfStack}>
        {pages.map((page, index) => (
          <div
            key={page.number}
            ref={(node) => {
              pageLayerRefs.current[index] = node;
            }}
            className={styles.pdfPage}
          >
            <canvas
              ref={(node) => {
                canvasRefs.current[index] = node;
              }}
              className={styles.pdfCanvas}
              aria-label={`Resume page ${page.number}`}
            />
            <div
              ref={(node) => {
                linkLayerRefs.current[index] = node;
              }}
              className={styles.pdfLinkLayer}
            />
          </div>
        ))}
      </div>
      {pages.length === 0 ? <div className={styles.loadingState}>Loading resume...</div> : null}
    </div>
  );
}

export default function ResumeViewer({ isOpen, origin, onClose }) {
  const overlayRef = useRef(null);
  const sheetRef = useRef(null);
  const dragStateRef = useRef(null);
  const pinchStateRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const clampScale = useCallback((value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value)), []);

  const resetView = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
    dragStateRef.current = null;
    pinchStateRef.current = null;
  }, []);

  const prefersReducedMotion = useCallback(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const animateOpen = useCallback(() => {
    if (!sheetRef.current || !overlayRef.current) return;

    if (prefersReducedMotion() || !origin) {
      overlayRef.current.style.opacity = '1';
      sheetRef.current.style.opacity = '1';
      sheetRef.current.style.transform = 'none';
      sheetRef.current.style.filter = 'none';
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const startScaleX = Math.max(0.04, origin.width / width);
    const startScaleY = Math.max(0.04, origin.height / height);
    const startX = origin.x - width / 2;
    const startY = origin.y - height / 2;

    const sheet = sheetRef.current;
    const overlay = overlayRef.current;

    overlay.style.opacity = '0';
    sheet.style.opacity = '0';
    sheet.style.filter = 'blur(16px)';
    sheet.style.transformOrigin = 'center center';
    sheet.style.transform = `translate(${startX}px, ${startY}px) scale(${startScaleX}, ${startScaleY}) rotate(-8deg)`;

    sheet.getBoundingClientRect();

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      sheet.style.opacity = '1';
      sheet.style.filter = 'blur(0px)';
      sheet.style.transform = 'translate(0px, 0px) scale(1, 1) rotate(0deg)';
    });
  }, [origin, prefersReducedMotion]);

  const animateClose = useCallback(() => {
    if (!sheetRef.current || !overlayRef.current || !origin) {
      resetView();
      onClose();
      return;
    }

    if (prefersReducedMotion()) {
      resetView();
      onClose();
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const startScaleX = Math.max(0.04, origin.width / width);
    const startScaleY = Math.max(0.04, origin.height / height);
    const endX = origin.x - width / 2;
    const endY = origin.y - height / 2;

    const sheet = sheetRef.current;
    const overlay = overlayRef.current;
    const handleEnd = () => {
      resetView();
      onClose();
    };
    sheet.addEventListener('transitionend', handleEnd, { once: true });
    overlay.style.opacity = '0';
    sheet.style.filter = 'blur(16px)';
    sheet.style.transform = `translate(${endX}px, ${endY}px) scale(${startScaleX}, ${startScaleY}) rotate(-8deg)`;
    sheet.style.opacity = '0';
    window.setTimeout(handleEnd, 520);
  }, [onClose, origin, prefersReducedMotion, resetView]);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    resetView();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    animateOpen();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        animateClose();
        return;
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        setScale((current) => clampScale(Number((current + SCALE_STEP).toFixed(2))));
        return;
      }

      if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        setScale((current) => clampScale(Number((current - SCALE_STEP).toFixed(2))));
        return;
      }

      if (event.key === '0') {
        event.preventDefault();
        resetView();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [animateClose, animateOpen, clampScale, isOpen, resetView]);

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    setScale((current) => clampScale(Number((current + delta).toFixed(2))));
  };

  const handleDoubleClick = () => {
    setScale((current) => (current > 1 ? 1 : 1.5));
    setOffset({ x: 0, y: 0 });
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    setDragging(true);
    dragStateRef.current = {
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragging || !dragStateRef.current) return;
    setOffset({
      x: event.clientX - dragStateRef.current.x,
      y: event.clientY - dragStateRef.current.y,
    });
  };

  const handlePointerUp = (event) => {
    setDragging(false);
    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      const [a, b] = event.touches;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinchStateRef.current = { distance, scale };
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length !== 2 || !pinchStateRef.current) return;
    event.preventDefault();
    const [a, b] = event.touches;
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const ratio = distance / pinchStateRef.current.distance;
    setScale(clampScale(Number((pinchStateRef.current.scale * ratio).toFixed(2))));
  };

  const handleTouchEnd = () => {
    pinchStateRef.current = null;
  };

  const handleBackdropClick = (event) => {
    if (event.target === overlayRef.current) {
      animateClose();
    }
  };

  const zoomReset = useMemo(
    () => ({
      label: 'Reset zoom',
      onClick: () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
      },
    }),
    []
  );

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
      onClick={handleBackdropClick}
    >
      <div ref={sheetRef} className={styles.viewerSheet}>
        <div className={styles.viewerActions}>
          <a
            className={styles.actionButton}
            href={PDF_SRC}
            download="Sampreet_Patil_Resume.pdf"
            aria-label="Download resume"
          >
            <FiDownload />
          </a>
          <button type="button" className={styles.actionButton} onClick={() => setScale((current) => clampScale(Number((current - SCALE_STEP).toFixed(2))))} aria-label="Zoom out">
            <FiMinus />
          </button>
          <button type="button" className={styles.actionButton} onClick={zoomReset.onClick} aria-label={zoomReset.label}>
            <FiRefreshCw />
          </button>
          <button type="button" className={styles.actionButton} onClick={() => setScale((current) => clampScale(Number((current + SCALE_STEP).toFixed(2))))} aria-label="Zoom in">
            <FiPlus />
          </button>
          <button type="button" className={`${styles.actionButton} ${styles.closeButton}`} onClick={animateClose} aria-label="Close resume">
            <FiX />
          </button>
        </div>

        <PdfSurface
          scale={scale}
          offset={offset}
          dragging={dragging}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
    </div>,
    document.body
  );
}
