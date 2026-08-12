import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2Icon, XIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function Toast() {
  const { toast, dismissToast } = useApp();
  return (
    <AnimatePresence>
      {toast &&
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        role="status"
        className="fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-start gap-3 rounded-2xl border border-green-200 bg-white p-4 shadow-pop">
        
          <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <p className="flex-1 text-sm font-medium text-slate-800">{toast}</p>
          <button
          type="button"
          onClick={dismissToast}
          aria-label="Dismiss notification"
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
          
            <XIcon className="h-4 w-4" />
          </button>
        </motion.div>
      }
    </AnimatePresence>);

}