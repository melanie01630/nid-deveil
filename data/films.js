/* Films & séries - catalogue France
   Les titres ci-dessous ont été relevés dans les calendriers de novembre 2026 (Netflix, Disney+, Prime Video) et la presse spécialisée.
   Les catalogues changent chaque mois : vérifie toujours sur ta plateforme.
   Pour mettre à jour : modifie cette liste, puis la date VERIFIE_LE.
   plateformes (on) : netflix, disney, prime, canal, apple, max, francetv, paramount
   age : âge minimum conseillé (indicatif). L'âge officiel reste celui indiqué par la plateforme. */
window.VERIFIE_LE = '13/11/2026';

window.PLATEFORMES = [
  { id: 'netflix',  nom: 'Netflix',     couleur: '#E50914' },
  { id: 'disney',   nom: 'Disney+',     couleur: '#113CCF' },
  { id: 'prime',    nom: 'Prime Video', couleur: '#00A8E1' },
  { id: 'canal',    nom: 'Canal+',      couleur: '#111111' },
  { id: 'apple',    nom: 'Apple TV+',   couleur: '#555555' },
  { id: 'max',      nom: 'Max',         couleur: '#5822B4' },
  { id: 'paramount',nom: 'Paramount+',  couleur: '#0064FF' },
  { id: 'francetv', nom: 'France.tv (gratuit)', couleur: '#E8112D' }
];

