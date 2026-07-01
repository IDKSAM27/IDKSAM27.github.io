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
      {children}
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
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`absolute bottom-full mb-3.5 right-0 z-[99999] px-6 py-3.5 text-base md:text-lg font-normal rounded-2xl shadow-2xl border-2 whitespace-nowrap bg-white text-slate-900 border-slate-950 dark:bg-slate-950 dark:text-slate-50 dark:border-white ${className}`}
        >
          {children}
          {/* Arrow */}
          <div className="absolute -bottom-[7px] right-8 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-slate-950 dark:bg-slate-950 dark:border-white rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
