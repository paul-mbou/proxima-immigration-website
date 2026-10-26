import { useId, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Info } from 'lucide-react';
import { tcfNclc, whatsappLink } from '@/data/site';

type Skill = keyof typeof tcfNclc;

const skills: { key: Skill; label: string; code: string; max: number; step: number }[] = [
  { key: 'co', label: 'Compréhension orale', code: 'CO', max: 699, step: 1 },
  { key: 'ce', label: 'Compréhension écrite', code: 'CE', max: 699, step: 1 },
  { key: 'ee', label: 'Expression écrite', code: 'EE', max: 20, step: 1 },
  { key: 'eo', label: 'Expression orale', code: 'EO', max: 20, step: 1 },
];

const TARGET = 7;

function toNclc(skill: Skill, score: number) {
  const row = tcfNclc[skill].find((r) => score >= r.min);
  return row ? row.nclc : 0;
}

function Flip({ value, className = '' }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-flex overflow-hidden [perspective:400px] ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduce ? false : { rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={reduce ? undefined : { rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block origin-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function NclcConverter() {
  const id = useId();
  const [scores, setScores] = useState<Record<Skill, number>>({ co: 430, ce: 470, ee: 11, eo: 9 });

  const results = useMemo(
    () => skills.map((s) => ({ ...s, score: scores[s.key], nclc: toNclc(s.key, scores[s.key]) })),
    [scores],
  );
  const lowest = Math.min(...results.map((r) => r.nclc));
  const missing = results.filter((r) => r.nclc < TARGET);
  const ready = missing.length === 0;

  const update = (key: Skill, raw: string, max: number) => {
    const n = Math.round(Number(raw));
    setScores((prev) => ({ ...prev, [key]: Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0 }));
  };

  const message = [
    'Bonjour Proxima, voici mes scores TCF Canada :',
    ...results.map((r) => `• ${r.label} : ${r.score} → NCLC ${r.nclc || '< 4'}`),
    ready
      ? 'J’atteins NCLC 7 partout. Pouvez-vous évaluer mon dossier ?'
      : 'Je souhaite atteindre NCLC 7 avec votre préparation TCF.',
  ].join('\n');

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
      <div className="rounded-[2rem] bg-surface p-6 ring-1 ring-line sm:p-8">
        <p className="eyebrow text-blue">Vos résultats TCF Canada</p>
        <div className="mt-6 space-y-7">
          {skills.map((s) => (
            <div key={s.key}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${id}-${s.key}`} className="font-semibold">
                  {s.label}
                </label>
                <span className="text-sm text-ink-mute">sur {s.max}</span>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={s.max}
                  step={s.step}
                  value={scores[s.key]}
                  onChange={(e) => update(s.key, e.target.value, s.max)}
                  aria-label={`${s.label}, curseur`}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-blue-mist accent-blue"
                />
                <input
                  id={`${id}-${s.key}`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={s.max}
                  value={scores[s.key]}
                  onChange={(e) => update(s.key, e.target.value, s.max)}
                  className="h-12 w-24 rounded-xl border border-line bg-paper px-3 text-center font-mono text-lg font-semibold focus:border-blue focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-7 flex gap-2 text-sm leading-relaxed text-ink-mute">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          Barème officiel d’équivalence IRCC pour le TCF Canada. Résultat indicatif : seul IRCC fait foi.
        </p>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[2rem] bg-night text-white shadow-[0_40px_80px_-40px_rgb(7_26_44/0.8)]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-sky">DÉPARTS · NCLC</p>
          <p className="font-mono text-xs tracking-[0.2em] text-white/50">OBJECTIF NCLC {TARGET}</p>
        </div>

        <div className="px-3 py-2 sm:px-5" role="table" aria-label="Équivalence de vos scores en niveaux NCLC">
          <div role="row" className="grid grid-cols-[1fr_3.5rem_3.5rem_6.5rem] gap-2 px-3 py-2 font-mono text-[0.65rem] tracking-[0.18em] text-white/40 sm:grid-cols-[1fr_5rem_4.5rem_8.5rem]">
            <span role="columnheader">COMPÉTENCE</span>
            <span role="columnheader" className="text-right">SCORE</span>
            <span role="columnheader" className="text-center">NCLC</span>
            <span role="columnheader" className="text-right">STATUT</span>
          </div>
          {results.map((r) => {
            const ok = r.nclc >= TARGET;
            return (
              <div
                role="row"
                key={r.key}
                className="grid grid-cols-[1fr_3.5rem_3.5rem_6.5rem] items-center gap-2 rounded-xl px-3 py-3.5 odd:bg-white/[0.04] sm:grid-cols-[1fr_5rem_4.5rem_8.5rem]"
              >
                <span role="cell" className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-sky">{r.code}</span>
                  <span className="hidden text-sm text-white/80 sm:inline">{r.label}</span>
                </span>
                <span role="cell" className="text-right font-mono text-white/70">
                  {r.score}
                </span>
                <span role="cell" className="flex justify-center">
                  <Flip
                    value={r.nclc ? String(r.nclc) : '<4'}
                    className="min-w-11 justify-center rounded-md bg-black/40 px-2 py-1 font-mono text-xl font-bold"
                  />
                </span>
                <span role="cell" className={`text-right font-mono text-[0.7rem] font-semibold tracking-[0.12em] ${ok ? 'text-sky' : 'text-[#ff5a63]'}`}>
                  <Flip value={ok ? 'PRÊT' : 'À RENFORCER'} />
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-auto border-t border-white/10 p-6 sm:p-8" aria-live="polite">
          <p className="text-sm text-white/60">Votre niveau retenu (le plus faible des 4)</p>
          <p className="display mt-1 text-4xl">
            NCLC <Flip value={lowest ? String(lowest) : '< 4'} />
          </p>
          <p className="mt-3 leading-relaxed text-white/75">
            {ready
              ? 'Vous atteignez NCLC 7 dans les 4 compétences : le seuil d’Entrée express. Passons à votre dossier.'
              : `Encore ${missing.length} compétence${missing.length > 1 ? 's' : ''} sous NCLC 7 (${missing
                  .map((m) => m.code)
                  .join(', ')}). C’est exactement ce que notre prépa travaille.`}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink(message)} target="_blank" rel="noopener" className="btn-primary">
              {ready ? 'Faire évaluer mon dossier' : 'Atteindre NCLC 7 avec Proxima'}
              <ArrowUpRight className="btn-arrow size-5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
