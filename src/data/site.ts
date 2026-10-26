export const contact = {
  company: 'Proxima SARL',
  tagline: 'Partnering for a brighter future.',
  email: 'contact@proximaimmigration.com',
  phoneCameroon: '+237 687 966 812',
  phoneCameroonHref: 'tel:+237687966812',
  phoneCanada: '+1 (613) 769-8261',
  phoneCanadaHref: 'tel:+16137698261',
  whatsapp: '+237 680 225 372',
  whatsappNumber: '237680225372',
  city: 'Douala',
  district: 'Deido',
  country: 'Cameroun',
  mapQuery: 'Deido, Douala, Cameroun',
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const nav = [
  { label: 'Expertises', href: '/expertises' },
  { label: 'TCF · TEF', href: '/tcf-tef' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export const stats = [
  { value: '100+', label: 'dossiers acceptés' },
  { value: '5 ans', label: "d'expertise Canada" },
  { value: '90 %', label: 'de réussite en 2025' },
  { value: '24 h', label: 'pour vous répondre' },
];

export type ServiceSlug = 'residence-permanente' | 'etudes' | 'travail' | 'famille' | 'tcf-tef';

export interface Service {
  slug: ServiceSlug;
  label: string;
  short: string;
  title: string;
  icon: string;
  image: string;
  imageAlt: string;
  pitch: string;
  forWho: string;
  programs: string[];
  steps: string[];
  documents: string[];
  timing: string;
}

export const services: Service[] = [
  {
    slug: 'residence-permanente',
    label: 'Résidence permanente',
    short: 'Résidence',
    title: "S'installer au Canada pour de bon",
    icon: 'house',
    image: 'residence-couple',
    imageAlt: 'Un couple souriant brandit les clés de son nouveau logement',
    pitch:
      "Entrée express, programmes des provinces, Québec : nous choisissons la voie qui maximise votre score et montons un dossier sans faille.",
    forWho: 'Diplômés et professionnels qualifiés, francophones ou bilingues, avec au moins un an d’expérience.',
    programs: ['Entrée express', 'Catégorie francophone', 'Programmes des provinces (PCP)', 'Québec (PSTQ)'],
    steps: [
      'Calcul de votre score CRS et choix du programme',
      'Tests de langue et évaluation de vos diplômes (EDE)',
      'Création du profil et suivi des rondes d’invitation',
      'Demande complète après invitation, examen médical, biométrie',
      'Confirmation de résidence permanente',
    ],
    documents: ['Passeport', 'Diplômes + EDE', 'Résultats TCF / TEF', 'Attestations d’emploi', 'Preuve de fonds', 'Casier judiciaire'],
    timing: 'Environ 6 mois de traitement IRCC après la demande complète',
  },
  {
    slug: 'etudes',
    label: 'Visa étudiant',
    short: 'Études',
    title: 'Étudier dans une université canadienne',
    icon: 'graduation-cap',
    image: 'student-campus',
    imageAlt: 'Trois étudiants marchent sur un campus en automne, sac au dos',
    pitch:
      "De l’admission à l’université jusqu’au permis d’études : CAQ, attestation provinciale et preuve de fonds bien ficelés.",
    forWho: 'Bacheliers, étudiants et diplômés qui visent un collège ou une université au Canada.',
    programs: ['Permis d’études', 'CAQ (Québec)', 'Attestation provinciale (LAP)', 'Permis de travail post-diplôme'],
    steps: [
      'Choix du programme et de l’établissement',
      'Dossier d’admission et lettre d’acceptation',
      'CAQ si Québec, attestation provinciale ailleurs',
      'Demande de permis d’études et biométrie',
      'Visa en main, préparation du départ',
    ],
    documents: ['Passeport', 'Relevés de notes', 'Lettre d’admission', 'Preuve de fonds', 'Lettre d’explication', 'CAQ ou LAP'],
    timing: 'Commencez 6 à 9 mois avant la rentrée visée',
  },
  {
    slug: 'travail',
    label: 'Visa travail',
    short: 'Travail',
    title: 'Travailler au Canada avec un permis valide',
    icon: 'briefcase-business',
    image: 'work-professional',
    imageAlt: 'Une ingénieure annote des plans à son bureau',
    pitch:
      "Offre d’emploi, EIMT ou Mobilité francophone : nous sécurisons votre permis de travail et préparons votre arrivée.",
    forWho: 'Professionnels avec une offre d’emploi ou un métier en demande, francophones en priorité.',
    programs: ['Permis avec EIMT', 'Mobilité francophone', 'Permis ouvert du conjoint', 'PVT (nationalités éligibles)'],
    steps: [
      'Évaluation de votre métier et de votre expérience',
      'CV au format canadien et validation de l’offre',
      'EIMT ou dispense (Mobilité francophone)',
      'Demande de permis de travail et biométrie',
      'Départ et installation',
    ],
    documents: ['Passeport', 'CV canadien', 'Offre d’emploi', 'Diplômes', 'Preuves d’expérience', 'TCF / TEF'],
    timing: 'Selon le type de permis : quelques semaines à plusieurs mois',
  },
  {
    slug: 'famille',
    label: 'Regroupement familial',
    short: 'Famille',
    title: 'Réunir votre famille au Canada',
    icon: 'users',
    image: 'family-reunion',
    imageAlt: 'Une famille africaine heureuse se retrouve dans un aéroport canadien enneigé',
    pitch:
      "Parrainage du conjoint, des enfants ou des parents : nous prouvons votre lien et votre capacité d’accueil, pièce par pièce.",
    forWho: 'Résidents permanents et citoyens canadiens qui veulent faire venir un proche.',
    programs: ['Parrainage du conjoint', 'Enfants à charge', 'Parents et grands-parents', 'Super visa'],
    steps: [
      'Vérification de l’admissibilité du répondant',
      'Rassemblement des preuves de la relation',
      'Dépôt du parrainage et de la demande de RP',
      'Biométrie et examen médical',
      'Décision et arrivée de vos proches',
    ],
    documents: ['Statut du répondant', 'Acte de mariage ou de naissance', 'Photos et échanges', 'Preuves financières'],
    timing: 'Environ 12 mois pour un parrainage de conjoint (indicatif)',
  },
  {
    slug: 'tcf-tef',
    label: 'Prépa TCF · TEF',
    short: 'TCF · TEF',
    title: 'Décrocher le score de français qu’il vous faut',
    icon: 'languages',
    image: 'tcf-exam',
    imageAlt: 'Des candidats concentrés passent une épreuve écrite de français en salle d’examen',
    pitch:
      "3 mois en présentiel à Douala, groupes de 8 maximum, examens blancs chaque mois : visez NCLC 7 et plus.",
    forWho: 'Tous niveaux, de la remise à niveau à l’objectif NCLC 9 et plus pour Entrée express.',
    programs: ['TCF Canada', 'TEF Canada', 'TCF Québec', 'Examens blancs'],
    steps: [
      'Test de positionnement et objectif NCLC',
      'Cours en petit groupe sur les 4 compétences',
      'Examen blanc chaque mois avec correction',
      'Coaching individuel sur l’expression orale',
      'Inscription à l’examen officiel',
    ],
    documents: ['Pièce d’identité', 'Objectif d’immigration', 'Anciens résultats (si vous en avez)'],
    timing: '3 mois · présentiel · Douala',
  },
];

export const journey = [
  {
    title: 'Évaluation gratuite',
    text: 'Un conseiller étudie votre profil et vous dit honnêtement quel programme vous correspond. Réponse sous 24 h.',
    meta: 'Jour 1',
  },
  {
    title: 'Contrat signé',
    text: 'Devis détaillé, prix fixés à l’avance, aucun frais caché. Vous savez exactement ce que vous payez.',
    meta: 'Engagement clair',
  },
  {
    title: 'Constitution du dossier',
    text: 'Liste de pièces sur mesure, relecture ligne par ligne, traductions, formulaires IRCC remplis avec vous.',
    meta: 'Le cœur du travail',
  },
  {
    title: 'Soumission à IRCC',
    text: 'Nous déposons votre demande et préparons chaque étape suivante : biométrie, examen médical, entrevue.',
    meta: 'Dossier déposé',
  },
  {
    title: 'Suivi jusqu’au visa',
    text: 'Un conseiller dédié sur WhatsApp vous tient informé jusqu’à la décision et vous prépare au départ.',
    meta: 'Bon vol',
  },
];

export const reasons = [
  {
    icon: 'badge-check',
    title: 'Cabinet légalement enregistré',
    text: 'Proxima est une SARL immatriculée au Cameroun, avec un bureau physique à Deido.',
  },
  {
    icon: 'folder-check',
    title: '100+ dossiers déjà acceptés',
    text: 'Entrée express, programmes des provinces, visas étudiants : nos dossiers passent.',
  },
  {
    icon: 'receipt-text',
    title: 'Prix transparents',
    text: 'Devis gratuit avant tout engagement, zéro frais cachés, contrat signé.',
  },
  {
    icon: 'languages',
    title: 'Prépa TCF · TEF en présentiel',
    text: 'À Douala, en groupes de 8 maximum, pour viser le bon niveau NCLC.',
  },
  {
    icon: 'message-circle',
    title: 'Suivi WhatsApp dédié',
    text: 'Un conseiller qui vous répond, à chaque étape, jusqu’à la décision.',
  },
];

export const testimonials = [
  {
    quote: 'Grâce à Proxima, mon visa étudiant a été accepté en 6 semaines. Service professionnel et transparent.',
    name: 'Alain K.',
    city: 'Yaoundé',
    program: 'Visa étudiant',
    year: '2025',
  },
  {
    quote: 'Entrée express acceptée ! Score TCF optimisé avec Proxima. Je recommande sans hésiter.',
    name: 'Marie T.',
    city: 'Douala',
    program: 'Résidence permanente',
    year: '2025',
  },
  {
    quote: 'Formation TCF excellente. Groupes petits, suivi individuel. Mon score a augmenté de 40 points.',
    name: 'Jean-Paul M.',
    city: 'Bafoussam',
    program: 'Prépa TCF',
    year: '2025',
  },
];

export const faq = [
  {
    q: 'Combien coûte un accompagnement immigration ?',
    a: "Nos tarifs dépendent du programme choisi. L’évaluation de votre profil est gratuite et vous recevez un devis détaillé avant tout engagement. Aucun frais caché : tout est écrit dans le contrat.",
  },
  {
    q: 'Quel score TCF minimum pour immigrer au Canada ?',
    a: "Pour Entrée express, visez au minimum NCLC 7 dans les quatre compétences (niveau B2). Utilisez notre convertisseur TCF → NCLC pour connaître votre niveau, puis nous calculons le score cible exact selon votre programme.",
  },
  {
    q: 'Quelle différence entre TCF et TEF ?',
    a: "Le TCF est administré par France Éducation international, le TEF par la CCI Paris Île-de-France. IRCC accepte les deux. Nous vous orientons vers l’examen le plus adapté à votre programme et à votre profil.",
  },
  {
    q: "Proxima garantit-il l'acceptation du visa ?",
    a: "Non, et aucun cabinet ne peut légalement le faire : la décision appartient à IRCC. Nous optimisons chaque pièce de votre dossier pour maximiser vos chances, avec un taux de réussite de 90 % en 2025. Méfiez-vous de quiconque vous promet un visa garanti.",
  },
  {
    q: "Comment se déroule l'accompagnement étape par étape ?",
    a: "1) Évaluation gratuite de votre profil. 2) Signature du contrat. 3) Constitution du dossier. 4) Soumission à IRCC. 5) Suivi sur WhatsApp jusqu’à l’obtention du visa.",
  },
  {
    q: 'Dois-je venir au bureau de Douala ?',
    a: "Ce n’est pas obligatoire : tout l’accompagnement peut se faire par WhatsApp et e-mail. La préparation TCF · TEF, elle, se déroule en présentiel à Deido.",
  },
];

export const studyLevels = ['Baccalauréat', 'BTS / Bac+2', 'Licence / Bac+3', 'Master ou plus'];

/**
 * Official IRCC equivalency, TCF Canada → NCLC.
 * Listening / reading are scored 0–699, writing / speaking 0–20.
 */
export const tcfNclc = {
  co: [
    { nclc: 10, min: 549 },
    { nclc: 9, min: 523 },
    { nclc: 8, min: 503 },
    { nclc: 7, min: 458 },
    { nclc: 6, min: 398 },
    { nclc: 5, min: 369 },
    { nclc: 4, min: 331 },
  ],
  ce: [
    { nclc: 10, min: 549 },
    { nclc: 9, min: 524 },
    { nclc: 8, min: 499 },
    { nclc: 7, min: 453 },
    { nclc: 6, min: 406 },
    { nclc: 5, min: 375 },
    { nclc: 4, min: 342 },
  ],
  ee: [
    { nclc: 10, min: 16 },
    { nclc: 9, min: 14 },
    { nclc: 8, min: 12 },
    { nclc: 7, min: 10 },
    { nclc: 6, min: 7 },
    { nclc: 5, min: 6 },
    { nclc: 4, min: 4 },
  ],
  eo: [
    { nclc: 10, min: 16 },
    { nclc: 9, min: 14 },
    { nclc: 8, min: 12 },
    { nclc: 7, min: 10 },
    { nclc: 6, min: 7 },
    { nclc: 5, min: 6 },
    { nclc: 4, min: 4 },
  ],
} as const;
