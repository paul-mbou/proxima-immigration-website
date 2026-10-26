import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { PLANE_PATH } from './icons';

interface Step {
  title: string;
  text: string;
  meta: string;
}

interface Props {
  steps: Step[];
}

interface Geometry {
  w: number;
  h: number;
  d: string;
  stops: number[];
}

function buildPath(w: number, h: number, stops: number[], desktop: boolean) {
  const cx = w / 2;
  if (!stops.length) return '';
  if (!desktop) return `M${cx} 0 L${cx} ${h}`;
  let d = `M${cx} 0 L${cx} ${stops[0]}`;
  for (let i = 1; i < stops.length; i++) {
    const from = stops[i - 1];
    const to = stops[i];
    const gap = to - from;
    const x = i % 2 === 1 ? w * 0.94 : w * 0.06;
    d += ` C${x} ${from + gap * 0.3} ${x} ${to - gap * 0.3} ${cx} ${to}`;
  }
  return `${d} L${cx} ${h}`;
}

export default function Journey({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();
  const [geo, setGeo] = useState<Geometry>({ w: 0, h: 0, d: '', stops: [] });
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const stops = markerRefs.current.map((m) => {
      if (!m) return 0;
      const r = m.getBoundingClientRect();
      return r.top + r.height / 2 - box.top;
    });
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    setGeo({ w: box.width, h: box.height, stops, d: buildPath(box.width, box.height, stops, desktop) });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const place = useCallback(
    (p: number) => {
      const track = trackRef.current;
      const plane = planeRef.current;
      if (!track || !plane || !geo.d) return;
      const total = track.getTotalLength();
      const at = Math.min(Math.max(p, 0), 1) * total;
      const pt = track.getPointAtLength(at);
      const ahead = track.getPointAtLength(Math.min(at + 2, total));
      const behind = track.getPointAtLength(Math.max(at - 2, 0));
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI + 90;
      plane.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
      const count = geo.stops.filter((y) => pt.y >= y - 8).length;
      setReached((prev) => (prev === count ? prev : count));
    },
    [geo],
  );

  useMotionValueEvent(progress, 'change', (p) => {
    if (!reduce) place(p);
  });

  useEffect(() => {
    place(reduce ? 1 : progress.get());
  }, [place, reduce, progress]);

  const active = reduce ? steps.length : reached;

  return (
    <div ref={containerRef} className="relative">
      <div className="mb-8 flex md:justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-night px-4 py-2 font-mono text-xs font-semibold tracking-[0.16em] text-white">
          DLA · DOUALA
        </span>
      </div>

      <div className="relative">
        <div
          ref={wrapRef}
          className="pointer-events-none absolute inset-y-0 left-0 w-12 md:left-1/2 md:w-44 md:-translate-x-1/2"
          aria-hidden="true"
        >
          {geo.d && (
            <svg className="absolute inset-0 overflow-visible" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
              <path ref={trackRef} d={geo.d} fill="none" stroke="var(--color-line)" strokeWidth={2} strokeDasharray="5 9" />
              <motion.path
                d={geo.d}
                fill="none"
                stroke="var(--color-red)"
                strokeWidth={4}
                strokeLinecap="round"
                style={{ pathLength: reduce ? 1 : progress }}
              />
            </svg>
          )}
          <div ref={planeRef} className="absolute top-0 left-0 z-30 size-10 will-change-transform">
            <svg viewBox="0 0 24 24" className="size-full drop-shadow-[0_6px_10px_rgb(227_7_19/0.4)]">
              <path d={PLANE_PATH} fill="var(--color-red)" />
            </svg>
          </div>
        </div>

        <ol className="space-y-6 md:space-y-4">
          {steps.map((step, i) => {
            const isReached = i < active;
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative grid grid-cols-[3rem_1fr] items-center gap-3 md:grid-cols-[1fr_11rem_1fr] md:gap-0">
                <div className="relative z-20 flex justify-center md:col-start-2 md:row-start-1">
                  <span
                    ref={(el) => {
                      markerRefs.current[i] = el;
                    }}
                    className={`flex size-10 items-center justify-center rounded-full font-mono text-sm font-bold shadow-[0_0_0_6px_var(--color-paper)] transition-all duration-500 ${
                      isReached ? 'bg-red text-white' : 'scale-90 bg-surface text-ink-mute ring-2 ring-line'
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>
                <article
                  className={`rounded-3xl bg-surface p-6 ring-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7 md:row-start-1 ${
                    right ? 'md:col-start-3' : 'md:col-start-1 md:text-right'
                  } ${isReached ? 'ring-line shadow-[0_24px_50px_-30px_rgb(10_31_51/0.35)]' : 'opacity-75 ring-transparent'}`}
                >
                  <p className="eyebrow text-blue">{step.meta}</p>
                  <h3 className="display mt-2 text-2xl sm:text-[1.7rem]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 flex md:justify-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold tracking-[0.16em] transition-colors duration-500 ${
            active === steps.length ? 'bg-red text-white' : 'bg-surface text-ink-mute ring-1 ring-line'
          }`}
        >
          VISA ✓ · CANADA
        </span>
      </div>
    </div>
  );
}
