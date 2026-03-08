// ─── Animated Number Component ──────────────────────────────
// Counts up from 0 to target value with easing animation.

import { useState, useEffect } from "react";

interface AnimNumProps {
  target: number;
  duration?: number;
}

export default function AnimNum({ target, duration = 800 }: AnimNumProps) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return <>{val}</>;
}
