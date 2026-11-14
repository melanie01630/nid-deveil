/* Anniversaires, événements, calendrier. */
window.ANNIV = [
  { t: "Licorne et arc-en-ciel", em: "🦄", ages: "3-8 ans", deco: "Ballons pastel, guirlande de nuages, paillettes comestibles sur la table.", jeux: ["Chasse aux arcs-en-ciel (objets de chaque couleur à retrouver)", "Habiller la licorne : cornes en carton à décorer", "Chaises musicales"], simple: "Gâteau au yaourt glacé de rose avec des bonbons colorés.", expert: "Gâteau en couches avec crème au beurre rose et bleue, corne en pâte à sucre.", cadeaux: ["Peluche licorne", "Kit de coloriage magique", "Livre d'histoires de licornes", "Bijoux et accessoires pour cheveux"] },
  { t: "Super-héros", em: "🦸", ages: "4-10 ans", deco: "Masques et capes à fabriquer, immeubles en carton, ballons rouges et bleus.", jeux: ["Parcours d'entraînement de super-héros", "Chasse à l'objet volé par le méchant", "Atelier : fabrique ton masque"], simple: "Cupcakes avec symbole en glaçage.", expert: "Gâteau en forme de bouclier avec décor en pâte à sucre.", cadeaux: ["Déguisement de super-héros", "Figurines", "Jeu de société coopératif", "Cape personnalisée"] },
  { t: "Dinosaures", em: "🦖", ages: "3-9 ans", deco: "Plantes vertes, œufs en papier mâché, traces de pas dans la maison.", jeux: ["Fouille de fossiles (plâtre ou sable avec figurines)", "Chasse aux œufs de dinosaure", "Rugissement et statue"], simple: "Gâteau au chocolat « volcan » avec dinosaures en plastique.", expert: "Gâteau en forme de dinosaure avec écailles en biscuits.", cadeaux: ["Kit de fouilles archéologiques", "Figurines de dinosaures", "Livre documentaire", "Puzzle géant"] },
  { t: "Pirates", em: "🏴‍☠️", ages: "4-10 ans", deco: "Carte au trésor, drapeau noir, coffre rempli de pièces en chocolat.", jeux: ["Chasse au trésor avec indices", "Parcours sur la planche", "Colin-maillard du pirate"], simple: "Gâteau « île au trésor » avec biscuits et pièces dorées.", expert: "Gâteau en forme de bateau avec voiles en papier gaufrette.", cadeaux: ["Déguisement de pirate", "Longue-vue", "Jeu de piste en boîte", "Livre de pirates"] },
  { t: "Princesses et chevaliers", em: "👑", ages: "3-8 ans", deco: "Tentures, couronnes en carton, château en cartons.", jeux: ["Sauver la princesse", "Bal des chevaliers", "Atelier couronnes"], simple: "Gâteau rond avec un glaçage de la couleur de la princesse.", expert: "Gâteau château avec tours en cônes de gaufre.", cadeaux: ["Déguisement", "Poupées ou figurines", "Jeu de construction château", "Livre de contes"] },
  { t: "Cirque", em: "🎪", ages: "4-10 ans", deco: "Rayures rouges et blanches, popcorn, affiches de spectacle.", jeux: ["Ateliers jonglage avec foulards", "Funambule sur une ligne au sol", "Maquillage de clown"], simple: "Popcorn caramel et gâteau rayé.", expert: "Gâteau chapiteau avec rayures en pâte à sucre.", cadeaux: ["Kit de jonglage", "Maquillage enfant", "Livre de magie", "Costume de clown"] },
  { t: "Atelier pâtisserie", em: "🧁", ages: "5-12 ans", deco: "Tabliers, toques, nappe à carreaux.", jeux: ["Décorer ses cupcakes", "Concours du plus beau gâteau", "Quiz des ingrédients"], simple: "Cupcakes à décorer soi-même.", expert: "Macarons ou gâteau layer cake en atelier.", cadeaux: ["Tablier et toque", "Livre de recettes pour enfants", "Moules à gâteaux amusants", "Kit de décoration de cupcakes"] },
  { t: "Jungle et safari", em: "🦁", ages: "3-8 ans", deco: "Feuilles tropicales, peluches animaux, jumelles en rouleaux de papier.", jeux: ["Safari dans la maison", "Cache-cache des animaux", "Imiter les cris"], simple: "Gâteau au chocolat avec animaux en biscuits.", expert: "Gâteau en forme de lion avec crinière en pâte à sucre.", cadeaux: ["Peluche animal", "Jumelles enfant", "Livre sur les animaux", "Puzzle jungle"] },
  { t: "Espace et astronautes", em: "🚀", ages: "4-11 ans", deco: "Ciel étoilé, planètes en ballons, fusée en carton.", jeux: ["Mission lunaire en lévitation (ballons)", "Chasse aux météorites", "Course d'astronautes avec casques"], simple: "Gâteau noir avec étoiles en bonbons.", expert: "Gâteau planète avec glaçage miroir bleu et étoiles.", cadeaux: ["Projecteur d'étoiles", "Kit de fusée à construire", "Livre sur l'espace", "Déguisement d'astronaute"] },
  { t: "Sirènes et océan", em: "🧜", ages: "3-9 ans", deco: "Bleus et verts, poissons en papier, coquillages.", jeux: ["Pêche aux canards", "Chasse au trésor sous-marin", "Maquillage sirène"], simple: "Gâteau bleu avec décor de coquillages en chocolat.", expert: "Gâteau queue de sirène avec écailles en chocolat.", cadeaux: ["Queue de sirène", "Livre sur l'océan", "Kit de perles", "Peluche marine"] },
  { t: "Foot et sport", em: "⚽", ages: "5-12 ans", deco: "Maillots, terrain en nappe verte, médailles pour tous.", jeux: ["Mini-tournoi de foot", "Tir au but", "Parcours chronométré"], simple: "Gâteau « terrain de foot » vert avec des cookies en ballons.", expert: "Gâteau en forme de ballon avec damier.", cadeaux: ["Ballon", "Maillot", "Gants et protège-tibias", "Livre sur le sport"] },
  { t: "Fête foraine", em: "🎡", ages: "4-10 ans", deco: "Stands colorés, tickets, barbe à papa.", jeux: ["Pêche aux canards", "Chamboule-tout", "Tir à l'arc avec ventouses"], simple: "Pop-corn, barbe à papa et gaufres.", expert: "Gâteau manège avec étages décorés.", cadeaux: ["Jeux d'adresse", "Chamboule-tout", "Peluche de la fête foraine", "Kit de maquillage"] },
  { t: "Soirée pyjama", em: "🌙", ages: "6-12 ans", deco: "Guirlandes lumineuses, matelas au sol, couvertures et coussins.", jeux: ["Cinéma maison avec pop-corn", "Histoires à la lampe de poche", "Battle de blagues"], simple: "Pizzas maison et gâteau au chocolat.", expert: "Gâteau étoile de nuit avec glaçage bleu.", cadeaux: ["Pyjama rigolo", "Veilleuse", "Livre d'histoires", "Jeu de cartes"] },
  { t: "Détectives et mystères", em: "🕵️", ages: "7-12 ans", deco: "Loupes, empreintes de pas, rubans « scène de crime » en papier.", jeux: ["Enquête avec indices", "Messages secrets à décoder", "Qui a pris le gâteau ?"], simple: "Gâteau au chocolat avec empreintes en sucre glace.", expert: "Gâteau mystère avec cœur coloré caché.", cadeaux: ["Kit de détective", "Jeu d'enquête", "Roman policier jeunesse", "Lampe torche"] },
  { t: "Magiciens et sorciers", em: "🪄", ages: "6-12 ans", deco: "Chandelles en papier, baguettes à fabriquer, grimoires.", jeux: ["Cours de potions (jus et colorants)", "Chasse aux objets magiques", "Tours de magie à apprendre"], simple: "Cupcakes « potion » avec glaçage coloré.", expert: "Gâteau livre de magie avec décor doré.", cadeaux: ["Kit de magie", "Livre de tours", "Cape et baguette", "Jeu de cartes magique"] }
];
window.CADEAUX_AGES = [
  { a: "0-1 an", l: ["Hochets et anneaux de dentition", "Tapis d'éveil", "Livres en tissu", "Jouets à empiler"] },
  { a: "1-2 ans", l: ["Cubes à empiler", "Porteurs et jouets à pousser", "Instruments de musique simples", "Livres cartonnés"] },
  { a: "3-4 ans", l: ["Puzzles simples", "Déguisements", "Pâte à modeler", "Jeux de construction"] },
  { a: "5-6 ans", l: ["Jeux de société coopératifs", "Vélo ou trottinette", "Kit de bricolage", "Premiers livres à lire seul"] },
  { a: "7-9 ans", l: ["Jeux de société", "Kits scientifiques", "Livres de romans jeunesse", "Matériel de dessin"] },
  { a: "10-12 ans", l: ["Jeux de stratégie", "Kits créatifs avancés", "Livres et BD", "Matériel de sport"] }
];
window.ANNIV_PLAN = [
  ["4 semaines avant", "Choisis la date, le thème et la liste des invités. Envoie les invitations."],
  ["2 semaines avant", "Commande ou achète la déco et le cadeau. Prévois le gâteau et le goûter."],
  ["1 semaine avant", "Prépare les jeux et les cadeaux de remerciement. Relance les invités si besoin."],
  ["La veille", "Prépare le gâteau, installe la déco, range les pièces qui servent."],
  ["Le jour J", "Respire, profite, prends des photos. Prévois un temps calme à la fin."]
];

