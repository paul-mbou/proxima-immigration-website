import { useEffect, useId, useRef, useState, type SubmitEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CircleCheck, MessageCircle, PencilLine } from 'lucide-react';
import { PROGRAMME_EVENT, PLANE_PATH } from './icons';

interface Programme {
  slug: string;
  label: string;
}

interface Props {
  programmes: Programme[];
  levels: string[];
  whatsappNumber: string;
}

type Field = 'programme' | 'firstName' | 'lastName' | 'level' | 'phone';
type Errors = Partial<Record<Field, string>>;

const fieldClass =
  'h-13 w-full rounded-2xl border bg-paper px-4 text-[1.02rem] transition-colors placeholder:text-ink-mute/70 focus:bg-surface focus:outline-none';

export default function EvaluationForm({ programmes, levels, whatsappNumber }: Props) {
  const id = useId();
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({ programme: '', firstName: '', lastName: '', level: '', phone: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  useEffect(() => {
    const preset = window.__proximaProgramme ?? new URLSearchParams(window.location.search).get('programme');
    if (preset && programmes.some((p) => p.slug === preset)) setValues((v) => ({ ...v, programme: preset }));
    const onPick = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, programme: slug }));
      setErrors((er) => ({ ...er, programme: undefined }));
      setSentLink(null);
    };
    window.addEventListener(PROGRAMME_EVENT, onPick);
    return () => window.removeEventListener(PROGRAMME_EVENT, onPick);
  }, [programmes]);

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.programme) e.programme = 'Choisissez le projet qui vous intéresse.';
    if (values.firstName.trim().length < 2) e.firstName = 'Indiquez votre prénom.';
    if (values.lastName.trim().length < 2) e.lastName = 'Indiquez votre nom de famille.';
    if (!values.level) e.level = 'Choisissez votre niveau d’études.';
    const digits = values.phone.replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) e.phone = 'Entrez un numéro WhatsApp valide, par exemple +237 6XX XX XX XX.';
    return e;
  };

  const onSubmit = (ev: SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstInvalid = Object.keys(e)[0] as Field | undefined;
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }
    const programme = programmes.find((p) => p.slug === values.programme)?.label ?? values.programme;
    const message = [
      'Bonjour Proxima, je souhaite une évaluation gratuite de mon profil.',
      `• Projet : ${programme}`,
      `• Nom : ${values.firstName.trim()} ${values.lastName.trim()}`,
      `• Niveau d’études : ${values.level}`,
      `• WhatsApp : ${values.phone.trim()}`,
    ].join('\n');
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setSentLink(link);
    window.open(link, '_blank', 'noopener');
  };

  const describedBy = (f: Field) => (errors[f] ? `${id}-${f}-error` : undefined);
  const border = (f: Field) => (errors[f] ? 'border-red' : 'border-line focus:border-blue');

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-surface p-6 shadow-[0_40px_80px_-40px_rgb(10_31_51/0.45)] ring-1 ring-line sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {sentLink ? (
          <motion.div
            key="sent"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[30rem] flex-col items-start justify-center"
            role="status"
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="size-14"
              initial={reduce ? false : { x: -40, y: 40, opacity: 0, rotate: 45 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 45 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              <path d={PLANE_PATH} fill="var(--color-red)" />
            </motion.svg>
            <h3 className="display mt-6 text-3xl sm:text-4xl">Votre demande est prête, {values.firstName.trim()}.</h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              WhatsApp s’est ouvert avec votre message déjà rédigé. Appuyez sur <strong className="text-ink">Envoyer</strong> :
              un conseiller vous répond sous 24 h.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={sentLink} target="_blank" rel="noopener" className="btn-whatsapp">
                <MessageCircle className="size-5" aria-hidden />
                Rouvrir WhatsApp
              </a>
              <button type="button" onClick={() => setSentLink(null)} className="btn-ghost">
                <PencilLine className="size-5" aria-hidden />
                Modifier ma demande
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <fieldset>
              <legend className="font-semibold">Votre projet</legend>
              <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-describedby={describedBy('programme')}>
                {programmes.map((p, i) => {
                  const checked = values.programme === p.slug;
                  return (
                    <label
                      key={p.slug}
                      className={`relative flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.95rem] font-medium ring-1 transition-all duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue ${
                        checked ? 'bg-blue text-white ring-blue' : 'bg-paper text-ink-soft ring-line hover:text-ink hover:ring-ink/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="programme"
                        value={p.slug}
                        checked={checked}
                        onChange={() => set('programme', p.slug)}
                        className="sr-only"
                        data-field={i === 0 ? 'programme' : undefined}
                      />
                      {checked && <CircleCheck className="size-4" aria-hidden />}
                      {p.label}
                    </label>
                  );
                })}
              </div>
              {errors.programme && (
                <p id={`${id}-programme-error`} className="mt-2 text-sm font-medium text-red">
                  {errors.programme}
                </p>
              )}
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              {(
                [
                  ['firstName', 'Prénom', 'given-name', 'Ex. Awa'],
                  ['lastName', 'Nom de famille', 'family-name', 'Ex. Ndongo'],
                ] as const
              ).map(([field, label, autoComplete, placeholder]) => (
                <div key={field}>
                  <label htmlFor={`${id}-${field}`} className="font-semibold">
                    {label}
                  </label>
                  <input
                    id={`${id}-${field}`}
                    data-field={field}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    value={values[field]}
                    onChange={(e) => set(field, e.target.value)}
                    aria-invalid={!!errors[field]}
                    aria-describedby={describedBy(field)}
                    className={`mt-2 ${fieldClass} ${border(field)}`}
                  />
                  {errors[field] && (
                    <p id={`${id}-${field}-error`} className="mt-2 text-sm font-medium text-red">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-level`} className="font-semibold">
                  Niveau d’études
                </label>
                <select
                  id={`${id}-level`}
                  data-field="level"
                  value={values.level}
                  onChange={(e) => set('level', e.target.value)}
                  aria-invalid={!!errors.level}
                  aria-describedby={describedBy('level')}
                  className={`mt-2 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235d7287' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:1.2rem] bg-[right_1rem_center] bg-no-repeat pr-11 ${fieldClass} ${border('level')} ${values.level ? '' : 'text-ink-mute'}`}
                >
                  <option value="" disabled>
                    Choisir…
                  </option>
                  {levels.map((l) => (
                    <option key={l} value={l} className="text-ink">
                      {l}
                    </option>
                  ))}
                </select>
                {errors.level && (
                  <p id={`${id}-level-error`} className="mt-2 text-sm font-medium text-red">
                    {errors.level}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={`${id}-phone`} className="font-semibold">
                  Votre WhatsApp
                </label>
                <input
                  id={`${id}-phone`}
                  data-field="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+237 6XX XX XX XX"
                  value={values.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy('phone')}
                  className={`mt-2 ${fieldClass} ${border('phone')}`}
                />
                {errors.phone && (
                  <p id={`${id}-phone-error`} className="mt-2 text-sm font-medium text-red">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full text-[1.05rem]">
              Envoyer ma demande sur WhatsApp
              <ArrowUpRight className="btn-arrow size-5" aria-hidden />
            </button>
            <p className="text-center text-sm text-ink-mute">Gratuit et sans engagement. Vos informations ne servent qu’à vous répondre.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
