/* Sorties : quelques grandes destinations d'Europe.
   On ne garantit pas les horaires, les tarifs ni les dates d'ouverture : vérifie toujours le site officiel.
   t : parc | zoo | eau | musee */
window.SORTIES_TYPES = [['parc','Parcs d\'attractions'],['zoo','Zoos et nature'],['eau','Piscines et eau'],['musee','Musées et sciences']];
window.SORTIES_NEAR = [
  ['Piscines','piscine'],['Parcs et aires de jeux','aire de jeux enfants'],['Jeux d\'intérieur (kid parks)','parc de jeux enfants intérieur'],
  ['Parcs d\'attractions','parc d\'attractions'],['Zoos et fermes','zoo ferme pédagogique'],['Musées pour enfants','musée enfants'],
  ['Médiathèques','médiathèque bibliothèque'],['Cinémas','cinéma']
];
window.SORTIES = [
  { n: "Disneyland Paris", v: "Marne-la-Vallée", p: "France", t: "parc" },
  { n: "Parc Astérix", v: "Plailly", p: "France", t: "parc" },
  { n: "Futuroscope", v: "Chasseneuil-du-Poitou", p: "France", t: "parc" },
  { n: "Puy du Fou", v: "Les Épesses", p: "France", t: "parc" },
  { n: "Europa-Park", v: "Rust", p: "Allemagne", t: "parc" },
  { n: "Phantasialand", v: "Brühl", p: "Allemagne", t: "parc" },
  { n: "Legoland Billund", v: "Billund", p: "Danemark", t: "parc" },
  { n: "Efteling", v: "Kaatsheuvel", p: "Pays-Bas", t: "parc" },
  { n: "Walibi Belgium", v: "Wavre", p: "Belgique", t: "parc" },
  { n: "PortAventura World", v: "Salou", p: "Espagne", t: "parc" },
  { n: "Gardaland", v: "Castelnuovo del Garda", p: "Italie", t: "parc" },
  { n: "Liseberg", v: "Göteborg", p: "Suède", t: "parc" },
  { n: "Zoo de Beauval", v: "Saint-Aignan", p: "France", t: "zoo" },
  { n: "Pairi Daiza", v: "Brugelette", p: "Belgique", t: "zoo" },
  { n: "Nausicaá", v: "Boulogne-sur-Mer", p: "France", t: "zoo" },
  { n: "Artis", v: "Amsterdam", p: "Pays-Bas", t: "zoo" },
  { n: "Loro Parque", v: "Puerto de la Cruz, Tenerife", p: "Espagne", t: "zoo" },
  { n: "Aquaboulevard", v: "Paris", p: "France", t: "eau" },
  { n: "Tropical Islands", v: "Krausnick", p: "Allemagne", t: "eau" },
  { n: "Therme Erding", v: "Erding", p: "Allemagne", t: "eau" },
  { n: "Siam Park", v: "Adeje, Tenerife", p: "Espagne", t: "eau" },
  { n: "Cité des sciences et de l'industrie", v: "Paris", p: "France", t: "musee" },
  { n: "NEMO Science Museum", v: "Amsterdam", p: "Pays-Bas", t: "musee" },
  { n: "Deutsches Museum", v: "Munich", p: "Allemagne", t: "musee" },
  { n: "Science Museum", v: "Londres", p: "Royaume-Uni", t: "musee" }
];