window.EVENTS = [
  { t: "Soirée pyjama", em: "🌙", ages: "6-12 ans", duree: "Soirée et nuit", themes: ["Cinéma sous les couvertures", "Spa à la maison", "Nuit des histoires"], prog: ["18h : arrivée et installation des matelas", "19h : pizzas maison", "20h : film ou jeu de société", "21h30 : histoires à la lampe de poche", "22h : dodo (ou presque)"], liste: ["Matelas ou duvets", "Pop-corn", "Lampe de poche", "Pizza ou ingrédients de pizzas", "Brosses à dents"] },
  { t: "Après-midi entre copains", em: "🎈", ages: "4-12 ans", duree: "3 heures", themes: ["Olympiades", "Atelier créatif", "Jeux de plein air"], prog: ["14h : accueil et jeu libre", "14h30 : activité principale", "16h : goûter", "16h45 : jeu calme", "17h : fin"], liste: ["Matériel de l'activité", "Goûter simple", "Gobelets et serviettes"] },
  { t: "Chasse au trésor", em: "🗺️", ages: "4-10 ans", duree: "1 à 2 heures", themes: ["Pirates", "Dinosaures", "Contes de fées"], prog: ["Prépare 6 à 8 indices", "Cache-les dans la maison ou le jardin", "Donne la carte de départ", "Le trésor : petits cadeaux et bonbons"], liste: ["Papiers et crayons", "Un petit coffre", "Friandises ou petits cadeaux"] },
  { t: "Pique-nique au parc", em: "🧺", ages: "Tous âges", duree: "Demi-journée", themes: ["Parc animé", "Pique-nique d'automne", "Pique-nique d'été"], prog: ["Rendez-vous à midi", "Repas partagé", "Jeux de ballon ou corde à sauter", "Goûter", "Ramassage des déchets"], liste: ["Nappe", "Salade de pâtes", "Fruits et eau", "Ballon et jeux d'extérieur", "Sacs pour déchets"] },
  { t: "Soirée cinéma maison", em: "🎬", ages: "4-12 ans", duree: "Soirée", themes: ["Film d'animation", "Aventure", "Film musical"], prog: ["Installe coussins et couvertures", "Prépare tickets et pop-corn", "Film", "Débat : qui a préféré quoi ?"], liste: ["Pop-corn", "Couvertures", "Projecteur ou écran", "Boissons"] },
  { t: "Halloween", em: "🎃", ages: "4-12 ans", duree: "Soirée", themes: ["Maison hantée douce", "Atelier citrouilles", "Chasse aux bonbons"], prog: ["Déguisements", "Sculpture de citrouille", "Chasse aux bonbons", "Goûter qui fait peur (gentiment)"], liste: ["Citrouilles", "Bonbons", "Déguisements", "Décorations"] },
  { t: "Goûter de Noël entre amis", em: "🎄", ages: "3-12 ans", duree: "Après-midi", themes: ["Atelier biscuits", "Décorations à fabriquer", "Spectacle de Noël"], prog: ["Atelier sablés", "Fabrication de décorations", "Goûter chaud", "Chants de Noël"], liste: ["Pâte à sablés", "Emporte-pièces", "Chocolat chaud", "Matériel de bricolage"] },
  { t: "Carnaval", em: "🎭", ages: "3-12 ans", duree: "Après-midi", themes: ["Défilé de masques", "Costumes de héros", "Fête colorée"], prog: ["Fabrication de masques", "Défilé", "Danse", "Goûter"], liste: ["Papier et colle", "Confettis", "Musique", "Crêpes ou beignets"] },
  { t: "Chandeleur et crêpes party", em: "🥞", ages: "3-12 ans", duree: "Après-midi", themes: ["Garnitures folles", "Concours de sauts de crêpes", "Atelier pâte"], prog: ["Préparation de la pâte", "Cuisson", "Dégustation", "Concours de la plus belle crêpe"], liste: ["Farine, œufs, lait", "Nutella, confiture, fruits", "Poêles", "Tabliers"] },
  { t: "Camping dans le jardin ou le salon", em: "⛺", ages: "5-12 ans", duree: "Soirée et nuit", themes: ["Étoiles", "Aventuriers", "Histoires de montagne"], prog: ["Montage de la tente", "Dîner de camping", "Jeux de lumière", "Histoires et dodo"], liste: ["Tente ou couvertures", "Lampes", "Duvets", "Guimauves"] },
  { t: "Boum des enfants", em: "🪩", ages: "7-12 ans", duree: "3 heures", themes: ["Disco", "Karaoké", "Années 80"], prog: ["Musique et danse", "Jeux musicaux", "Goûter", "Photos souvenirs"], liste: ["Enceinte", "Lumières", "Micros karaoké", "Boissons et gâteaux"] },
  { t: "Fête des voisins", em: "🏡", ages: "Tous âges", duree: "Soirée", themes: ["Buffet partagé", "Jeux pour tous", "Soirée musicale"], prog: ["Installation des tables", "Chacun apporte un plat", "Jeux pour les enfants", "Musique"], liste: ["Tables et chaises", "Plats à partager", "Gobelets", "Affiches pour inviter"] },
  { t: "Atelier créatif entre mams", em: "🎨", ages: "Adultes et enfants", duree: "2 heures", themes: ["Peinture", "Bricolage de saison", "Couronnes de fleurs"], prog: ["Accueil et café", "Atelier commun", "Goûter partagé", "Exposition des œuvres"], liste: ["Matériel de bricolage", "Nappes de protection", "Café et gâteaux"] },
  { t: "Kermesse maison", em: "🎠", ages: "4-10 ans", duree: "Après-midi", themes: ["Stands de jeux", "Tombola", "Maquillage"], prog: ["Création des stands", "Jeux avec tickets", "Tombola", "Goûter"], liste: ["Tickets en papier", "Lots", "Matériel de jeux", "Maquillage"] }
];

