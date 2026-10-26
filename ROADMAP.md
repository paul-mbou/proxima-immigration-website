# Proxima — prochaine version

Fonctionnalités proposées et validées en direction, mises de côté pour la version 2. Elles peuvent être ajoutées à tout moment.

1. **Test d'éligibilité → carte d'embarquement**
   Questionnaire de 2 minutes (projet, âge, études, français, expérience) qui se termine par une carte d'embarquement personnalisée : DLA → Canada, programme conseillé, points forts, points à renforcer. Bouton « Envoyer ma carte à un conseiller » avec message WhatsApp pré-rempli.

2. **Sessions TCF · TEF avec places restantes**
   Prochaines dates de session et compteur de places (groupes de 8), alimentés par un fichier de données simple.

3. **Bloc Transparence / anti-arnaque**
   SARL enregistrée (RCCM affiché), contrat signé, devis gratuit, « aucun cabinet ne peut garantir un visa », signes pour reconnaître une arnaque.

4. **Mode sombre « Vol de nuit »**
   Palette déjà définie dans `design-system/MASTER.md`, à brancher sur les tokens CSS avec un bouton de bascule.

## À compléter avant la mise en ligne

- Mentions légales : RCCM, NIU, hébergeur.
- Photos : 6 photos Pexels (licence libre, crédits dans `src/data/images.ts` et les mentions légales). Restent générées par IA : `hero-traveler.jpg` et `family-reunion.jpg`, gardées car très proches du message (voyageuse à l'aéroport, retrouvailles en aéroport canadien). Les remplacer par de vraies photos du bureau et de l'équipe quand elles existent.
- Valider le contenu de la prépa TCF (examens blancs mensuels, test de positionnement, coaching oral).
