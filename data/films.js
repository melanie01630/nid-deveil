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
  { titre: "Tous en scène 1 et 2", an: '2016', type: 'film', age: 5, on: ['netflix'], genre: "Animation, musique", note: "Des animaux chanteurs et un concours de talents. Au catalogue dès le 1er novembre 2026." },
  { titre: "Klaus", an: '2019', type: 'film', age: 7, on: ['netflix'], genre: "Conte de Noël, animation", note: "L'amitié entre un facteur et un fabricant de jouets. Quelques passages mélancoliques." },
  { titre: "Les Mitchell contre les machines", an: '2021', type: 'film', age: 8, on: ['netflix'], genre: "Animation, aventure", note: "Une famille doit sauver le monde des robots. Parfois un peu intense pour les sensibles." },
  { titre: "Leo", an: '2023', type: 'film', age: 6, on: ['netflix'], genre: "Comédie musicale animée", note: "Un lézard de classe qui veut découvrir la liberté. Thème de la mort évoqué avec humour." },
  { titre: "La Famille Willoughby", an: '2020', type: 'film', age: 8, on: ['netflix'], genre: "Animation, humour noir", note: "Quatre enfants cherchent de nouveaux parents. Humour décalé." },
  { titre: "Mon beau Noël de chien", type: 'film', age: 13, on: ['netflix'], genre: "Drame familial", note: "Netflix indique 13+. La maladie y tient une place importante. Arrivé le 4 novembre 2026." },
  { titre: "Elfe", an: '2003', type: 'film', age: 5, on: ['netflix', 'disney'], genre: "Comédie de Noël", note: "Un humain élevé chez les elfes arrive à New York." },
  { titre: "Sœurs de sort", type: 'film', age: 7, on: ['netflix'], genre: "Animation, conte", note: "Cendrillon racontée par une de ses demi-sœurs. Dès le 20 novembre 2026." },
  { titre: "Y a pas de réseau", type: 'film', age: 8, on: ['netflix'], genre: "Comédie familiale", note: "Deux enfants et leurs parents dans un chalet sans réseau. Dès le 10 novembre 2026." },
  { titre: "Doozie et la niche enchantée", type: 'serie', age: 3, on: ['netflix'], genre: "Série jeunesse animée", note: "Pour les plus jeunes. Dès le 9 novembre 2026." },
  { titre: "Gabby et la maison magique", an: '2021', type: 'serie', age: 3, on: ['netflix'], genre: "Série jeunesse", note: "Formats courts et colorés pour les petits. Saison 14 disponible." },
  { titre: "Horton !", type: 'serie', age: 3, on: ['netflix'], genre: "Série animée", note: "Saison 2 disponible depuis mai 2026." },
  { titre: "L'École des licornes", type: 'serie', age: 7, on: ['netflix'], genre: "Aventure, fantastique", note: "Une école magique pour jeunes lecteurs de romans." },
  /* ----- Disney+ ----- */
  { titre: "Le Grinch (2018)", an: '2018', type: 'film', age: 4, on: ['disney'], genre: "Animation, Noël", note: "Au catalogue dès le 1er novembre 2026." },
  { titre: "Le Grinch (2000, avec Jim Carrey)", an: '2000', type: 'film', age: 6, on: ['disney'], genre: "Comédie, Noël", note: "Version en prises de vues réelles, plus sombre que l'animation." },
  { titre: "Frère Noël", an: '2007', type: 'film', age: 8, on: ['disney'], genre: "Comédie de Noël", note: "Dès le 1er novembre 2026." },
  { titre: "Cigognes et compagnie", an: '2016', type: 'film', age: 5, on: ['disney'], genre: "Animation, comédie", note: "Les cigognes livrent des colis, pas des bébés. Dès le 1er novembre 2026." },
  { titre: "Le Pôle Express", an: '2004', type: 'film', age: 6, on: ['disney'], genre: "Animation, Noël", note: "Un train mystérieux vers le pôle Nord. Dès le 15 novembre 2026." },
  { titre: "Cool Attitude : Magic Noël", type: 'film', age: 4, on: ['disney'], genre: "Film original Disney+", note: "Dès le 14 novembre 2026." },
  { titre: "Un Joyeux Noël Marvel", type: 'film', age: 6, on: ['disney'], genre: "Super-héros, Noël", note: "Les Avengers et Spider-Man fêtent Noël. Dès le 7 novembre 2026." },
  { titre: "Mickey, Noël seul à la maison", type: 'film', age: 3, on: ['disney'], genre: "Animation, Noël", note: "Dès le 27 novembre 2026." },
  { titre: "Il était une fois Disney World : Le vœu magique de Noël", type: 'film', age: 4, on: ['disney'], genre: "Famille, Noël", note: "Dès le 29 novembre 2026." },
  { titre: "Miraculous : Les Aventures de Ladybug et Chat Noir", an: '2015', type: 'serie', age: 6, on: ['disney'], genre: "Super-héros animés", note: "Disponible depuis le 4 novembre 2026." },
  { titre: "Bluey", an: '2018', type: 'serie', age: 3, on: ['disney', 'francetv'], genre: "Famille, animation", note: "Une petite chienne et sa famille. À voir aussi sur France.tv." },
  { titre: "Percy Jackson et les Olympiens, saison 3", an: '2023', type: 'serie', age: 10, on: ['disney'], genre: "Fantastique", note: "Dès le 20 novembre 2026, un épisode par semaine." },
  /* ----- Prime Video ----- */
  { titre: "Shrek", an: '2001', type: 'film', age: 6, on: ['prime'], genre: "Animation, humour", note: "Ajouté en avril 2026 : à confirmer sur ta plateforme." },
  { titre: "Clifford", an: '2021', type: 'film', age: 5, on: ['prime'], genre: "Famille, aventure", note: "Un chien géant et rouge. Ajouté en février 2026 : à confirmer." },
  { titre: "La Panthère rose 2", an: '2009', type: 'film', age: 8, on: ['prime'], genre: "Comédie", note: "Ajouté en mai 2026 : à confirmer." },
  { titre: "Kung Fu Panda : Les Pattes du destin", an: '2018', type: 'serie', age: 5, on: ['prime'], genre: "Série animée", note: "Po et ses alliés vivent d'incroyables aventures." },
  { titre: "Les Anneaux de Pouvoir, saison 3", an: '2022', type: 'serie', age: 12, on: ['prime'], genre: "Fantasy", note: "Dès le 11 novembre 2026." },
  /* ----- Au cinéma ----- */
  { titre: "Le Chat chapeauté", type: 'cinema', age: 6, on: [], genre: "Animation Warner Bros.", note: "En salles depuis le 4 novembre 2026." },
  { titre: "Billie, à la croisée des mondes", type: 'cinema', age: 7, on: [], genre: "Animation Disney, fantastique", note: "En salles le 25 novembre 2026." },
  { titre: "Carmen l'oiseau rebelle", type: 'cinema', age: 5, on: [], genre: "Animation", note: "En salles le 16 décembre 2026." }
];

