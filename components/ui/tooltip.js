import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TooltipContext = createContext(null);

export function Tooltip({ children, delayDuration = 100, open }) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const timeoutRef = useRef(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : isOpenInternal;

  const show = () => {
    if (isControlled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpenInternal(true);
    }, delayDuration);
  };

  const hide = () => {
    if (isControlled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpenInternal(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ isOpen, show, hide, isControlled }}>
      <span className="relative inline-flex items-center justify-center align-middle">
        {children}
      </span>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, render }) {
  const { show, hide, isControlled } = useContext(TooltipContext);

  const handleMouseEnter = (e) => {
    if (!isControlled) show();
  };

  const handleMouseLeave = (e) => {
    if (!isControlled) hide();
  };

  const handleFocus = (e) => {
    if (!isControlled) show();
  };

  const handleBlur = (e) => {
    if (!isControlled) hide();
  };

  // If a render prop is passed, we clone that element and inject hover/focus event handlers.
  if (render) {
    return React.cloneElement(render, {
      onMouseEnter: (e) => {
        render.props.onMouseEnter?.(e);
        handleMouseEnter(e);
      },
      onMouseLeave: (e) => {
        render.props.onMouseLeave?.(e);
        handleMouseLeave(e);
      },
      onFocus: (e) => {
        render.props.onFocus?.(e);
        handleFocus(e);
      },
      onBlur: (e) => {
        render.props.onBlur?.(e);
        handleBlur(e);
      },
    });
  }

  // Otherwise, wrap children
  const child = React.Children.only(children);
  return React.cloneElement(child, {
    onMouseEnter: (e) => {
      child.props.onMouseEnter?.(e);
      handleMouseEnter(e);
    },
    onMouseLeave: (e) => {
      child.props.onMouseLeave?.(e);
      handleMouseLeave(e);
    },
    onFocus: (e) => {
      child.props.onFocus?.(e);
      handleFocus(e);
    },
    onBlur: (e) => {
      child.props.onBlur?.(e);
      handleBlur(e);
    },
  });
}

export function TooltipContent({ children, className = "" }) {
  const { isOpen } = useContext(TooltipContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            type: "spring",
            stiffness: 720,
            damping: 26,
            mass: 0.72,
            restDelta: 0.001,
          }}
          className={`absolute bottom-full left-1/2 z-[99999] mb-4 inline-flex w-max max-w-none -translate-x-1/2 items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium leading-none whitespace-nowrap shadow-2xl border border-slate-950/10 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 dark:border-white/10 transform-gpu origin-bottom ${className}`}
        >
          {children}
          {/* Arrow */}
          <div className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-slate-950/10 bg-white dark:bg-slate-950 dark:border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
