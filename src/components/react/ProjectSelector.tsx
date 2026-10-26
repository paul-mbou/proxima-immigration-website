import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { Service } from '@/data/site';
import { pickProgramme, serviceIcons } from './icons';

type SelectorService = Pick<
  Service,
  'slug' | 'label' | 'short' | 'title' | 'icon' | 'pitch' | 'forWho' | 'programs' | 'steps' | 'timing' | 'imageAlt'
> & { imageSrc: string };

interface Props {
  services: SelectorService[];
}

export default function ProjectSelector({ services }: Props) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const reduce = useReducedMotion();
  const current = services[active];
  const Icon = serviceIcons[current.icon];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = services.length - 1;
    let next = active;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const chooseForEvaluation = () => {
    pickProgramme(current.slug);
    document.getElementById('evaluation')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choisissez votre projet"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {services.map((s, i) => {
          const TabIcon = serviceIcons[s.icon];
          const selected = i === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`relative flex min-h-12 shrink-0 items-center gap-2.5 rounded-full px-5 text-[0.95rem] font-semibold transition-colors duration-300 ${
                selected ? 'text-white' : 'bg-surface text-ink-soft ring-1 ring-line hover:text-ink hover:ring-ink/25'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full bg-blue"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <TabIcon className="relative size-[1.1rem]" aria-hidden />
              <span className="relative">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-8 overflow-hidden rounded-[2rem] bg-surface ring-1 ring-line"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-[1.05fr_1fr]"
          >
            <div className="relative min-h-72 lg:min-h-[34rem]">
              <img
                src={current.imageSrc}
                alt={current.imageAlt}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-6 pt-20">
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <Clock3 className="size-4 text-sky" aria-hidden />
                  {current.timing}
                </p>
              </div>
            </div>

            <div className="flex flex-col p-7 sm:p-10">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-mist text-blue">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="display mt-5 text-[1.9rem] sm:text-[2.3rem]">{current.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{current.pitch}</p>

              <p className="mt-6 rounded-2xl bg-paper p-4 text-[0.95rem] leading-relaxed">
                <span className="font-semibold text-ink">Pour qui ? </span>
                <span className="text-ink-soft">{current.forWho}</span>
              </p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Programmes couverts">
                {current.programs.map((p) => (
                  <li key={p} className="rounded-full bg-blue-mist px-3.5 py-1.5 text-sm font-medium text-blue-deep">
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <button type="button" onClick={chooseForEvaluation} className="btn-primary">
                  Évaluer mon profil
                  <ArrowUpRight className="btn-arrow size-5" aria-hidden />
                </button>
                <a href={`/expertises#${current.slug}`} className="btn-ghost">
                  Voir les étapes
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
