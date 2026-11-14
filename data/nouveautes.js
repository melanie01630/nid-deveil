/* Nouveautés films et séries (France), relevées le 14/11/2026.
   ou : Cinéma | Netflix | Prime Video | Disney+ | Apple TV | HBO Max
   pub : famille | ado (vérifie l'âge) | adulte (visible seulement après le code adulte)
   Les dates changent parfois : vérifie toujours sur la plateforme ou au cinéma.
   Pour mettre à jour : ajoute une ligne, change la date de relevé dans NOUV_DATE. */
window.NOUV_DATE = '14/11/2026';
window.NOUV_SOURCES = [
  ['Allociné : calendrier des sorties', 'https://www.allocine.fr/film/agenda/sem-2026-11-18/'],
  ['Sortiraparis : films attendus cet automne', 'https://www.sortiraparis.com/loisirs/cinema/guides/349530-les-films-les-plus-attendus-au-cinema-cet-automne-2026'],
  ['Sortiraparis : films familiaux au cinéma', 'https://www.sortiraparis.com/loisirs/cinema/guides/285926-cinema-decouvrez-les-films-familiaux-a-voir-pres-de-chez-vous-en-ce-moment'],
  ['Citizenkid : Netflix en famille', 'https://www.citizenkid.com/article/sorties-netflix-novembre-2026-films-series-voir-en-famille-a1072119'],
  ['Échos du net : Netflix novembre', 'https://www.echosdunet.net/tv/actualites/netflix-novembre-2026-quasimodo-un-bon-avocat-soeurs-de-sort'],
  ['Échos du net : Disney+ novembre', 'https://www.echosdunet.net/tv/actualites/calendrier-disney-plus-novembre-2026-percy-jackson-scrubs'],
  ['Selectra : séries de novembre', 'https://selectra.info/telecom/actualites/marche/series-novembre-2026-netflix-prime-video-disney']
];
window.NOUV = [
  /* ---------- AU CINÉMA ---------- */
  { t: "Si tu tends l'oreille", d: '2026-11-04', ou: 'Cinéma', k: 'Film', pub: 'famille', x: "Le film du Studio Ghibli ressort en salle en version 4K." },
  { t: "Quixotes", d: '2026-11-04', ou: 'Cinéma', k: 'Film d\'animation', pub: 'famille', x: "Une aventure animée inspirée du livre culte de Cervantes, à voir en famille dès 8 ans environ." },
  { t: "Un Bon Patron", d: '2026-11-04', ou: 'Cinéma', k: 'Comédie', pub: 'famille', x: "Une comédie française de Philippe de Chauveron avec Catherine Frot et Didier Bourdon." },
  { t: "Scrooge", d: '2026-11-11', ou: 'Cinéma', k: 'Aventure, fantastique', pub: 'ado', x: "Une version du conte de Noël réalisée par Ti West, avec Johnny Depp dans le rôle de Scrooge. Vérifie l'âge conseillé avant d'y aller avec des enfants." },
  { t: "Hunger Games : Lever de soleil sur la moisson", d: '2026-11-18', ou: 'Cinéma', k: 'Action, aventure', pub: 'ado', x: "Le préquel qui raconte la jeunesse de Haymitch Abernathy, avec Joseph Zada et Glenn Close. Plutôt pour les ados et les adultes." },
  { t: "À la poursuite de l'Affreunard", d: '2026-11-18', ou: 'Cinéma', k: 'Courts métrages', pub: 'famille', x: "Un programme de trois courts métrages d'animation, dès 3 ans." },
  { t: "Billie, à la croisée des mondes", d: '2026-11-25', ou: 'Cinéma', k: 'Film d\'animation Disney', pub: 'famille', x: "Un nouveau film d'animation Disney qui mêle aventure et fantastique." },
  { t: "Le Noël d'Ernest et Célestine", d: '2026-11-25', ou: 'Cinéma', k: 'Film d\'animation', pub: 'famille', x: "Les héros de la littérature jeunesse reviennent pour Noël, dès 3 ans." },
  { t: "Mon beau-père, ma belle-fille et moi", d: '2026-11-25', ou: 'Cinéma', k: 'Comédie', pub: 'ado', x: "La famille Focker revient avec Robert De Niro, Ben Stiller et Ariana Grande, pour une comédie de John Hamburg." },
  { t: "Astérix : Le Royaume de Nubie", d: '2026-12-02', ou: 'Cinéma', k: 'Film d\'animation', pub: 'famille', x: "Une nouvelle aventure des Gaulois, réalisée par Alexandre Heboyan." },
  { t: "Claude", d: '2026-12-02', ou: 'Cinéma', k: 'Comédie', pub: 'famille', x: "Une comédie française avec André Dussollier, Kyan Khojandi et Valérie Donzelli." },
  { t: "Wildwood : La Prophétie de la forêt", d: '2026-12-09', ou: 'Cinéma', k: 'Animation en stop motion', pub: 'famille', x: "Le nouveau film du studio LAIKA (Coraline), réalisé par Travis Knight." },
  { t: "Le Chat chapeauté", d: '2026-12-09', ou: 'Cinéma', k: 'Film d\'animation', pub: 'famille', x: "Un film d'animation de Warner Bros., à partir de 6 ans." },
  { t: "Léo, le chant des océans", d: '2026-12-16', ou: 'Cinéma', k: 'Film d\'animation', pub: 'famille', x: "Une jeune baleine à bosse cherche sa voix pour protéger les fonds marins." },
  { t: "Carmen, l'oiseau rebelle", d: '2026-12-16', ou: 'Cinéma', k: 'Film d\'animation', pub: 'famille', x: "Un film de Sébastien Laudenbach avec les voix de Camélia Jordana et Milo Machado-Graner." },
  { t: "Angry Birds 3", d: '2026-12-23', ou: 'Cinéma', k: 'Film d\'animation', pub: 'famille', x: "Le nouveau film d'animation des oiseaux en colère, pour les vacances de Noël." },
  { t: "Jumanji 3", d: '2026-12-23', ou: 'Cinéma', k: 'Aventure', pub: 'famille', x: "Dwayne Johnson, Kevin Hart et Jack Black retrouvent le jeu magique." },
  /* ---------- NETFLIX ---------- */
  { t: "Tous en scène 1 et 2", d: '2026-11-01', ou: 'Netflix', k: 'Films d\'animation', pub: 'famille', x: "Des animaux chanteurs et un concours de talents, pour toute la famille." },
  { t: "Scooby-Doo", d: '2026-11-09', ou: 'Netflix', k: 'Film', pub: 'famille', x: "Le célèbre chien et sa bande arrivent sur la plateforme." },
  { t: "Un bon avocat", d: '2026-11-09', ou: 'Netflix', k: 'Film français', pub: 'ado', x: "Un film français arrivé le 9 novembre." },
  { t: "Elfe", d: '2026-11-12', ou: 'Netflix', k: 'Film de Noël', pub: 'famille', x: "Le classique de Noël est aussi sur Netflix dès le 12 novembre." },
  { t: "Black Doves, saison 2", d: '2026-11-05', ou: 'Netflix', k: 'Série britannique', pub: 'adulte', x: "Le retour de la série avec Keira Knightley." },
  { t: "Chronique arctique, saison 2", d: '2026-11-05', ou: 'Netflix', k: 'Série', pub: 'ado', x: "La deuxième saison arrive le 5 novembre." },
  { t: "L'Impératrice, saison 3", d: '2026-11-12', ou: 'Netflix', k: 'Série allemande', pub: 'ado', x: "La troisième et dernière saison." },
  { t: "The Altruists", d: '2026-11-19', ou: 'Netflix', k: 'Mini-série', pub: 'adulte', x: "Un drame sur la chute de la plateforme d'échange de cryptomonnaies FTX." },
  { t: "The Mosquito Bowl", d: '2026-11-25', ou: 'Netflix', k: 'Film de guerre', pub: 'adulte', x: "Un film sur la Seconde Guerre mondiale vu sous un angle inattendu." },
  { t: "Quasimodo, l'âme de Paris", d: '2026-11-27', ou: 'Netflix', k: 'Film français', pub: 'ado', x: "Un film avec Vincent Cassel." },
  /* ---------- PRIME VIDEO ---------- */
  { t: "The Greatest", d: '2026-11-04', ou: 'Prime Video', k: 'Série', pub: 'ado', x: "Une nouvelle série qui démarre le 4 novembre." },
  { t: "Campus Drivers", d: '2026-11-06', ou: 'Prime Video', k: 'Série française', pub: 'ado', x: "Une série française lancée le 6 novembre." },
  { t: "Les Anneaux de pouvoir, saison 3", d: '2026-11-11', ou: 'Prime Video', k: 'Série fantastique', pub: 'ado', x: "La suite de la grande série de fantasy." },
  { t: "Madden", d: '2026-11-18', ou: 'Prime Video', k: 'Film biopic', pub: 'adulte', x: "Un biopic porté par Nicolas Cage." },
  { t: "Blade Runner 2099", d: '2026-11-25', ou: 'Prime Video', k: 'Série de science-fiction', pub: 'adulte', x: "La nouvelle série de l'univers Blade Runner." },
  /* ---------- DISNEY+ ---------- */
  { t: "Elfe, Le Grinch, Frère Noël", d: '2026-11-01', ou: 'Disney+', k: 'Films de Noël', pub: 'famille', x: "Trois films de Noël pour se mettre dans l'ambiance." },
  { t: "Rivals, saison 2 (fin)", d: '2026-11-11', ou: 'Disney+', k: 'Série', pub: 'adulte', x: "La fin de la saison 2." },
  { t: "Scrubs, saison 2", d: '2026-11-18', ou: 'Disney+', k: 'Série comique', pub: 'ado', x: "J.D. et Turk sont de nouveau réunis à l'hôpital Sacred Heart." },
  { t: "Percy Jackson et les Olympiens, saison 3", d: '2026-11-20', ou: 'Disney+', k: 'Série fantastique', pub: 'ado', x: "La suite des aventures du demi-dieu, plutôt pour les ados." },
  /* ---------- APPLE TV / HBO MAX ---------- */
  { t: "Stick, saison 2", d: '2026-11-04', ou: 'Apple TV', k: 'Série', pub: 'ado', x: "Le retour de la série avec Owen Wilson." },
  { t: "12 12 12", d: '2026-11-13', ou: 'Apple TV', k: 'Nouvelle série', pub: 'adulte', x: "Une série diffusée jusqu'au 25 décembre, avec un épisode chaque vendredi." },
  { t: "The Gilded Age, saison 4", d: '2026-11-02', ou: 'HBO Max', k: 'Série en costumes', pub: 'ado', x: "Un épisode par semaine." }
];
