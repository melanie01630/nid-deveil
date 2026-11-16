/* Nouveau cette semaine : affiché en haut de l'accueil.
   À remplacer chaque lundi par les nouveautés de la semaine.
   date : date de mise à jour (JJ/MM/AAAA)
   items : { k: type, t: titre exact, x: phrase courte (facultatif) }
   k possibles : 'Activité', 'Recette', 'Blague', 'Devinette', 'Énigme', 'Astuce', 'Film' (FILMS), 'Nouveauté' (NOUV),
                 'Adulte' (ADULTES, visible seulement dans l'espace adultes), 'Vidéos', 'Bon plan', 'Info' (texte libre dans x) */
window.SEMAINE = {
  date: '16/11/2026',
  items: [
    { k: 'Activité', t: "La boule à neige maison", x: "Un petit bocal où il neige quand on le secoue" },
    { k: 'Recette', t: "Chocolat chaud maison", x: "Bien mousseux, prêt en 10 minutes" },
    { k: 'Activité', t: "La guirlande d'oranges séchées", x: "La déco de Noël qui parfume toute la maison" },
    { k: 'Nouveauté', t: "Astérix : Le Royaume de Nubie", x: "Au cinéma le 2 décembre, dès 6 ans" },
    { k: 'Nouveauté', t: "Journal d'un dégonflé Noël : Sauve qui peut", x: "Sur Disney+ le 4 décembre" },
    { k: 'Recette', t: "Mendiants au chocolat", x: "Le petit cadeau gourmand que les enfants décorent" },
    { k: 'Activité', t: "Les rennes en empreintes de mains", x: "Un souvenir de Noël tout doux pour les petits" },
    { k: 'Activité', t: "La boîte solidaire de décembre", x: "Un objet par jour à offrir avant Noël" },
    { k: 'Blague', t: "Comment appelle-t-on un bonhomme de neige qui a trop chaud ?", x: "La blague de la semaine pour les petits" },
    { k: 'Info', t: "Nouveaux exercices, histoires et coloriages", x: "Cette semaine : 31 nouveaux exercices d'école, 60 nouvelles questions de culture G, 2 coloriages de Noël et d'automne et un coloriage magique « La boule de Noël », 2 nouvelles histoires à lire (« Le sapin tout nu d'Amir » et « Le mystère des bonnets de la rue des Tilleuls »), 3 recettes de fête et 5 nouvelles blagues pour adultes." },
    { k: 'Adulte', t: "Fatherland", x: "Au cinéma le 2 décembre, avec Sandra Hüller" },
    { k: 'Adulte', t: "Orgueil et préjugés, la série", x: "Sur Netflix le 3 décembre" }
  ]
};
