/* Ingrédients avec quantités pour les activités de cuisine.
   Format : "Titre exact": { p: pour combien, q: [ingrédients avec quantités] } — ajouté à ACT_DETAIL */
window.ACT_DETAIL = window.ACT_DETAIL || {};
(function () {
  const ING = {
    "Les muffins pomme & cannelle": { p: "12 muffins", q: ["250 g de farine", "100 g de sucre", "1 sachet de levure chimique (11 g)", "1 cuillère à café de cannelle", "2 œufs", "15 cl de lait", "8 cl d'huile neutre", "2 pommes"] },
    "Les crêpes party": { p: "15 crêpes environ (4 personnes)", q: ["250 g de farine", "4 œufs", "50 cl de lait", "1 pincée de sel", "30 g de beurre fondu", "Garnitures : sucre, pâte à tartiner, confiture, 2 bananes, 250 g de fraises, jambon, fromage râpé"] },
    "Les mini-pizzas": { p: "8 à 10 mini-pizzas (4 personnes)", q: ["1 pâte à pizza prête à dérouler, ou pâte maison : 250 g de farine, 1/2 sachet de levure de boulanger (2,5 g), 15 cl d'eau tiède, 1 cuillère à soupe d'huile d'olive, 1 pincée de sel", "15 cl de sauce tomate", "150 g de mozzarella ou de fromage râpé", "Garnitures : 2 tranches de jambon, 100 g de champignons, quelques olives, 1 petite boîte de maïs"] },
    "Les biscuits à décorer": { p: "25 biscuits environ", q: ["250 g de farine", "125 g de beurre mou", "100 g de sucre", "1 œuf", "1 sachet de sucre vanillé", "Glaçage : 150 g de sucre glace + 2 cuillères à soupe d'eau ou de jus de citron", "Colorants alimentaires, vermicelles et perles en sucre"] },
    "Le défi salade colorée": { p: "4 personnes", q: ["250 g de tomates cerises (rouge)", "2 carottes (orange)", "1 petite boîte de maïs, 140 g (jaune)", "1/2 concombre (vert)", "1/4 de chou rouge ou 1 betterave cuite (violet)", "Vinaigrette : 3 cuillères à soupe d'huile, 1 cuillère à soupe de vinaigre, 1 pincée de sel"] },
    "Les sandwichs-bonhommes": { p: "4 sandwichs", q: ["4 tranches de pain de mie", "4 cuillères à soupe de fromage frais", "1/2 concombre", "4 tomates cerises", "4 olives noires", "1 carotte râpée", "1/2 poivron rouge", "Quelques brins de ciboulette"] },
    "Le gâteau au chocolat des champions": { p: "8 parts", q: ["200 g de chocolat noir pâtissier", "150 g de beurre", "150 g de sucre", "4 œufs", "50 g de farine", "1 pincée de sel", "Sucre glace pour décorer"] },
    "Les brochettes de fruits": { p: "8 brochettes", q: ["1 banane", "250 g de fraises", "2 kiwis", "1 petite grappe de raisin", "1/4 de melon ou d'ananas", "1 filet de jus de citron", "Facultatif : 100 g de chocolat à fondre"] },
    "La glace en sachet": { p: "1 à 2 portions", q: ["20 cl de lait (ou 10 cl de lait + 10 cl de crème liquide)", "1 cuillère à soupe de sucre", "1/2 cuillère à café d'extrait de vanille", "2 bols de glaçons", "6 cuillères à soupe de gros sel"] },
    "Le beurre maison": { p: "1 petit pot (environ 100 g de beurre)", q: ["25 cl de crème liquide entière bien froide (30 % de matières grasses minimum)", "1 pincée de sel (facultatif)"] },
    "Le pop-corn du ciné": { p: "1 grand saladier (4 personnes)", q: ["100 g de maïs à pop-corn", "2 cuillères à soupe d'huile neutre", "1 pincée de sel ou 2 cuillères à soupe de sucre"] },
    "Le petit déjeuner du dimanche": { p: "4 personnes", q: ["1 baguette ou 4 viennoiseries", "Beurre et confiture", "4 oranges à presser", "2 ou 3 fruits de saison", "4 yaourts", "50 cl de lait ou de chocolat chaud"] },
    "La pâte à tartiner maison": { p: "1 pot (environ 250 g)", q: ["100 g de noisettes", "100 g de chocolat au lait (ou moitié noir)", "10 cl de lait", "1 cuillère à soupe d'huile neutre", "1 cuillère à soupe de sucre (facultatif)"] },
    "Les frites de patate douce au four": { p: "4 personnes", q: ["2 grosses patates douces (environ 800 g)", "2 cuillères à soupe d'huile d'olive", "1 cuillère à soupe de fécule de maïs", "1 pincée de sel", "1 pincée de paprika doux"] },
    "Le smoothie arc-en-ciel": { p: "4 verres", q: ["150 g de fraises ou de framboises (rouge)", "1 mangue ou 2 pêches (orange-jaune)", "2 kiwis, ou 1 banane + 1 poignée d'épinards (vert)", "125 g de myrtilles (violet)", "4 yaourts nature", "10 cl de lait"] },
    "Le plateau de fromages et fruits": { p: "4 personnes", q: ["100 g d'un fromage doux (emmental, comté jeune)", "100 g d'un fromage crémeux (brie, coulommiers)", "100 g d'un fromage plus fort (chèvre, bleu)", "1 grappe de raisin", "1 pomme", "1 poignée de fruits secs (abricots, noix)", "Du pain"] },
    "Le goûter-surprise": { p: "4 personnes", q: ["1 gâteau (au yaourt par exemple) ou 12 biscuits", "3 ou 4 fruits coupés", "1 litre de jus ou de lait", "Facultatif : 4 petits pains au chocolat ou des crêpes"] },
    "La brioche à tresser": { p: "1 grande brioche (8 parts)", q: ["500 g de farine", "1 sachet de levure de boulanger sèche (5 g)", "15 cl de lait tiède", "2 œufs + 1 jaune pour dorer", "70 g de sucre", "100 g de beurre mou", "1 pincée de sel", "Facultatif : sucre perlé"] },
    "La sauce tomate de grand-mère": { p: "1 litre environ (2 pots)", q: ["1 kg de tomates bien mûres (ou 2 boîtes de tomates pelées de 400 g)", "1 oignon", "2 gousses d'ail", "3 cuillères à soupe d'huile d'olive", "1 cuillère à café de sucre", "Sel, poivre", "Quelques feuilles de basilic ou 1 cuillère à café d'herbes de Provence"] }
  };
  Object.keys(ING).forEach(k => { window.ACT_DETAIL[k] = Object.assign({}, window.ACT_DETAIL[k] || {}, ING[k]); });
})();
