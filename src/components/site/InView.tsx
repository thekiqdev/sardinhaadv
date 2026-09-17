import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type InViewProps = {
  as?: ElementType;
  className?: string;
  delayMs?: number;
  children: ReactNode;
};

export function InView({ as: Tag = "div", className, delayMs = 0, children }: InViewProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("in-view", visible && "in-view-on", className)}
      style={{ "--in-view-delay": `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
