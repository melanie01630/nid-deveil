/* Vidéos de mams : des thèmes précis, chacun avec ses mots-clés.
   Chaque bouton ouvre la recherche dans l'appli (TikTok, Instagram) ou YouTube.
   c = catégorie, t = titre, d = description, q = recherche TikTok/YouTube, h = hashtag (sans #), y = recherche YouTube (facultatif)
   Pour ajouter une idée : copie une ligne et change les mots. */
window.VIDEOS_DATE = '14 novembre 2026';
window.VIDEOS_CATS = { buzz: 'Ça cartonne', quotidien: 'Vie de quartier', humour: 'Fous rires', astuces: 'Astuces', recettes: 'Recettes', activites: 'Activités enfants', fetes: 'Fêtes et Noël' };
window.VIDEOS = [
  /* Ça cartonne en ce moment */
  { c: 'buzz', t: 'Le calendrier de l’Avent fait maison', d: 'Les idées qui font le tour des réseaux avant décembre : cases à remplir, petits défis, DIY.', q: 'calendrier de l avent maison enfants', h: 'calendrierdelavent' },
  { c: 'buzz', t: 'Le lutin farceur : les idées de bêtises', d: 'Une bêtise différente chaque matin, des idées faciles avec ce qu’on a à la maison.', q: 'lutin farceur idées bêtises', h: 'lutinfarceur' },
  { c: 'buzz', t: 'Black Friday : les bons plans des mamans', d: 'Les jouets, vêtements et cadeaux à bon prix. Compare toujours avant d’acheter.', q: 'black friday bons plans maman jouets', h: 'blackfriday' },
  { c: 'buzz', t: 'Cadeaux de Noël malins et pas chers', d: 'Des idées par âge et par budget, vues par d’autres parents.', q: 'idées cadeaux noël enfants pas cher', h: 'ideecadeau' },
  { c: 'buzz', t: 'Défis du moment à faire en famille', d: 'Les défis et trends qui tournent en ce moment, à regarder avec les enfants et à refaire à la maison.', q: 'défi famille enfants trend', h: 'defifamille' },
  { c: 'buzz', t: 'Les vidéos de mams qui font le plus rire', d: 'Les extraits de vie de famille les plus partagés du moment.', q: 'maman drôle enfants compilation', h: 'mamandrole' },
  { c: 'buzz', t: 'Une journée dans la vie d’une maman', d: 'Le format « une journée avec moi » : matin, école, goûter, soirée.', q: 'une journée dans la vie de maman', h: 'journeedemaman' },
  /* Vie de quartier */
  { c: 'quotidien', t: 'Une maman de quartier et ses enfants', d: 'Des mams comme toi qui filment leur quotidien : le matin pressé, le trajet de l’école, le goûter.', q: 'maman de quartier avec ses enfants', h: 'mamandequartier' },
  { c: 'quotidien', t: 'Routine du matin avec les enfants', d: 'Habillage, petit-déjeuner, cartable : comment elles s’organisent pour partir à l’heure.', q: 'routine du matin maman enfants école', h: 'routinematin' },
  { c: 'quotidien', t: 'Sortie d’école et goûters', d: 'Les petits moments de la sortie d’école, ce qui se passe vraiment à 16h30.', q: 'sortie école maman goûter', h: 'sortiedecole' },
  { c: 'quotidien', t: 'Le quotidien avec 3 enfants ou plus', d: 'Familles nombreuses : organisation, repas, linge, bonne humeur.', q: 'maman famille nombreuse quotidien', h: 'famillenombreuse' },
  { c: 'quotidien', t: 'Maman solo : organisation et courage', d: 'Des mamans seules qui partagent leurs trucs et leur force.', q: 'maman solo quotidien', h: 'mamansolo' },
  { c: 'quotidien', t: 'Maman au foyer, maman qui travaille', d: 'Deux vies, deux rythmes, mêmes fous rires.', q: 'maman qui travaille quotidien enfants', h: 'viedemaman' },
  { c: 'quotidien', t: 'Premiers mois avec bébé', d: 'Sommeil, biberons, fatigue : le vrai quotidien des jeunes mams.', q: 'maman bébé premiers mois quotidien', h: 'mamanbebe' },
  { c: 'quotidien', t: 'Courses et repas de la semaine', d: 'Le chariot de la semaine, le budget, le menu pour toute la famille.', q: 'courses famille semaine menu budget', h: 'courses' },
  /* Fous rires */
  { c: 'humour', t: 'Les phrases d’enfants qui font rire', d: 'Ce que les enfants disent sans filtre.', q: 'enfant dit phrases drôles maman', h: 'enfantdrole' },
  { c: 'humour', t: 'Sketchs de mams', d: 'Des mams qui se moquent d’elles-mêmes avec tendresse.', q: 'sketch maman humour', h: 'humourmaman' },
  { c: 'humour', t: 'Ce que dit une maman dans la journée', d: '« Mets tes chaussures ! » : les phrases qu’on répète tous les jours.', q: 'phrases que dit une maman', h: 'momlife' },
  { c: 'humour', t: 'Maman vs enfants : les bêtises', d: 'Quand les enfants font des bêtises et que la maman n’en revient pas.', q: 'enfants bêtises maman réaction', h: 'betisesdenfants' },
  { c: 'humour', t: 'Les papas et les enfants', d: 'Les papas qui gardent seuls, avec le sourire (ou pas).', q: 'papa garde les enfants drôle', h: 'papaetenfants' },
  /* Astuces */
  { c: 'astuces', t: 'Astuces de mamans pour gagner du temps', d: 'Des trucs simples pour la maison et les enfants.', q: 'astuces maman gagner du temps', h: 'astucemaman' },
  { c: 'astuces', t: 'Ménage rapide avec des enfants', d: 'Un ménage efficace en 15 minutes, sans se fâcher.', q: 'ménage rapide avec enfants astuce', h: 'menagerapide' },
  { c: 'astuces', t: 'Ranger la chambre des enfants', d: 'Des systèmes de rangement faciles pour que les enfants participent.', q: 'ranger chambre enfants astuce', h: 'rangement' },
  { c: 'astuces', t: 'Lessive et taches : les astuces qui marchent', d: 'Taches de chocolat, d’herbe, de feutre : les gestes qui sauvent les vêtements.', q: 'enlever tache vêtement enfant astuce', h: 'astucemenage' },
  { c: 'astuces', t: 'Économiser sur les courses', d: 'Les mams qui font de grosses économies, avec leurs méthodes.', q: 'économiser courses famille astuces', h: 'economies' },
  { c: 'astuces', t: 'Valise et voyage avec enfants', d: 'Préparer une valise ou un trajet en voiture sans stress.', q: 'voyage avec enfants astuces valise', h: 'voyageenfants' },
  /* Recettes */
  { c: 'recettes', t: 'Repas rapide du soir en 20 minutes', d: 'Des recettes simples quand on rentre tard.', q: 'recette rapide soir famille 20 minutes', h: 'recetterapide' },
  { c: 'recettes', t: 'Idées de goûters maison', d: 'Cakes, muffins, compotes : le goûter fait maison.', q: 'goûter maison enfants recette facile', h: 'gouter' },
  { c: 'recettes', t: 'Gâteaux simples avec les enfants', d: 'Des gâteaux faciles à faire à plusieurs, avec peu d’ingrédients.', q: 'gâteau facile avec enfants recette', h: 'gateaufacile' },
  { c: 'recettes', t: 'Plats à mijoter pour toute la famille', d: 'Les plats du dimanche, peu chers, qui cuisent tout seuls.', q: 'plat mijoté famille recette pas cher', h: 'platmijote' },
  { c: 'recettes', t: 'Légumes que les enfants acceptent', d: 'Des façons de cuisiner les légumes pour les faire aimer.', q: 'faire manger légumes enfants recette', h: 'legumesenfants' },
  { c: 'recettes', t: 'Pique-nique et lunchbox', d: 'Des idées pour les boîtes repas et les sorties.', q: 'lunch box enfants idées', h: 'lunchbox' },
  /* Activités */
  { c: 'activites', t: 'Activités manuelles avec presque rien', d: 'Papier, carton, peinture : des idées sans achat.', q: 'activité manuelle enfants avec du carton', h: 'activitemanuelle' },
  { c: 'activites', t: 'Que faire un jour de pluie à la maison ?', d: 'Cabanes, jeux, expériences : pour ne pas tourner en rond.', q: 'que faire à la maison avec enfants jour de pluie', h: 'activiteenfants' },
  { c: 'activites', t: 'Jeux de société et jeux sans matériel', d: 'Des jeux à lancer en 1 minute, à plusieurs.', q: 'jeux en famille sans matériel', h: 'jeuxenfamille' },
  { c: 'activites', t: 'Expériences scientifiques faciles', d: 'Volcan, arc-en-ciel, slime : des expériences à faire à la cuisine.', q: 'expérience scientifique facile enfants maison', h: 'experienceenfants' },
  { c: 'activites', t: 'Sorties gratuites avec les enfants', d: 'Parcs, balades, musées gratuits : des idées près de chez toi.', q: 'sortie gratuite avec enfants idées', h: 'sortieenfants' },
  { c: 'activites', t: 'Danse et chansons pour les petits', d: 'Comptines, danses et jeux pour bouger ensemble.', q: 'comptines danse enfants bouger', h: 'comptines', y: 'comptines et chansons à gestes' },
  /* Fêtes */
  { c: 'fetes', t: 'Décorations de Noël faites maison', d: 'Guirlandes, boules, couronnes : à faire avec les enfants.', q: 'décoration noël maison enfants diy', h: 'noeldiy' },
  { c: 'fetes', t: 'Recettes de Noël faciles', d: 'Bûches, biscuits, plats de fête sans se ruiner.', q: 'recette noël facile famille', h: 'recettenoel' },
  { c: 'fetes', t: 'Idées de thème d’anniversaire', d: 'Décoration, gâteau et jeux pour un anniversaire réussi.', q: 'anniversaire enfant idées thème déco', h: 'anniversaireenfant' },
  { c: 'fetes', t: 'Soirée pyjama réussie', d: 'Programme, jeux, repas et coucher d’une soirée pyjama.', q: 'soirée pyjama enfants idées', h: 'soireepyjama' }
];
