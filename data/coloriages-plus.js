/* Mams · nouveaux coloriages ajoutés chaque semaine (s'ajoutent à ceux de coloriages.js).
   dessins : "Nom du dessin": "éléments SVG (path, circle, rect, ellipse…) dans un carré de 300 × 300, traits seulement"
   magiques : "Nom": { g: [10 lignes de 10 caractères : '.' = case vide, '1' à '5' = code couleur], k: { 1: ['nom de la couleur', '#code'], ... } } */
window.COLO_PLUS = {
  dessins: {
    /* 16/11/2026 */
    "Le cadeau de Noël": "<rect x=\"60\" y=\"140\" width=\"180\" height=\"130\" rx=\"6\"/><rect x=\"45\" y=\"105\" width=\"210\" height=\"40\" rx=\"6\"/><rect x=\"135\" y=\"105\" width=\"30\" height=\"165\"/><ellipse cx=\"118\" cy=\"80\" rx=\"34\" ry=\"18\" transform=\"rotate(-25 118 80)\"/><ellipse cx=\"182\" cy=\"80\" rx=\"34\" ry=\"18\" transform=\"rotate(25 182 80)\"/><path d=\"M140 100 L115 135 L128 133 L135 145 Z\"/><path d=\"M160 100 L185 135 L172 133 L165 145 Z\"/><circle cx=\"150\" cy=\"98\" r=\"14\"/><circle cx=\"95\" cy=\"180\" r=\"10\"/><circle cx=\"205\" cy=\"180\" r=\"10\"/><circle cx=\"95\" cy=\"235\" r=\"10\"/><circle cx=\"205\" cy=\"235\" r=\"10\"/><polygon points=\"40,30 45,42 58,43 48,51 51,64 40,57 29,64 32,51 22,43 35,42\"/><polygon points=\"262,40 266,50 277,51 269,58 271,69 262,63 253,69 255,58 247,51 258,50\"/><path d=\"M20 285 H280\"/>",
    "Le hérisson d'automne": "<path d=\"M47.1 205.0 L26.7 195.1 L49.1 188.6 L31.5 175.6 L55.1 172.8 L41.0 157.3 L64.8 158.3 L54.7 140.9 L77.8 145.7 L72.2 127.0 L93.6 135.3 L92.7 116.1 L111.7 127.7 L115.4 108.7 L131.2 123.1 L139.5 105.1 L151.5 121.7 L164.0 105.3 L171.7 123.6 L188.0 109.5 L191.1 128.6 L210.5 117.5 L208.9 136.7 L230.6 128.8 L224.3 147.4 L247.5 143.1 L236.9 160.4 L245 170 Q285 190 270 205 L60 205 Q45 205 50 195 Z\"/><path d=\"M205 150 Q230 140 245 170 Q285 190 270 205 L190 205 Q175 175 205 150 Z\"/><circle cx=\"232\" cy=\"168\" r=\"6\"/><circle cx=\"276\" cy=\"200\" r=\"8\"/><path d=\"M200 190 q10 8 22 4\"/><ellipse cx=\"95\" cy=\"214\" rx=\"20\" ry=\"11\"/><ellipse cx=\"185\" cy=\"214\" rx=\"20\" ry=\"11\"/><path d=\"M20 226 H285\"/><path d=\"M110 105 Q140 70 175 95 Q145 130 110 105 Z\"/><path d=\"M115 104 Q145 98 172 96\"/><circle cx=\"45\" cy=\"60\" r=\"14\"/><path d=\"M45 46 q4-12 14-14\"/><path d=\"M240 40 q20 5 25 25 q-25 0 -25 -25 Z\"/>"
  },
  magiques: {
    /* 16/11/2026 */
    "La boule de Noël": { g: ["....11....", "...1111...", "..222222..", ".22422422.", "2222222222", "3333333333", "2222222222", ".22422422.", "..222222..", "...2222..."], k: { 1: ['doré', '#D4A72C'], 2: ['rouge', '#E5484D'], 3: ['vert', '#3BAA5C'], 4: ['jaune', '#F5C542'] } }
  }
};