/* Vacances scolaires 2026-2027 : début (premier jour sans école) et fin (dernier jour de vacances, la reprise est le lendemain). Sources : calendrier officiel du ministère (arrêté du 22 octobre 2025). */
window.VAC_ZONES = {
  A: "Zone A : Besançon, Bordeaux, Clermont-Ferrand, Dijon, Grenoble, Limoges, Lyon, Poitiers.",
  B: "Zone B : Aix-Marseille, Amiens, Lille, Nancy-Metz, Nantes, Nice, Normandie, Orléans-Tours, Reims, Rennes, Strasbourg.",
  C: "Zone C : Créteil, Montpellier, Paris, Toulouse, Versailles."
};
window.VACANCES = [
  { n: "Toussaint 2026", z: "ABC", d: "2026-10-17", f: "2026-11-01" },
  { n: "Noël 2026", z: "ABC", d: "2026-12-19", f: "2027-01-03" },
  { n: "Hiver 2027", z: "A", d: "2027-02-13", f: "2027-02-28" },
  { n: "Hiver 2027", z: "B", d: "2027-02-20", f: "2027-03-07" },
  { n: "Hiver 2027", z: "C", d: "2027-02-06", f: "2027-02-21" },
  { n: "Printemps 2027", z: "A", d: "2027-04-10", f: "2027-04-25" },
  { n: "Printemps 2027", z: "B", d: "2027-04-17", f: "2027-05-02" },
  { n: "Printemps 2027", z: "C", d: "2027-04-03", f: "2027-04-18" },
  { n: "Pont de l'Ascension 2027", z: "ABC", d: "2027-05-06", f: "2027-05-09" },
  { n: "Été 2027", z: "ABC", d: "2027-07-03", f: "2027-09-01" }
];
