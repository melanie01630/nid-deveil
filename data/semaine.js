/* Nouveau cette semaine : affiché en haut de l'accueil.
   À remplacer chaque lundi par les nouveautés de la semaine.
   date : date de mise à jour (JJ/MM/AAAA)
   items : { k: type, t: titre exact, x: phrase courte (facultatif) }
   k possibles : 'Activité', 'Recette', 'Blague', 'Devinette', 'Énigme', 'Astuce', 'Film' (FILMS), 'Nouveauté' (NOUV),
                 'Adulte' (ADULTES, visible seulement dans l'espace adultes), 'Vidéos', 'Bon plan', 'Info' (texte libre dans x) */
window.SEMAINE = {
  date: '15/11/2026',
  items: [
    { k: 'Info', t: "Toutes les recettes ont leurs quantités", x: "Les 62 recettes ont maintenant le nombre de personnes, les quantités exactes, les temps de préparation et de cuisson, des idées pour varier et la conservation. Les 216 activités ont aussi des étapes beaucoup plus détaillées." },
    { k: 'Activité', t: "Le calendrier de l'Avent maison", x: "À préparer maintenant pour le 1er décembre" },
    { k: 'Activité', t: "Les décorations de sapin en pâte à sel", x: "Des décorations faites maison pour Noël" },
    { k: 'Recette', t: "Truffes en chocolat", x: "Le cadeau gourmand parfait pour les fêtes" },
    { k: 'Recette', t: "Velouté de potimarron", x: "La soupe douce de saison" },
    { k: 'Nouveauté', t: "Le Noël d'Ernest et Célestine", x: "Au cinéma le 25 novembre, dès 3 ans" },
    { k: 'Nouveauté', t: "Hunger Games : Lever de soleil sur la moisson", x: "Au cinéma le 18 novembre, plutôt pour les ados" },
    { k: 'Adulte', t: "Il faut brûler Maman", x: "Le nouveau Dupontel, au cinéma" },
    { k: 'Adulte', t: "Possible Love", x: "Sur Netflix, Lion d'argent à Venise" },
    { k: 'Adulte', t: "Mon beau-père, ma belle-fille et moi", x: "Au cinéma le 25 novembre" }
  ]
};