/* Idées de classiques à chercher sur ta plateforme (sans garantie de disponibilité), des plus récents aux plus anciens */
window.CLASSIQUES = [
  /* ----- Films ----- */
  { type: 'film', titre: "Paddington au Pérou", an: '2024', age: 5, genre: "Famille, aventure" },
  { type: 'film', titre: "Vice-versa 2", an: '2024', age: 6, genre: "Pixar" },
  { type: 'film', titre: "Le Robot sauvage", an: '2024', age: 6, genre: "Animation DreamWorks" },
  { type: 'film', titre: "Vaiana 2", an: '2024', age: 6, genre: "Disney" },
  { type: 'film', titre: "Flow, le chat qui n'avait plus peur de l'eau", an: '2024', age: 6, genre: "Animation sans paroles, Oscar 2025" },
  { type: 'film', titre: "Wallace & Gromit : La Palme de la vengeance", an: '2024', age: 5, genre: "Animation en pâte à modeler" },
  { type: 'film', titre: "Élémentaire", an: '2023', age: 6, genre: "Pixar" },
  { type: 'film', titre: "Super Mario Bros., le film", an: '2023', age: 6, genre: "Animation, aventure" },
  { type: 'film', titre: "Wonka", an: '2023', age: 6, genre: "Comédie musicale" },
  { type: 'film', titre: "Spider-Man : Across the Spider-Verse", an: '2023', age: 10, genre: "Animation, super-héros" },
  { type: 'film', titre: "Le Garçon et le Héron", an: '2023', age: 10, genre: "Studio Ghibli" },
  { type: 'film', titre: "Le Chat potté 2 : La Dernière Quête", an: '2022', age: 7, genre: "Animation DreamWorks" },
  { type: 'film', titre: "Alerte rouge", an: '2022', age: 8, genre: "Pixar" },
  { type: 'film', titre: "Les Bad Guys", an: '2022', age: 7, genre: "Animation, comédie" },
  { type: 'film', titre: "Encanto, la fantastique famille Madrigal", an: '2021', age: 5, genre: "Disney" },
  { type: 'film', titre: "Luca", an: '2021', age: 6, genre: "Pixar" },
  { type: 'film', titre: "Soul", an: '2020', age: 8, genre: "Pixar" },
  { type: 'film', titre: "Paddington 2", an: '2017', age: 5, genre: "Famille" },
  { type: 'film', titre: "Coco", an: '2017', age: 7, genre: "Pixar" },
  { type: 'film', titre: "Ma vie de Courgette", an: '2016', age: 9, genre: "Animation française" },
  { type: 'film', titre: "Zootopie", an: '2016', age: 6, genre: "Disney" },
  { type: 'film', titre: "Vaiana, la légende du bout du monde", an: '2016', age: 5, genre: "Disney" },
  { type: 'film', titre: "Vice-versa", an: '2015', age: 6, genre: "Pixar" },
  { type: 'film', titre: "Shaun le mouton, le film", an: '2015', age: 4, genre: "Animation" },
  { type: 'film', titre: "Le Petit Prince", an: '2015', age: 6, genre: "Animation" },
  { type: 'film', titre: "Paddington", an: '2014', age: 5, genre: "Famille" },
  { type: 'film', titre: "La Reine des neiges", an: '2013', age: 4, genre: "Disney" },
  { type: 'film', titre: "Belle et Sébastien", an: '2013', age: 6, genre: "Aventure à la montagne" },
  { type: 'film', titre: "Ernest et Célestine", an: '2012', age: 4, genre: "Animation" },
  { type: 'film', titre: "Dragons", an: '2010', age: 7, genre: "Animation DreamWorks" },
  { type: 'film', titre: "Moi, moche et méchant", an: '2010', age: 5, genre: "Animation" },
  { type: 'film', titre: "Là-haut", an: '2009', age: 6, genre: "Pixar" },
  { type: 'film', titre: "Ratatouille", an: '2007', age: 5, genre: "Pixar" },
  { type: 'film', titre: "Wallace et Gromit : Le Mystère du lapin-garou", an: '2005', age: 5, genre: "Animation en pâte à modeler" },
  { type: 'film', titre: "Le Monde de Nemo", an: '2003', age: 4, genre: "Pixar" },
  { type: 'film', titre: "Astérix et Obélix : Mission Cléopâtre", an: '2002', age: 7, genre: "Comédie française" },
  { type: 'film', titre: "Le Voyage de Chihiro", an: '2001', age: 8, genre: "Studio Ghibli" },
  { type: 'film', titre: "Harry Potter à l'école des sorciers", an: '2001', age: 8, genre: "Fantasy" },
  { type: 'film', titre: "Kirikou et la sorcière", an: '1998', age: 4, genre: "Animation" },
  { type: 'film', titre: "Toy Story", an: '1995', age: 4, genre: "Pixar" },
  { type: 'film', titre: "Le Roi lion", an: '1994', age: 5, genre: "Classique Disney" },
  { type: 'film', titre: "Mon voisin Totoro", an: '1988', age: 4, genre: "Studio Ghibli" },
  { type: 'film', titre: "Retour vers le futur", an: '1985', age: 10, genre: "Aventure, science-fiction" },
  { type: 'film', titre: "Les Goonies", an: '1985', age: 10, genre: "Aventure" },
  { type: 'film', titre: "E.T. l'extra-terrestre", an: '1982', age: 7, genre: "Aventure" },
  { type: 'film', titre: "Les Aristochats", an: '1970', age: 4, genre: "Classique Disney" },
  { type: 'film', titre: "Le Livre de la jungle", an: '1967', age: 4, genre: "Classique Disney" },
  { type: 'film', titre: "Mary Poppins", an: '1964', age: 4, genre: "Comédie musicale" },
  /* ----- Séries ----- */
  { type: 'serie', titre: "Heartstopper", an: '2022', age: 13, genre: "Série ado, romance" },
  { type: 'serie', titre: "Mercredi", an: '2022', age: 12, genre: "Fantastique, humour noir" },
  { type: 'serie', titre: "Bluey", an: '2018', age: 3, genre: "Famille, animation" },
  { type: 'serie', titre: "Grizzy et les Lemmings", an: '2016', age: 4, genre: "Animation sans paroles" },
  { type: 'serie', titre: "Masha et Michka", an: '2009', age: 3, genre: "Animation" },
  { type: 'serie', titre: "Kaamelott", an: '2005', age: 12, genre: "Comédie française" },
  { type: 'serie', titre: "Avatar, le dernier maître de l'air", an: '2005', age: 8, genre: "Animation, aventure" },
  { type: 'serie', titre: "Peppa Pig", an: '2004', age: 3, genre: "Petits" },
  { type: 'serie', titre: "Malcolm", an: '2000', age: 10, genre: "Comédie familiale" },
  { type: 'serie', titre: "Pokémon", an: '1997', age: 6, genre: "Animation" },
  { type: 'serie', titre: "Il était une fois… la Vie", an: '1987', age: 6, genre: "Animation éducative" },
  { type: 'serie', titre: "Les Mystérieuses Cités d'or", an: '1982', age: 6, genre: "Animation, aventure" }
];