/* type : film | serie | cinema ; note : phrase courte ; on : plateformes ; age : 3, 6, 8, 10, 12, 13 */
window.FILMS = [
  /* ----- Netflix ----- */
  { titre: "Tous en scène 1 et 2", type: 'film', age: 5, on: ['netflix'], genre: "Animation, musique", note: "Des animaux chanteurs et un concours de talents. Au catalogue dès le 1er novembre 2026." },
  { titre: "Klaus", type: 'film', age: 7, on: ['netflix'], genre: "Conte de Noël, animation", note: "L'amitié entre un facteur et un fabricant de jouets. Quelques passages mélancoliques." },
  { titre: "Les Mitchell contre les machines", type: 'film', age: 8, on: ['netflix'], genre: "Animation, aventure", note: "Une famille doit sauver le monde des robots. Parfois un peu intense pour les sensibles." },
  { titre: "Leo", type: 'film', age: 6, on: ['netflix'], genre: "Comédie musicale animée", note: "Un lézard de classe qui veut découvrir la liberté. Thème de la mort évoqué avec humour." },
  { titre: "La Famille Willoughby", type: 'film', age: 8, on: ['netflix'], genre: "Animation, humour noir", note: "Quatre enfants cherchent de nouveaux parents. Humour décalé." },
  { titre: "Mon beau Noël de chien", type: 'film', age: 13, on: ['netflix'], genre: "Drame familial", note: "Netflix indique 13+. La maladie y tient une place importante. Arrivé le 4 novembre 2026." },
  { titre: "Elfe", type: 'film', age: 5, on: ['netflix', 'disney'], genre: "Comédie de Noël", note: "Un humain élevé chez les elfes arrive à New York." },
  { titre: "Sœurs de sort", type: 'film', age: 7, on: ['netflix'], genre: "Animation, conte", note: "Cendrillon racontée par une de ses demi-sœurs. Dès le 20 novembre 2026." },
  { titre: "Y a pas de réseau", type: 'film', age: 8, on: ['netflix'], genre: "Comédie familiale", note: "Deux enfants et leurs parents dans un chalet sans réseau. Dès le 10 novembre 2026." },
  { titre: "Doozie et la niche enchantée", type: 'serie', age: 3, on: ['netflix'], genre: "Série jeunesse animée", note: "Pour les plus jeunes. Dès le 9 novembre 2026." },
  { titre: "Gabby et la maison magique", type: 'serie', age: 3, on: ['netflix'], genre: "Série jeunesse", note: "Formats courts et colorés pour les petits. Saison 14 disponible." },
  { titre: "Horton !", type: 'serie', age: 3, on: ['netflix'], genre: "Série animée", note: "Saison 2 disponible depuis mai 2026." },
  { titre: "L'École des licornes", type: 'serie', age: 7, on: ['netflix'], genre: "Aventure, fantastique", note: "Une école magique pour jeunes lecteurs de romans." },
  /* ----- Disney+ ----- */
  { titre: "Le Grinch (2018)", type: 'film', age: 4, on: ['disney'], genre: "Animation, Noël", note: "Au catalogue dès le 1er novembre 2026." },
  { titre: "Le Grinch (2000, avec Jim Carrey)", type: 'film', age: 6, on: ['disney'], genre: "Comédie, Noël", note: "Version en prises de vues réelles, plus sombre que l'animation." },
  { titre: "Frère Noël", type: 'film', age: 8, on: ['disney'], genre: "Comédie de Noël", note: "Dès le 1er novembre 2026." },
  { titre: "Cigognes et compagnie", type: 'film', age: 5, on: ['disney'], genre: "Animation, comédie", note: "Les cigognes livrent des colis, pas des bébés. Dès le 1er novembre 2026." },
  { titre: "Le Pôle Express", type: 'film', age: 6, on: ['disney'], genre: "Animation, Noël", note: "Un train mystérieux vers le pôle Nord. Dès le 15 novembre 2026." },
  { titre: "Cool Attitude : Magic Noël", type: 'film', age: 4, on: ['disney'], genre: "Film original Disney+", note: "Dès le 14 novembre 2026." },
  { titre: "Un Joyeux Noël Marvel", type: 'film', age: 6, on: ['disney'], genre: "Super-héros, Noël", note: "Les Avengers et Spider-Man fêtent Noël. Dès le 7 novembre 2026." },
  { titre: "Mickey, Noël seul à la maison", type: 'film', age: 3, on: ['disney'], genre: "Animation, Noël", note: "Dès le 27 novembre 2026." },
  { titre: "Il était une fois Disney World : Le vœu magique de Noël", type: 'film', age: 4, on: ['disney'], genre: "Famille, Noël", note: "Dès le 29 novembre 2026." },
  { titre: "Miraculous : Les Aventures de Ladybug et Chat Noir", type: 'serie', age: 6, on: ['disney'], genre: "Super-héros animés", note: "Disponible depuis le 4 novembre 2026." },
  { titre: "Bluey", type: 'serie', age: 3, on: ['disney', 'francetv'], genre: "Famille, animation", note: "Une petite chienne et sa famille. À voir aussi sur France.tv." },
  { titre: "Percy Jackson et les Olympiens, saison 3", type: 'serie', age: 10, on: ['disney'], genre: "Fantastique", note: "Dès le 20 novembre 2026, un épisode par semaine." },
  /* ----- Prime Video ----- */
  { titre: "Shrek", type: 'film', age: 6, on: ['prime'], genre: "Animation, humour", note: "Ajouté en avril 2026 : à confirmer sur ta plateforme." },
  { titre: "Clifford", type: 'film', age: 5, on: ['prime'], genre: "Famille, aventure", note: "Un chien géant et rouge. Ajouté en février 2026 : à confirmer." },
  { titre: "La Panthère rose 2", type: 'film', age: 8, on: ['prime'], genre: "Comédie", note: "Ajouté en mai 2026 : à confirmer." },
  { titre: "Kung Fu Panda : Les Pattes du destin", type: 'serie', age: 5, on: ['prime'], genre: "Série animée", note: "Po et ses alliés vivent d'incroyables aventures." },
  { titre: "Les Anneaux de Pouvoir, saison 3", type: 'serie', age: 12, on: ['prime'], genre: "Fantasy", note: "Dès le 11 novembre 2026." },
  /* ----- Au cinéma ----- */
  { titre: "Le Chat chapeauté", type: 'cinema', age: 6, on: [], genre: "Animation Warner Bros.", note: "En salles depuis le 4 novembre 2026." },
  { titre: "Billie, à la croisée des mondes", type: 'cinema', age: 7, on: [], genre: "Animation Disney, fantastique", note: "En salles le 25 novembre 2026." },
  { titre: "Carmen l'oiseau rebelle", type: 'cinema', age: 5, on: [], genre: "Animation", note: "En salles le 16 décembre 2026." }
];

/* Idées de classiques à chercher sur ta plateforme (sans garantie de disponibilité) */
window.CLASSIQUES = [
  { titre: "Mon voisin Totoro", age: 4, genre: "Studio Ghibli" },
  { titre: "Kirikou et la sorcière", age: 4, genre: "Animation" },
  { titre: "Ernest et Célestine", age: 4, genre: "Animation" },
  { titre: "Le Voyage de Chihiro", age: 8, genre: "Studio Ghibli" },
  { titre: "Wallace & Gromit", age: 5, genre: "Animation en pâte à modeler" },
  { titre: "Paddington", age: 5, genre: "Famille" },
  { titre: "Les Aristochats", age: 4, genre: "Classique Disney" },
  { titre: "Le Livre de la jungle", age: 4, genre: "Classique Disney" },
  { titre: "Vice-versa", age: 6, genre: "Pixar" },
  { titre: "Là-haut", age: 6, genre: "Pixar" },
  { titre: "Le Monde de Nemo", age: 4, genre: "Pixar" },
  { titre: "La Reine des neiges", age: 4, genre: "Disney" },
  { titre: "Shaun le mouton, le film", age: 4, genre: "Animation" },
  { titre: "Harry Potter à l'école des sorciers", age: 8, genre: "Fantasy" },
  { titre: "Les Goonies", age: 10, genre: "Aventure" }
];
