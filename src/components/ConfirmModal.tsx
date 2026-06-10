import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { AlertTriangle } from "lucide-react";

type ConfirmOptions = {
  title: string;
  body: string;
  confirmLabel?: string;
  confirmClass?: string;
};

type ConfirmState = ConfirmOptions & {
  resolve: (v: boolean) => void;
};

let _openConfirm: ((opts: ConfirmOptions) => Promise<boolean>) | null = null;

export function confirm(opts: ConfirmOptions): Promise<boolean> {
  if (!_openConfirm) return Promise.resolve(false);
  return _openConfirm(opts);
}

export function ConfirmModalProvider() {
  const [state, setState] = useState<ConfirmState | null>(null);
  const [shake, setShake] = useState(false);

  _openConfirm = useCallback(
    (opts: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        setState({ ...opts, resolve });
      }),
    []
  );

  const close = (value: boolean) => {
    state?.resolve(value);
    setState(null);
  };

  const onBackdrop = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <AnimatePresence>
      {state && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onBackdrop}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, x: shake ? [0, -8, 8, -6, 6, 0] : 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md bg-[#1A0F1B] border-t-2 border-[color:var(--rose)] rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div>
                <h2 className="font-display text-xl mb-1">{state.title}</h2>
                <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed">{state.body}</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => close(false)} className="btn-ghost text-sm py-2 px-5">Cancel</button>
              <button
                onClick={() => close(true)}
                className={state.confirmClass ?? "text-sm py-2 px-5 rounded-full font-semibold bg-red-500 hover:bg-red-600 text-white transition"}
              >
                {state.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
