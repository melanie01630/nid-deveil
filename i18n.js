/* Mams : traductions de l'interface faites à la main (le reste du contenu est traduit automatiquement).
   Ordre des colonnes : anglais, espagnol, portugais, russe, chinois, arabe. */
(function () {
'use strict';
let L; try { L = localStorage.getItem('mams-lang') || 'fr'; } catch (e) { L = 'fr'; }
const m0 = location.search.match(/[?&]lang=([^&]+)/); if (m0) L = decodeURIComponent(m0[1]);
const COL = { en: 0, es: 1, pt: 2, ru: 3, 'zh-CN': 4, ar: 5 }[L];
if (COL === undefined) return;
document.documentElement.lang = L;
const RTL = L === 'ar';
const css = document.createElement('style');
css.textContent = '.chip{-webkit-hyphens:auto;hyphens:auto}' + (RTL ? '.date,.h1,.h2,.tagline,.sub{text-align:left}' : '');
document.documentElement.appendChild(css);

const D = {
// ---- Accueil de Mams ----
'Ça roule ?': ['All good?', '¿Qué tal?', 'Tudo bem?', 'Как дела?', '还好吗？', 'كيف الحال؟'],
"Yo, c'est Mams !": ["Hey, it's Mams!", '¡Hola, soy Mams!', 'Olá, sou a Mams!', 'Привет, это Mams!', '嗨，我是 Mams！', 'أهلًا، أنا Mams!'],
"On fait quoi aujourd'hui ?": ['What shall we do today?', '¿Qué hacemos hoy?', 'O que fazemos hoje?', 'Чем займёмся сегодня?', '今天做点什么？', 'ماذا نفعل اليوم؟'],
'Idée du moment': ['Idea of the moment', 'Idea del momento', 'Ideia do momento', 'Идея момента', '此刻的点子', 'فكرة اللحظة'],
'Toucher pour voir': ['Tap to see', 'Toca para ver', 'Toca para ver', 'Нажми, чтобы посмотреть', '点击查看', 'المسي للمشاهدة'],
'Sans écran': ['Screen-free', 'Sin pantallas', 'Sem ecrãs', 'Без экранов', '无屏幕', 'بدون شاشات'],
'Une histoire à écouter ?': ['A story to listen to?', '¿Un cuento para escuchar?', 'Uma história para ouvir?', 'Послушаем сказку?', '听个故事吗？', 'قصة للاستماع؟'],
'Lumière tamisée, oreilles grandes ouvertes.': ['Soft lights, ears wide open.', 'Luz tenue y oídos bien abiertos.', 'Luz suave, ouvidos bem abertos.', 'Приглушённый свет, ушки на макушке.', '灯光调暗，竖起耳朵。', 'ضوء خافت وآذان صاغية.'],
'Ciné ce soir ?': ['Movie night?', '¿Peli esta noche?', 'Filme esta noite?', 'Кино сегодня вечером?', '今晚看电影吗？', 'فيلم الليلة؟'],
'Un film pour toute la famille.': ['A film for the whole family.', 'Una peli para toda la familia.', 'Um filme para toda a família.', 'Фильм для всей семьи.', '一部全家一起看的电影。', 'فيلم لكل العائلة.'],
'Une autre ?': ['Another one?', '¿Otra?', 'Mais uma?', 'Ещё одну?', '再来一个？', 'واحدة أخرى؟'],
'On cuisine un truc ?': ['Shall we cook something?', '¿Cocinamos algo?', 'Cozinhamos alguma coisa?', 'Приготовим что-нибудь?', '一起做点吃的？', 'نطبخ شيئًا؟'],
'Simple, rapide, ensemble.': ['Simple, quick, together.', 'Fácil, rápido y juntos.', 'Simples, rápido, juntos.', 'Просто, быстро, вместе.', '简单、快速、一起做。', 'بسيط وسريع ومعًا.'],
'Encore une': ['One more', 'Una más', 'Mais uma', 'Ещё одна', '再来一个', 'واحدة أخرى'],
"C'est parti": ["Let's go", '¡Vamos!', 'Vamos lá', 'Поехали', '开始吧', 'هيا بنا'],
'Passer': ['Skip', 'Saltar', 'Saltar', 'Пропустить', '跳过', 'تخطي'],
'Bienvenue': ['Welcome', 'Bienvenida', 'Bem-vinda', 'Добро пожаловать', '欢迎', 'مرحبًا'],
'Choisir la langue': ['Choose language', 'Elegir idioma', 'Escolher idioma', 'Выбрать язык', '选择语言', 'اختيار اللغة'],
'La bouche de Mams': ["Mams's mouth", 'La boca de Mams', 'A boca da Mams', 'Губы Mams', 'Mams 的嘴巴', 'فم Mams'],
'Message précédent': ['Previous message', 'Mensaje anterior', 'Mensagem anterior', 'Предыдущее сообщение', '上一条', 'الرسالة السابقة'],
'Message suivant': ['Next message', 'Mensaje siguiente', 'Mensagem seguinte', 'Следующее сообщение', '下一条', 'الرسالة التالية'],
'Navigation principale': ['Main navigation', 'Navegación principal', 'Navegação principal', 'Главное меню', '主导航', 'التنقل الرئيسي'],
'Langue': ['Language', 'Idioma', 'Idioma', 'Язык', '语言', 'اللغة'],
'Choose your language': ['Choose your language', 'Elige tu idioma', 'Escolhe o teu idioma', 'Выбери язык', '选择你的语言', 'اختاري لغتك'],
'Mams est écrite en français. Les autres langues sont traduites automatiquement : la traduction peut contenir quelques erreurs.': ['Mams is written in French. Menus and buttons are translated by hand; longer texts are translated automatically and may contain a few mistakes.', 'Mams está escrita en francés. Los menús y botones están traducidos a mano; los textos largos se traducen automáticamente y pueden tener algún error.', 'A Mams foi escrita em francês. Os menus e botões foram traduzidos à mão; os textos longos são traduzidos automaticamente e podem ter alguns erros.', 'Mams написана на французском. Меню и кнопки переведены вручную, длинные тексты переводятся автоматически и могут содержать ошибки.', 'Mams 原本是法语写的。菜单和按钮为人工翻译，较长的文字为自动翻译，可能会有一些错误。', 'كُتب تطبيق Mams بالفرنسية. القوائم والأزرار مترجمة يدويًا، أما النصوص الطويلة فتُترجم آليًا وقد تحتوي على بعض الأخطاء.'],

// ---- Onglets ----
"Aujourd'hui": ['Today', 'Hoy', 'Hoje', 'Сегодня', '今天', 'اليوم'],
'Ciné': ['Movies', 'Cine', 'Cinema', 'Кино', '电影', 'سينما'],
'Idées': ['Ideas', 'Ideas', 'Ideias', 'Идеи', '点子', 'أفكار'],
'Sorties': ['Outings', 'Salidas', 'Passeios', 'Прогулки', '出行', 'نزهات'],
'Plus': ['More', 'Más', 'Mais', 'Ещё', '更多', 'المزيد'],
'Planning': ['Planner', 'Agenda', 'Agenda', 'План', '计划', 'الجدول'],
'Famille': ['Family', 'Familia', 'Família', 'Семья', '家庭', 'العائلة'],

// ---- Page Aujourd'hui ----
'Activités par âge, cuisine, soirées ciné et planning pour les parents à la maison.': ['Activities by age, cooking, movie nights and planning for parents at home.', 'Actividades por edad, cocina, noches de cine y agenda para padres en casa.', 'Atividades por idade, cozinha, noites de cinema e agenda para pais em casa.', 'Занятия по возрасту, кулинария, семейное кино и планы для родителей дома.', '按年龄分类的亲子活动、厨房、电影之夜和计划，专为在家的父母设计。', 'أنشطة حسب العمر، وطبخ، وسهرات أفلام، وجدول للأهل في البيت.'],
'Rejoindre la communauté des mams': ['Join the Mams community', 'Únete a la comunidad Mams', 'Junta-te à comunidade Mams', 'Вступить в сообщество Mams', '加入 Mams 社区', 'انضمي إلى مجتمع Mams'],
"Installer l'application": ['Install the app', 'Instalar la app', 'Instalar a app', 'Установить приложение', '安装应用', 'تثبيت التطبيق'],
"Ajoute Mams à ton écran d'accueil.": ['Add Mams to your home screen.', 'Añade Mams a tu pantalla de inicio.', 'Adiciona a Mams ao teu ecrã inicial.', 'Добавь Mams на главный экран.', '把 Mams 添加到主屏幕。', 'أضيفي Mams إلى شاشتك الرئيسية.'],
'Installer': ['Install', 'Instalar', 'Instalar', 'Установить', '安装', 'تثبيت'],
"Que faire aujourd'hui ?": ['What to do today?', '¿Qué hacemos hoy?', 'O que fazer hoje?', 'Чем заняться сегодня?', '今天做什么？', 'ماذا نفعل اليوم؟'],
'Cherche une idée, une recette, un jeu, une maladie…': ['Search for an idea, a recipe, a game, an illness…', 'Busca una idea, una receta, un juego, una enfermedad…', 'Procura uma ideia, uma receita, um jogo, uma doença…', 'Ищи идею, рецепт, игру, болезнь…', '搜索点子、食谱、游戏、疾病…', 'ابحثي عن فكرة، وصفة، لعبة، مرض…'],
'À quoi sert Mams ?': ['What is Mams for?', '¿Para qué sirve Mams?', 'Para que serve a Mams?', 'Зачем нужна Mams?', 'Mams 能做什么？', 'ما فائدة Mams؟'],
'Des idées de 0 à 14 ans, avec matériel et étapes.': ['Ideas from 0 to 14 years, with materials and steps.', 'Ideas de 0 a 14 años, con materiales y pasos.', 'Ideias dos 0 aos 14 anos, com material e passos.', 'Идеи для детей от 0 до 14 лет, с материалами и шагами.', '0 到 14 岁的点子，附材料和步骤。', 'أفكار من 0 إلى 14 سنة، مع الأدوات والخطوات.'],
'Cuisine': ['Cooking', 'Cocina', 'Cozinha', 'Кухня', '厨房', 'المطبخ'],
'Des recettes simples à faire ensemble.': ['Simple recipes to make together.', 'Recetas fáciles para hacer juntos.', 'Receitas simples para fazer juntos.', 'Простые рецепты, чтобы готовить вместе.', '一起动手的简单食谱。', 'وصفات بسيطة لنحضّرها معًا.'],
'Soirées ciné': ['Movie nights', 'Noches de cine', 'Noites de cinema', 'Семейное кино', '电影之夜', 'سهرات الأفلام'],
"Des films adaptés à l'âge, sur vos plateformes.": ['Age-appropriate films on your platforms.', 'Pelis adaptadas a la edad, en tus plataformas.', 'Filmes adequados à idade, nas tuas plataformas.', 'Фильмы по возрасту на ваших платформах.', '在你的平台上找适龄电影。', 'أفلام مناسبة للعمر على منصاتك.'],
'Organisez la semaine en quelques touches.': ['Plan the week in a few taps.', 'Organiza la semana en pocos toques.', 'Organiza a semana em poucos toques.', 'Спланируйте неделю в пару касаний.', '轻点几下安排好一周。', 'نظّمي الأسبوع بلمسات قليلة.'],
'✨ Nouveau cette semaine': ['✨ New this week', '✨ Novedades de la semana', '✨ Novidades da semana', '✨ Новое на этой неделе', '✨ 本周新内容', '✨ جديد هذا الأسبوع'],
'Nouveau cette semaine': ['New this week', 'Novedades de la semana', 'Novidades da semana', 'Новое на этой неделе', '本周新内容', 'جديد هذا الأسبوع'],
'Info': ['Info', 'Info', 'Info', 'Инфо', '资讯', 'معلومة'],
'Activité': ['Activity', 'Actividad', 'Atividade', 'Занятие', '活动', 'نشاط'],
'Recette': ['Recipe', 'Receta', 'Receita', 'Рецепт', '食谱', 'وصفة'],
'Pour qui': ['For whom', 'Para quién', 'Para quem', 'Для кого', '适合谁', 'لمن'],
'Toute la famille': ['The whole family', 'Toda la familia', 'Toda a família', 'Вся семья', '全家', 'كل العائلة'],
'Temps disponible': ['Time available', 'Tiempo disponible', 'Tempo disponível', 'Сколько времени', '可用时间', 'الوقت المتاح'],
'Peu importe': ['Any', 'Da igual', 'Tanto faz', 'Неважно', '不限', 'لا يهم'],
'15 min ou moins': ['15 min or less', '15 min o menos', '15 min ou menos', '15 мин и меньше', '15 分钟以内', '15 دقيقة أو أقل'],
'30 min ou moins': ['30 min or less', '30 min o menos', '30 min ou menos', '30 мин и меньше', '30 分钟以内', '30 دقيقة أو أقل'],
'45 min et plus': ['45 min or more', '45 min o más', '45 min ou mais', '45 мин и больше', '45 分钟以上', '45 دقيقة أو أكثر'],
'Où': ['Where', 'Dónde', 'Onde', 'Где', '地点', 'أين'],
'À la maison': ['At home', 'En casa', 'Em casa', 'Дома', '在家', 'في البيت'],
'Dehors': ['Outdoors', 'Al aire libre', 'Ao ar livre', 'На улице', '户外', 'في الخارج'],
'Idée du jour': ['Idea of the day', 'Idea del día', 'Ideia do dia', 'Идея дня', '今日点子', 'فكرة اليوم'],
'Très facile': ['Very easy', 'Muy fácil', 'Muito fácil', 'Очень легко', '非常简单', 'سهل جدًا'],
'Facile': ['Easy', 'Fácil', 'Fácil', 'Легко', '简单', 'سهل'],
'Moyen': ['Medium', 'Media', 'Médio', 'Средне', '中等', 'متوسط'],
'Plus long': ['Longer', 'Más largo', 'Mais demorado', 'Подольше', '较长', 'أطول'],
"Voir l'activité": ['See the activity', 'Ver la actividad', 'Ver a atividade', 'Открыть занятие', '查看活动', 'عرض النشاط'],
'Une autre idée': ['Another idea', 'Otra idea', 'Outra ideia', 'Другая идея', '换一个点子', 'فكرة أخرى'],
'Autres idées': ['More ideas', 'Más ideas', 'Mais ideias', 'Другие идеи', '更多点子', 'أفكار أخرى'],
'Pour rire': ['For a laugh', 'Para reír', 'Para rir', 'Посмеяться', '乐一乐', 'للضحك'],
'Tout voir': ['See all', 'Ver todo', 'Ver tudo', 'Смотреть всё', '查看全部', 'عرض الكل'],
'Blague du jour': ['Joke of the day', 'Chiste del día', 'Piada do dia', 'Шутка дня', '每日笑话', 'نكتة اليوم'],
'Voir la réponse': ['See the answer', 'Ver la respuesta', 'Ver a resposta', 'Показать ответ', '查看答案', 'عرض الإجابة'],
'Devinette du jour': ['Riddle of the day', 'Adivinanza del día', 'Adivinha do dia', 'Загадка дня', '每日谜语', 'لغز اليوم'],
'Raccourcis': ['Shortcuts', 'Atajos', 'Atalhos', 'Быстрый доступ', '快捷入口', 'اختصارات'],
'Histoires audio': ['Audio stories', 'Cuentos en audio', 'Histórias em áudio', 'Аудио\u00ADсказки', '有声故事', 'قصص صوتية'],
'À écouter, sans écran': ['To listen to, screen-free', 'Para escuchar, sin pantallas', 'Para ouvir, sem ecrãs', 'Слушать без экрана', '用耳朵听，不看屏幕', 'للاستماع بدون شاشة'],
'Actu des mams': ['Mams news', 'Noticias Mams', 'Novidades Mams', 'Новости Mams', 'Mams 资讯', 'أخبار Mams'],
'Nouveautés, vidéos et bons plans': ["What's new, videos and deals", 'Novedades, vídeos y chollos', 'Novidades, vídeos e promoções', 'Новинки, видео и выгодные предложения', '新鲜事、视频和优惠', 'جديد وفيديوهات وعروض'],
'Jeux et blagues': ['Games and jokes', 'Juegos y chistes', 'Jogos e piadas', 'Игры и шутки', '游戏和笑话', 'ألعاب ونكت'],
'Quiz, énigmes, devinettes': ['Quizzes, puzzles, riddles', 'Preguntas, enigmas, adivinanzas', 'Quizzes, enigmas, adivinhas', 'Викторины, головоломки, загадки', '问答、谜题、谜语', 'مسابقات وألغاز وأحاجٍ'],
'Recettes': ['Recipes', 'Recetas', 'Receitas', 'Рецепты', '食谱', 'وصفات'],
'Rapides, gâteaux, mijotés': ['Quick meals, cakes, stews', 'Rápidas, pasteles, guisos', 'Rápidas, bolos, estufados', 'Быстрые блюда, выпечка, тушёное', '快手菜、蛋糕、炖菜', 'سريعة، كعك، طبخات'],
'Communauté des mams': ['Mams community', 'Comunidad Mams', 'Comunidade Mams', 'Сообщество Mams', 'Mams 社区', 'مجتمع Mams'],
'Ton profil, sorties entre mamans': ['Your profile, outings with other moms', 'Tu perfil, salidas entre mamás', 'O teu perfil, passeios entre mães', 'Твой профиль, прогулки с мамами', '你的资料、妈妈们的聚会', 'ملفك ونزهات بين الأمهات'],
'Soirée ciné': ['Movie night', 'Noche de cine', 'Noite de cinema', 'Кино вечером', '电影之夜', 'سهرة فيلم'],
"Films selon l'âge": ['Films by age', 'Pelis según la edad', 'Filmes por idade', 'Фильмы по возрасту', '按年龄选电影', 'أفلام حسب العمر'],
'À faire ensemble': ['To do together', 'Para hacer juntos', 'Para fazer juntos', 'Сделать вместе', '一起做', 'لنفعلها معًا'],
'En 5 minutes': ['In 5 minutes', 'En 5 minutos', 'Em 5 minutos', 'За 5 минут', '5 分钟搞定', 'في 5 دقائق'],
'Idées express': ['Quick ideas', 'Ideas exprés', 'Ideias rápidas', 'Быстрые идеи', '快速点子', 'أفكار سريعة'],
'Quand il pleut': ['When it rains', 'Cuando llueve', 'Quando chove', 'Когда идёт дождь', '下雨天', 'عندما تمطر'],
'Idées à la maison': ['Ideas at home', 'Ideas en casa', 'Ideias em casa', 'Идеи для дома', '居家点子', 'أفكار في البيت'],
'Politique de confidentialité': ['Privacy policy', 'Política de privacidad', 'Política de privacidade', 'Политика конфиденциальности', '隐私政策', 'سياسة الخصوصية'],

// ---- Idées ----
"Idées d'activités": ['Activity ideas', 'Ideas de actividades', 'Ideias de atividades', 'Идеи занятий', '活动点子', 'أفكار أنشطة'],
'Tous les âges': ['All ages', 'Todas las edades', 'Todas as idades', 'Любой возраст', '所有年龄', 'كل الأعمار'],
'Toutes les catégories': ['All categories', 'Todas las categorías', 'Todas as categorias', 'Все категории', '所有类别', 'كل الفئات'],
'Dessin': ['Drawing', 'Dibujo', 'Desenho', 'Рисование', '画画', 'رسم'],
'Peinture': ['Painting', 'Pintura', 'Pintura', 'Живопись', '绘画', 'تلوين'],
'Construction': ['Building', 'Construc\u00ADción', 'Construção', 'Конструи\u00ADрование', '搭建', 'بناء'],
'Bricolage': ['Crafts', 'Manuali\u00ADdades', 'Trabalhos manuais', 'Поделки', '手工', 'أشغال يدوية'],
'Nature': ['Nature', 'Naturaleza', 'Natureza', 'Природа', '自然', 'الطبيعة'],
'Sciences': ['Science', 'Ciencias', 'Ciências', 'Наука', '科学', 'علوم'],
'Jeux': ['Games', 'Juegos', 'Jogos', 'Игры', '游戏', 'ألعاب'],
'Bouger': ['Move', 'Moverse', 'Mexer', 'Движение', '运动', 'حركة'],
'Tout-petits': ['Toddlers', 'Peques', 'Pequeninos', 'Малыши', '幼儿', 'الصغار جدًا'],
'Calme': ['Calm', 'Calma', 'Calma', 'Спокойно', '安静', 'هدوء'],
'Musique': ['Music', 'Música', 'Música', 'Музыка', '音乐', 'موسيقى'],
'Lire et compter': ['Reading and counting', 'Leer y contar', 'Ler e contar', 'Чтение и счёт', '阅读和数数', 'القراءة والعد'],
'En famille': ['As a family', 'En familia', 'Em família', 'Всей семьёй', '全家一起', 'مع العائلة'],
'Grands': ['Older kids', 'Mayores', 'Mais crescidos', 'Старшие', '大孩子', 'الكبار'],
'Fêtes': ['Celebrations', 'Fiestas', 'Festas', 'Праздники', '节日', 'أعياد'],
'3 minutes': ['3 minutes', '3 minutos', '3 minutos', '3 минуты', '3 分钟', '3 دقائق'],
'Créations': ['Creations', 'Creaciones', 'Criações', 'Творчество', '创作', 'إبداعات'],
'Le soir': ['Evening', 'Por la noche', 'À noite', 'Вечером', '晚上', 'في المساء'],
'Au calme': ['Quiet time', 'Con calma', 'Com calma', 'В тишине', '安静时光', 'بهدوء'],
'Créatif': ['Creative', 'Creativo', 'Criativo', 'Творческое', '创意', 'إبداعي'],
"Voir plus d'idées": ['See more ideas', 'Ver más ideas', 'Ver mais ideias', 'Больше идей', '查看更多点子', 'عرض المزيد من الأفكار'],
'Chercher : origami, gâteau, pluie…': ['Search: origami, cake, rain…', 'Buscar: origami, pastel, lluvia…', 'Procurar: origami, bolo, chuva…', 'Поиск: оригами, торт, дождь…', '搜索：折纸、蛋糕、下雨…', 'ابحثي: أوريغامي، كعكة، مطر…'],
'Rechercher une activité': ['Search for an activity', 'Buscar una actividad', 'Procurar uma atividade', 'Найти занятие', '搜索活动', 'البحث عن نشاط'],

// ---- Fiche activité ----
"Pourquoi c'est super": ["Why it's great", 'Por qué mola', 'Porque é ótimo', 'Чем это хорошо', '为什么很棒', 'لماذا هو رائع'],
"L'astuce de Mams": ["Mams's tip", 'El truco de Mams', 'A dica da Mams', 'Совет от Mams', 'Mams 的小窍门', 'نصيحة Mams'],
'Matériel': ['Materials', 'Materiales', 'Material', 'Что понадобится', '材料', 'الأدوات'],
'Aucun': ['None', 'Ninguno', 'Nenhum', 'Ничего', '无', 'لا شيء'],
'Avant de commencer': ['Before you start', 'Antes de empezar', 'Antes de começar', 'Перед началом', '开始之前', 'قبل البدء'],
'Étapes (touche pour cocher)': ['Steps (tap to tick)', 'Pasos (toca para marcar)', 'Passos (toca para marcar)', 'Шаги (нажми, чтобы отметить)', '步骤（点击打勾）', 'الخطوات (المسي للتأشير)'],
'Étapes': ['Steps', 'Pasos', 'Passos', 'Шаги', '步骤', 'الخطوات'],
'Pour varier': ['To vary it', 'Para variar', 'Para variar', 'Варианты', '换个玩法', 'للتنويع'],
'Voir comment faire': ['See how to do it', 'Ver cómo se hace', 'Ver como fazer', 'Посмотреть, как сделать', '看看怎么做', 'شاهدي الطريقة'],
'Vidéo explicative': ['How-to video', 'Vídeo explicativo', 'Vídeo explicativo', 'Видео с объяснением', '教学视频', 'فيديو توضيحي'],
"Images d'exemple": ['Example pictures', 'Imágenes de ejemplo', 'Imagens de exemplo', 'Примеры картинок', '示例图片', 'صور توضيحية'],
'Le bouton lance une recherche précise sur YouTube pour cette activité. Regarde la vidéo avant de la montrer à ton enfant.': ['This button searches YouTube for this activity. Watch the video before showing it to your child.', 'El botón busca esta actividad en YouTube. Mira el vídeo antes de enseñárselo a tu hijo.', 'O botão procura esta atividade no YouTube. Vê o vídeo antes de o mostrares ao teu filho.', 'Кнопка ищет это занятие на YouTube. Посмотри видео, прежде чем показывать ребёнку.', '按钮会在 YouTube 上搜索这个活动。给孩子看之前，请先自己看一遍。', 'يبحث الزر عن هذا النشاط في YouTube. شاهدي الفيديو قبل أن تعرضيه على طفلك.'],
'Marquer comme fait': ['Mark as done', 'Marcar como hecho', 'Marcar como feito', 'Отметить как сделано', '标记为已完成', 'تحديد كمنجز'],
'Ajouter au planning': ['Add to planner', 'Añadir a la agenda', 'Adicionar à agenda', 'Добавить в план', '加入计划', 'إضافة إلى الجدول'],
'Ton avis (facultatif)': ['Your review (optional)', 'Tu opinión (opcional)', 'A tua opinião (opcional)', 'Твой отзыв (по желанию)', '你的评价（可选）', 'رأيك (اختياري)'],
'Enregistrer mon avis': ['Save my review', 'Guardar mi opinión', 'Guardar a minha opinião', 'Сохранить отзыв', '保存评价', 'حفظ رأيي'],
'Partager': ['Share', 'Compartir', 'Partilhar', 'Поделиться', '分享', 'مشاركة'],
'Un petit mot pour les autres mams ?': ['A few words for the other moms?', '¿Unas palabras para las otras mamás?', 'Umas palavras para as outras mães?', 'Пару слов для других мам?', '给其他妈妈留句话？', 'كلمة للأمهات الأخريات؟'],

// ---- Ciné ----
'Soirée cinéma': ['Movie night', 'Noche de cine', 'Noite de cinema', 'Кино вечером', '电影之夜', 'سهرة سينما'],
"Choisis tes plateformes : on te montre les titres qui conviennent à l'âge.": ['Choose your platforms: we show you the titles that suit the age.', 'Elige tus plataformas: te mostramos los títulos adecuados a la edad.', 'Escolhe as tuas plataformas: mostramos os títulos adequados à idade.', 'Выбери свои платформы — покажем фильмы по возрасту.', '选择你的平台：我们会显示适合年龄的片子。', 'اختاري منصاتك: سنعرض لك العناوين المناسبة للعمر.'],
'Mes plateformes': ['My platforms', 'Mis plataformas', 'As minhas plataformas', 'Мои платформы', '我的平台', 'منصاتي'],
'13 ans et +': ['13 and up', '13 años o más', '13 anos ou mais', '13 лет и старше', '13 岁及以上', '13 سنة فما فوق'],
'Nouveautés': ["What's new", 'Novedades', 'Novidades', 'Новинки', '新片', 'الجديد'],
'Sur mes plateformes': ['On my platforms', 'En mis plataformas', 'Nas minhas plataformas', 'На моих платформах', '我的平台上', 'على منصاتي'],
'Au cinéma': ['In cinemas', 'En el cine', 'No cinema', 'В кинотеатрах', '影院上映', 'في السينما'],
'Classiques à chercher': ['Classics to look for', 'Clásicos para buscar', 'Clássicos para procurar', 'Классика, которую стоит найти', '值得找来看的经典', 'كلاسيكيات للبحث عنها'],
'Entre adultes': ['For grown-ups', 'Para adultos', 'Para adultos', 'Для взрослых', '成人专区', 'للكبار'],
'Nouveautés relevées le': ['New releases checked on', 'Novedades revisadas el', 'Novidades verificadas a', 'Новинки проверены', '新片更新于', 'تم رصد الجديد في'],
". Les dates et les catalogues peuvent changer : vérifie au cinéma ou sur ta plateforme. Les affiches s'ouvrent dans une recherche d'images.": ['. Dates and catalogues can change: check with the cinema or your platform. Posters open in an image search.', '. Las fechas y los catálogos pueden cambiar: compruébalo en el cine o en tu plataforma. Los carteles se abren en una búsqueda de imágenes.', '. As datas e os catálogos podem mudar: confirma no cinema ou na tua plataforma. Os cartazes abrem numa pesquisa de imagens.', '. Даты и каталоги могут меняться — уточняй в кинотеатре или на платформе. Постеры открываются в поиске картинок.', '。日期和片库可能会变化，请向影院或平台确认。海报会在图片搜索中打开。', '. قد تتغير التواريخ والكتالوجات: تحققي من السينما أو منصتك. تُفتح الملصقات في بحث عن الصور.'],
'Tout': ['All', 'Todo', 'Tudo', 'Всё', '全部', 'الكل'],
'Films': ['Films', 'Películas', 'Filmes', 'Фильмы', '电影', 'أفلام'],
'Séries': ['Series', 'Series', 'Séries', 'Сериалы', '剧集', 'مسلسلات'],
'Cinéma': ['Cinema', 'Cine', 'Cinema', 'Кинотеатр', '影院', 'سينما'],
'🎬 Séances près de moi': ['🎬 Showtimes near me', '🎬 Sesiones cerca de mí', '🎬 Sessões perto de mim', '🎬 Сеансы рядом', '🎬 附近场次', '🎬 عروض قريبة مني'],
'Bande-annonce': ['Trailer', 'Tráiler', 'Trailer', 'Трейлер', '预告片', 'إعلان الفيلم'],
"Voir l'affiche": ['See the poster', 'Ver el cartel', 'Ver o cartaz', 'Посмотреть постер', '查看海报', 'عرض الملصق'],
"Ados, vérifie l'âge": ['Teens, check the age rating', 'Adolescentes, comprueba la edad', 'Adolescentes, verifica a idade', 'Подросткам — проверь возраст', '青少年，请确认年龄分级', 'للمراهقين، تحققي من العمر'],
"Film d'animation Disney": ['Disney animated film', 'Película de animación de Disney', 'Filme de animação da Disney', 'Мультфильм Disney', '迪士尼动画电影', 'فيلم رسوم متحركة من ديزني'],
'Film': ['Film', 'Película', 'Filme', 'Фильм', '电影', 'فيلم'],
'Série': ['Series', 'Serie', 'Série', 'Сериал', '剧集', 'مسلسل'],
'Sources': ['Sources', 'Fuentes', 'Fontes', 'Источники', '来源', 'المصادر'],
"Les titres pour adultes s'affichent dans « Entre adultes ».": ['Titles for adults are shown in “For grown-ups”.', 'Los títulos para adultos aparecen en «Para adultos».', 'Os títulos para adultos aparecem em «Para adultos».', 'Фильмы для взрослых — в разделе «Для взрослых».', '成人片会显示在“成人专区”。', 'تظهر عناوين الكبار في «للكبار».'],

// ---- Sorties ----
"Trouve un lieu près de toi, ou découvre de grandes destinations d'Europe.": ['Find a place near you, or discover great destinations in Europe.', 'Encuentra un lugar cerca de ti o descubre grandes destinos de Europa.', 'Encontra um sítio perto de ti ou descobre grandes destinos da Europa.', 'Найди место рядом или открой для себя лучшие места Европы.', '找找附近的好去处，或发现欧洲的热门目的地。', 'ابحثي عن مكان قريب منك أو اكتشفي وجهات أوروبية رائعة.'],
'Où es-tu ?': ['Where are you?', '¿Dónde estás?', 'Onde estás?', 'Где ты?', '你在哪里？', 'أين أنتِ؟'],
"Écris ta ville ou ton code postal, ou touche « Me localiser ». Ensuite, choisis ce que tu cherches : la liste des lieux s'affiche ici, du plus proche au plus loin.": ['Type your town or postcode, or tap “Locate me”. Then choose what you are looking for: places are listed here, nearest first.', 'Escribe tu ciudad o código postal, o toca «Localizarme». Luego elige qué buscas: la lista de lugares aparece aquí, del más cercano al más lejano.', 'Escreve a tua cidade ou código postal, ou toca em «Localizar-me». Depois escolhe o que procuras: a lista de locais aparece aqui, do mais perto ao mais longe.', 'Напиши город или индекс либо нажми «Найти меня». Затем выбери, что ищешь: места появятся здесь, от ближних к дальним.', '输入你的城市或邮编，或点击“定位我”。然后选择你要找的内容：地点会在这里按由近到远列出。', 'اكتبي مدينتك أو رمزك البريدي، أو المسي «حدّدي موقعي». ثم اختاري ما تبحثين عنه: ستظهر الأماكن هنا من الأقرب إلى الأبعد.'],
'📍 Me localiser': ['📍 Locate me', '📍 Localizarme', '📍 Localizar-me', '📍 Найти меня', '📍 定位我', '📍 حدّدي موقعي'],
"Aucune ville choisie pour l'instant.": ['No town chosen yet.', 'Todavía no has elegido ciudad.', 'Ainda não escolheste uma cidade.', 'Город пока не выбран.', '还没有选择城市。', 'لم تختاري مدينة بعد.'],
'Sorties près de toi': ['Outings near you', 'Salidas cerca de ti', 'Passeios perto de ti', 'Куда пойти рядом', '你附近的去处', 'نزهات قريبة منك'],
'🏊 Piscines': ['🏊 Swimming pools', '🏊 Piscinas', '🏊 Piscinas', '🏊 Бассейны', '🏊 游泳池', '🏊 مسابح'],
'🛝 Parcs et aires de jeux': ['🛝 Parks and playgrounds', '🛝 Parques y zonas de juego', '🛝 Parques e parques infantis', '🛝 Парки и детские площадки', '🛝 公园和游乐场', '🛝 حدائق وملاعب'],
"🎈 Jeux d'intérieur (kid parks)": ['🎈 Indoor play centres', '🎈 Parques infantiles cubiertos', '🎈 Parques infantis cobertos', '🎈 Детские игровые центры', '🎈 室内游乐场', '🎈 ألعاب داخلية للأطفال'],
"🎢 Parcs d'attractions": ['🎢 Theme parks', '🎢 Parques de atracciones', '🎢 Parques de diversões', '🎢 Парки развлечений', '🎢 主题乐园', '🎢 مدن ملاهٍ'],
'🦁 Zoos et fermes': ['🦁 Zoos and farms', '🦁 Zoos y granjas', '🦁 Jardins zoológicos e quintas', '🦁 Зоопарки и фермы', '🦁 动物园和农场', '🦁 حدائق حيوان ومزارع'],
'🖼️ Musées': ['🖼️ Museums', '🖼️ Museos', '🖼️ Museus', '🖼️ Музеи', '🖼️ 博物馆', '🖼️ متاحف'],
'📚 Médiathèques': ['📚 Libraries', '📚 Bibliotecas', '📚 Bibliotecas', '📚 Библиотеки', '📚 图书馆', '📚 مكتبات'],
'🎬 Cinémas': ['🎬 Cinemas', '🎬 Cines', '🎬 Cinemas', '🎬 Кинотеатры', '🎬 电影院', '🎬 دور سينما'],
'⛸️ Patinoires': ['⛸️ Ice rinks', '⛸️ Pistas de patinaje', '⛸️ Pistas de gelo', '⛸️ Катки', '⛸️ 溜冰场', '⛸️ حلبات تزلج'],
'🎳 Bowling et loisirs': ['🎳 Bowling and leisure', '🎳 Bolera y ocio', '🎳 Bowling e lazer', '🎳 Боулинг и досуг', '🎳 保龄球和休闲', '🎳 بولينغ وترفيه'],
'Clubs et activités': ['Clubs and activities', 'Clubes y actividades', 'Clubes e atividades', 'Кружки и секции', '俱乐部和兴趣班', 'نوادٍ وأنشطة'],
'🥋 Judo': ['🥋 Judo', '🥋 Judo', '🥋 Judo', '🥋 Дзюдо', '🥋 柔道', '🥋 جودو'],
'⚽ Foot': ['⚽ Football', '⚽ Fútbol', '⚽ Futebol', '⚽ Футбол', '⚽ 足球', '⚽ كرة القدم'],
'🏀 Basket': ['🏀 Basketball', '🏀 Baloncesto', '🏀 Basquetebol', '🏀 Баскетбол', '🏀 篮球', '🏀 كرة السلة'],
'🏊 Natation': ['🏊 Swimming', '🏊 Natación', '🏊 Natação', '🏊 Плавание', '🏊 游泳', '🏊 سباحة'],
'💃 Danse': ['💃 Dance', '💃 Danza', '💃 Dança', '💃 Танцы', '💃 舞蹈', '💃 رقص'],
'🤸 Gym': ['🤸 Gymnastics', '🤸 Gimnasia', '🤸 Ginástica', '🤸 Гимнастика', '🤸 体操', '🤸 جمباز'],
'🎾 Tennis': ['🎾 Tennis', '🎾 Tenis', '🎾 Ténis', '🎾 Теннис', '🎾 网球', '🎾 تنس'],
'🐴 Équitation': ['🐴 Horse riding', '🐴 Equitación', '🐴 Equitação', '🐴 Верховая езда', '🐴 骑马', '🐴 ركوب الخيل'],
'🥊 Arts martiaux': ['🥊 Martial arts', '🥊 Artes marciales', '🥊 Artes marciais', '🥊 Боевые искусства', '🥊 武术', '🥊 فنون قتالية'],
'🎵 Musique': ['🎵 Music', '🎵 Música', '🎵 Música', '🎵 Музыка', '🎵 音乐', '🎵 موسيقى'],
'🎭 Théâtre': ['🎭 Theatre', '🎭 Teatro', '🎭 Teatro', '🎭 Театр', '🎭 戏剧', '🎭 مسرح'],
'🎨 Dessin et arts': ['🎨 Drawing and art', '🎨 Dibujo y arte', '🎨 Desenho e artes', '🎨 Рисование и искусство', '🎨 绘画和艺术', '🎨 رسم وفنون'],
'🏡 Centres de loisirs': ['🏡 Holiday clubs', '🏡 Centros de ocio', '🏡 Centros de ATL', '🏡 Детские досуговые центры', '🏡 托管中心', '🏡 مراكز ترفيه'],
'👶 Éveil bébé': ['👶 Baby classes', '👶 Estimulación bebé', '👶 Atividades para bebés', '👶 Развитие малышей', '👶 婴儿早教', '👶 أنشطة للرضع'],
'Idées et agenda': ['Ideas and events', 'Ideas y agenda', 'Ideias e agenda', 'Идеи и афиша', '点子和活动日程', 'أفكار ومواعيد'],
'Que faire ce week-end': ['What to do this weekend', 'Qué hacer este fin de semana', 'O que fazer este fim de semana', 'Чем заняться в выходные', '这个周末做什么', 'ماذا نفعل هذا الأسبوع'],
'Agenda de la ville': ['Town events', 'Agenda de la ciudad', 'Agenda da cidade', 'Афиша города', '城市活动', 'فعاليات المدينة'],
'Spectacles enfants': ["Children's shows", 'Espectáculos infantiles', 'Espetáculos infantis', 'Детские спектакли', '儿童演出', 'عروض للأطفال'],
'Marchés de Noël': ['Christmas markets', 'Mercadillos navideños', 'Mercados de Natal', 'Рождественские ярмарки', '圣诞市集', 'أسواق عيد الميلاد'],
'Ateliers parents-enfants': ['Parent-child workshops', 'Talleres para padres e hijos', 'Oficinas pais e filhos', 'Мастер-классы для родителей с детьми', '亲子工作坊', 'ورش للأهل والأطفال'],
"Grandes destinations d'Europe": ['Great destinations in Europe', 'Grandes destinos de Europa', 'Grandes destinos da Europa', 'Лучшие места Европы', '欧洲热门目的地', 'وجهات أوروبية كبرى'],
'Voir sur la carte': ['See on the map', 'Ver en el mapa', 'Ver no mapa', 'Показать на карте', '在地图上查看', 'عرض على الخريطة'],
"Horaires, tarifs et dates d'ouverture changent souvent : vérifie toujours le site officiel du lieu avant de partir.": ['Opening hours, prices and dates change often: always check the official website before you go.', 'Horarios, precios y fechas de apertura cambian a menudo: consulta siempre la web oficial antes de ir.', 'Horários, preços e datas de abertura mudam muitas vezes: confirma sempre no site oficial antes de ir.', 'Часы работы, цены и даты часто меняются — перед поездкой проверь на официальном сайте.', '开放时间、票价和日期经常变化，出发前请务必查看官方网站。', 'المواعيد والأسعار وتواريخ الافتتاح تتغير كثيرًا: تحققي دائمًا من الموقع الرسمي قبل الذهاب.'],
'Ta ville ou ton code postal': ['Your town or postcode', 'Tu ciudad o código postal', 'A tua cidade ou código postal', 'Твой город или индекс', '你的城市或邮编', 'مدينتك أو رمزك البريدي'],
'France': ['France', 'Francia', 'França', 'Франция', '法国', 'فرنسا'],
'Allemagne': ['Germany', 'Alemania', 'Alemanha', 'Германия', '德国', 'ألمانيا'],
'Danemark': ['Denmark', 'Dinamarca', 'Dinamarca', 'Дания', '丹麦', 'الدنمارك'],
'Pays-Bas': ['Netherlands', 'Países Bajos', 'Países Baixos', 'Нидерланды', '荷兰', 'هولندا'],
'Belgique': ['Belgium', 'Bélgica', 'Bélgica', 'Бельгия', '比利时', 'بلجيكا'],
'Espagne': ['Spain', 'España', 'Espanha', 'Испания', '西班牙', 'إسبانيا'],
'Italie': ['Italy', 'Italia', 'Itália', 'Италия', '意大利', 'إيطاليا'],
'Suède': ['Sweden', 'Suecia', 'Suécia', 'Швеция', '瑞典', 'السويد'],
'Royaume-Uni': ['United Kingdom', 'Reino Unido', 'Reino Unido', 'Великобритания', '英国', 'المملكة المتحدة'],
'Londres': ['London', 'Londres', 'Londres', 'Лондон', '伦敦', 'لندن'],
'Munich': ['Munich', 'Múnich', 'Munique', 'Мюнхен', '慕尼黑', 'ميونخ'],

// ---- Plus ----
'Tout ce qui fait vivre Mams. On ajoute des choses régulièrement.': ['Everything that keeps Mams going. We add new things regularly.', 'Todo lo que da vida a Mams. Añadimos cosas a menudo.', 'Tudo o que dá vida à Mams. Acrescentamos coisas regularmente.', 'Всё, чем живёт Mams. Мы регулярно добавляем новое.', 'Mams 的全部内容，我们会定期更新。', 'كل ما يجعل Mams حيًا. نضيف أشياء جديدة باستمرار.'],
"Chercher dans toute l'appli…": ['Search the whole app…', 'Buscar en toda la app…', 'Procurar em toda a app…', 'Искать по всему приложению…', '在整个应用中搜索…', 'ابحثي في التطبيق كله…'],
'Vidéos de mams': ['Mom videos', 'Vídeos de mamás', 'Vídeos de mães', 'Видео от мам', '妈妈们的视频', 'فيديوهات الأمهات'],
'Quotidien, astuces, buzz': ['Daily life, tips, trends', 'Día a día, trucos, virales', 'Dia a dia, dicas, virais', 'Будни, советы, тренды', '日常、窍门、热门', 'الحياة اليومية، نصائح، رائج'],
'Anniversaire': ['Birthday', 'Cumpleaños', 'Aniversário', 'День рождения', '生日', 'عيد ميلاد'],
'Thèmes, gâteaux, cadeaux': ['Themes, cakes, gifts', 'Temas, tartas, regalos', 'Temas, bolos, presentes', 'Темы, торты, подарки', '主题、蛋糕、礼物', 'مواضيع، كعك، هدايا'],
'Organiser un événement': ['Plan an event', 'Organizar un evento', 'Organizar um evento', 'Устроить праздник', '筹备活动', 'تنظيم مناسبة'],
'Pyjama, copains, fêtes': ['Sleepovers, friends, parties', 'Pijamadas, amigos, fiestas', 'Festas do pijama, amigos, festas', 'Пижамные вечеринки, друзья, праздники', '睡衣派对、朋友、聚会', 'سهرات نوم، أصدقاء، حفلات'],
'Malades ou blessés ?': ['Ill or hurt?', '¿Enfermos o heridos?', 'Doentes ou magoados?', 'Заболел или поранился?', '生病或受伤？', 'مرض أو إصابة؟'],
'Maladies, bobos, urgences': ['Illnesses, scrapes, emergencies', 'Enfermedades, heridas, urgencias', 'Doenças, dói-dóis, urgências', 'Болезни, ссадины, неотложка', '疾病、小伤、急救', 'أمراض، جروح صغيرة، طوارئ'],
'Astuces de grand-mère': ["Grandma's tips", 'Trucos de la abuela', 'Truques da avó', 'Бабушкины советы', '奶奶的小妙招', 'نصائح الجدة'],
'Bobos et maison': ['Scrapes and home', 'Pupas y casa', 'Dói-dóis e casa', 'Ссадины и дом', '小伤和家务', 'جروح صغيرة والبيت'],
'Bons plans du quotidien': ['Everyday deals', 'Chollos del día a día', 'Promoções do dia a dia', 'Выгодно каждый день', '日常优惠', 'عروض يومية'],
'Promos, aides, imprimables': ['Offers, benefits, printables', 'Ofertas, ayudas, imprimibles', 'Promoções, apoios, imprimíveis', 'Скидки, пособия, распечатки', '促销、补助、打印素材', 'تخفيضات، مساعدات، مطبوعات'],
'Agenda': ['Calendar', 'Agenda', 'Agenda', 'Ежедневник', '日程', 'المفكرة'],
'Rendez-vous à ne pas rater': ["Dates you won't want to miss", 'Citas que no te puedes perder', 'Datas a não perder', 'Не пропустить', '不容错过的日子', 'مواعيد لا تفوّتيها'],
'Calendrier': ['Calendar', 'Calendario', 'Calendário', 'Календарь', '日历', 'التقويم'],
'Vacances et jours fériés': ['School holidays and public holidays', 'Vacaciones y festivos', 'Férias e feriados', 'Каникулы и праздники', '假期和法定节日', 'العطل والأعياد الرسمية'],
'Niveaux et avis': ['Levels and reviews', 'Niveles y opiniones', 'Níveis e opiniões', 'Уровни и отзывы', '等级和评价', 'المستويات والآراء'],
'‹ Plus': ['‹ More', '‹ Más', '‹ Mais', '‹ Ещё', '‹ 更多', '‹ المزيد'],
"Je ne donne aucun code promo inventé : les codes changent vite et certains sites sont trompeurs. Les boutons ouvrent une recherche ou le site officiel. Vérifie toujours les conditions et la date, et ne donne jamais tes coordonnées bancaires à un site inconnu.": ['I never give made-up promo codes: codes change fast and some sites are misleading. The buttons open a search or the official site. Always check the terms and the date, and never give your bank details to an unknown site.', 'No doy códigos promocionales inventados: cambian rápido y algunas webs engañan. Los botones abren una búsqueda o la web oficial. Comprueba siempre las condiciones y la fecha, y nunca des tus datos bancarios a una web desconocida.', 'Não dou códigos promocionais inventados: mudam depressa e alguns sites enganam. Os botões abrem uma pesquisa ou o site oficial. Confirma sempre as condições e a data, e nunca dês os teus dados bancários a um site desconhecido.', 'Я не даю выдуманных промокодов: коды быстро меняются, а некоторые сайты обманывают. Кнопки открывают поиск или официальный сайт. Всегда проверяй условия и дату и никогда не вводи банковские данные на незнакомом сайте.', '我不会提供编造的优惠码：优惠码变化快，有些网站不可靠。按钮会打开搜索或官方网站。请务必核对条件和日期，绝不要把银行信息给陌生网站。', 'لا أعطي رموز خصم مختلقة: الرموز تتغير بسرعة وبعض المواقع مضللة. تفتح الأزرار بحثًا أو الموقع الرسمي. تحققي دائمًا من الشروط والتاريخ، ولا تعطي بياناتك البنكية لموقع مجهول.'],
'Blagues': ['Jokes', 'Chistes', 'Piadas', 'Шутки', '笑话', 'نكت'],
'Devinettes': ['Riddles', 'Adivinanzas', 'Adivinhas', 'Загадки', '谜语', 'أحاجٍ'],
'Énigmes': ['Puzzles', 'Enigmas', 'Enigmas', 'Головоломки', '谜题', 'ألغاز'],
'Quiz': ['Quiz', 'Preguntas', 'Quiz', 'Викторина', '问答', 'مسابقة'],
"😂 J'ai ri (+1)": ['😂 Made me laugh (+1)', '😂 Me he reído (+1)', '😂 Ri-me (+1)', '😂 Смешно (+1)', '😂 笑了 (+1)', '😂 ضحكت (+1)'],
'Toutes': ['All', 'Todas', 'Todas', 'Все', '全部', 'الكل'],
'Avec les enfants': ['With the kids', 'Con los niños', 'Com as crianças', 'С детьми', '和孩子一起', 'مع الأطفال'],
'Sucré et salé': ['Sweet and savoury', 'Dulce y salado', 'Doce e salgado', 'Сладкое и солёное', '甜和咸', 'حلو ومالح'],
'Salé': ['Savoury', 'Salado', 'Salgado', 'Солёное', '咸', 'مالح'],
'Sucré': ['Sweet', 'Dulce', 'Doce', 'Сладкое', '甜', 'حلو'],
'Toutes durées': ['Any duration', 'Cualquier duración', 'Qualquer duração', 'Любое время', '不限时长', 'أي مدة'],
'1 h ou moins': ['1 h or less', '1 h o menos', '1 h ou menos', '1 ч и меньше', '1 小时以内', 'ساعة أو أقل'],
'Repas rapide du soir': ['Quick dinner', 'Cena rápida', 'Jantar rápido', 'Быстрый ужин', '快手晚餐', 'عشاء سريع'],
'Idées gâteaux': ['Cake ideas', 'Ideas de pasteles', 'Ideias de bolos', 'Идеи выпечки', '蛋糕点子', 'أفكار كعك'],
'Plats à mijoter': ['Slow-cooked dishes', 'Guisos', 'Pratos de tacho', 'Тушёные блюда', '炖菜', 'أطباق مطهوة على مهل'],
'Goûters': ['Snacks', 'Meriendas', 'Lanches', 'Полдники', '下午点心', 'وجبات خفيفة'],
'Petit-déjeuner': ['Breakfast', 'Desayuno', 'Pequeno-almoço', 'Завтрак', '早餐', 'فطور'],
'Sans four': ['No oven', 'Sin horno', 'Sem forno', 'Без духовки', '免烤箱', 'بدون فرن'],
'Soupes et entrées': ['Soups and starters', 'Sopas y entrantes', 'Sopas e entradas', 'Супы и закуски', '汤和前菜', 'شوربات ومقبلات'],
'Cherche : gratin, banane, chocolat…': ['Search: gratin, banana, chocolate…', 'Busca: gratinado, plátano, chocolate…', 'Procura: gratinado, banana, chocolate…', 'Поиск: запеканка, банан, шоколад…', '搜索：焗菜、香蕉、巧克力…', 'ابحثي: غراتان، موز، شوكولاتة…'],
"Des idées de vidéos de mams, d'astuces et de ce qui cartonne en ce moment. Chaque bouton ouvre ton appli TikTok ou Instagram sur le bon mot-clé.": ["Ideas for mom videos, tips and what's trending right now. Each button opens TikTok or Instagram on the right keyword.", 'Ideas de vídeos de mamás, trucos y lo que arrasa ahora. Cada botón abre TikTok o Instagram con la palabra clave correcta.', 'Ideias de vídeos de mães, dicas e o que está a bombar agora. Cada botão abre o TikTok ou o Instagram com a palavra-chave certa.', 'Идеи видео от мам, советы и то, что сейчас в тренде. Каждая кнопка открывает TikTok или Instagram по нужному запросу.', '妈妈们的视频点子、窍门和当下热门内容。每个按钮都会用对应关键词打开 TikTok 或 Instagram。', 'أفكار فيديوهات للأمهات ونصائح وما هو رائج الآن. كل زر يفتح TikTok أو Instagram على الكلمة المناسبة.'],
'Mot-clé à chercher :': ['Keyword to search:', 'Palabra clave:', 'Palavra-chave:', 'Ключевое слово:', '搜索关键词：', 'الكلمة المفتاحية:'],
'Copier': ['Copy', 'Copiar', 'Copiar', 'Копировать', '复制', 'نسخ'],
'Toutes les vidéos de mams →': ['All mom videos →', 'Todos los vídeos de mamás →', 'Todos os vídeos de mães →', 'Все видео от мам →', '所有妈妈视频 →', 'كل فيديوهات الأمهات ←'],
'Lire': ['Read', 'Leer', 'Ler', 'Читать', '阅读', 'اقرئي'],
'Cette semaine au ciné et en streaming': ['This week in cinemas and streaming', 'Esta semana en cines y streaming', 'Esta semana no cinema e em streaming', 'На этой неделе в кино и онлайн', '本周影院和流媒体', 'هذا الأسبوع في السينما والبث'],
'Vidéos et bons plans': ['Videos and deals', 'Vídeos y chollos', 'Vídeos e promoções', 'Видео и выгодные предложения', '视频和优惠', 'فيديوهات وعروض'],
'À lire': ['To read', 'Para leer', 'Para ler', 'Почитать', '阅读', 'للقراءة'],
'Rechercher dans Mams': ['Search Mams', 'Buscar en Mams', 'Procurar na Mams', 'Поиск в Mams', '在 Mams 中搜索', 'البحث في Mams'],
'Vidéos': ['Videos', 'Vídeos', 'Vídeos', 'Видео', '视频', 'فيديوهات'],
'Ex : gâteau, fièvre, licorne, pyjama…': ['E.g. cake, fever, unicorn, pyjamas…', 'Ej.: pastel, fiebre, unicornio, pijama…', 'Ex.: bolo, febre, unicórnio, pijama…', 'Например: торт, температура, единорог, пижама…', '例如：蛋糕、发烧、独角兽、睡衣…', 'مثلًا: كعكة، حمى، وحيد القرن، بيجامة…'],

// ---- Communauté ----
'Le tchat et la liste des mams près de chez toi arrivent bientôt. En attendant, prépare ton profil et organise une sortie.': ['Chat and the list of moms near you are coming soon. Meanwhile, set up your profile and plan an outing.', 'El chat y la lista de mamás cerca de ti llegarán pronto. Mientras tanto, prepara tu perfil y organiza una salida.', 'O chat e a lista de mães perto de ti chegam em breve. Entretanto, prepara o teu perfil e organiza um passeio.', 'Чат и список мам рядом с тобой скоро появятся. А пока заполни профиль и организуй прогулку.', '聊天和附近妈妈列表即将上线。现在可以先完善资料、组织一次聚会。', 'الدردشة وقائمة الأمهات القريبات منك قادمتان قريبًا. في الأثناء، جهّزي ملفك ونظّمي نزهة.'],
'Mon profil (facultatif)': ['My profile (optional)', 'Mi perfil (opcional)', 'O meu perfil (opcional)', 'Мой профиль (по желанию)', '我的资料（可选）', 'ملفي (اختياري)'],
"Pour l'instant il reste uniquement sur ton téléphone. Rien n'est publié sans ton accord.": ['For now it stays only on your phone. Nothing is published without your consent.', 'Por ahora solo se guarda en tu teléfono. No se publica nada sin tu permiso.', 'Por agora fica apenas no teu telemóvel. Nada é publicado sem o teu acordo.', 'Пока он хранится только на твоём телефоне. Ничего не публикуется без твоего согласия.', '目前资料只保存在你的手机上。未经你同意，不会公开任何内容。', 'يبقى حاليًا على هاتفك فقط. لا يُنشر شيء دون موافقتك.'],
'Prénom ou pseudo': ['First name or nickname', 'Nombre o apodo', 'Nome ou alcunha', 'Имя или ник', '名字或昵称', 'الاسم أو اللقب'],
'Ville': ['Town', 'Ciudad', 'Cidade', 'Город', '城市', 'المدينة'],
'Âge de mes enfants': ["My children's ages", 'Edad de mis hijos', 'Idade dos meus filhos', 'Возраст моих детей', '孩子的年龄', 'أعمار أطفالي'],
'Je cherche': ["I'm looking for", 'Busco', 'Procuro', 'Я ищу', '我在找', 'أبحث عن'],
'Je veux apparaître dans la liste des mams quand elle ouvrira.': ['I want to appear in the list of moms when it opens.', 'Quiero aparecer en la lista de mamás cuando abra.', 'Quero aparecer na lista de mães quando abrir.', 'Хочу быть в списке мам, когда он откроется.', '列表开放后，我想出现在妈妈列表中。', 'أريد أن أظهر في قائمة الأمهات عند افتتاحها.'],
'Enregistrer mon profil': ['Save my profile', 'Guardar mi perfil', 'Guardar o meu perfil', 'Сохранить профиль', '保存资料', 'حفظ ملفي'],
'Organiser une sortie': ['Plan an outing', 'Organizar una salida', 'Organizar um passeio', 'Организовать прогулку', '组织一次聚会', 'تنظيم نزهة'],
'Écris ta proposition, puis envoie-la à tes copines par WhatsApp, SMS ou en groupe.': ['Write your plan, then send it to your friends by WhatsApp, text or in a group.', 'Escribe tu propuesta y envíasela a tus amigas por WhatsApp, SMS o en grupo.', 'Escreve a tua proposta e envia-a às tuas amigas por WhatsApp, SMS ou em grupo.', 'Напиши предложение и отправь подругам в WhatsApp, по SMS или в группу.', '写下你的提议，再通过 WhatsApp、短信或群聊发给朋友。', 'اكتبي اقتراحك ثم أرسليه لصديقاتك عبر واتساب أو رسالة نصية أو في مجموعة.'],
'Quoi ?': ['What?', '¿Qué?', 'O quê?', 'Что?', '做什么？', 'ماذا؟'],
'Où ?': ['Where?', '¿Dónde?', 'Onde?', 'Где?', '在哪里？', 'أين؟'],
'Quand ?': ['When?', '¿Cuándo?', 'Quando?', 'Когда?', '什么时候？', 'متى؟'],
'Partager la proposition': ['Share the plan', 'Compartir la propuesta', 'Partilhar a proposta', 'Поделиться предложением', '分享提议', 'مشاركة الاقتراح'],
'Les règles de la maison': ['House rules', 'Las normas de la casa', 'As regras da casa', 'Правила сообщества', '社区守则', 'قواعد البيت'],
"Bienveillance, pas de jugement, pas de photos d'enfants sans l'accord des parents, et on ne partage jamais l'adresse de son domicile avec une inconnue : on se retrouve dans un lieu public.": ["Be kind, no judging, no photos of children without their parents' consent, and never share your home address with a stranger: meet in a public place.", 'Amabilidad, nada de juicios, nada de fotos de niños sin permiso de sus padres, y nunca compartas tu dirección con una desconocida: quedad en un lugar público.', 'Simpatia, sem julgamentos, sem fotos de crianças sem o acordo dos pais, e nunca partilhes a tua morada com uma desconhecida: encontrem-se num local público.', 'Доброжелательность, никакого осуждения, никаких фото детей без согласия родителей, и никогда не сообщай домашний адрес незнакомке — встречайтесь в общественном месте.', '友善相待，不评判；未经父母同意不发孩子照片；绝不把家庭住址告诉陌生人，请在公共场所见面。', 'اللطف، لا أحكام، لا صور للأطفال دون موافقة الأهل، ولا تشاركي أبدًا عنوان بيتك مع غريبة: التقين في مكان عام.'],
'ex : 2 ans et 6 ans': ['e.g. 2 and 6 years', 'ej.: 2 y 6 años', 'ex.: 2 e 6 anos', 'например: 2 и 6 лет', '例如：2 岁和 6 岁', 'مثلًا: سنتان و6 سنوات'],
'ex : copines pour les sorties au parc': ['e.g. friends for trips to the park', 'ej.: amigas para ir al parque', 'ex.: amigas para ir ao parque', 'например: подруги для прогулок в парке', '例如：一起去公园的朋友', 'مثلًا: صديقات للخروج إلى الحديقة'],
'ex : Pique-nique et jeux au parc': ['e.g. Picnic and games in the park', 'ej.: Picnic y juegos en el parque', 'ex.: Piquenique e jogos no parque', 'например: пикник и игры в парке', '例如：公园野餐和游戏', 'مثلًا: نزهة وألعاب في الحديقة'],
'Ville, parc, adresse': ['Town, park, address', 'Ciudad, parque, dirección', 'Cidade, parque, morada', 'Город, парк, адрес', '城市、公园、地址', 'المدينة، الحديقة، العنوان'],
'ex : samedi 22 à 15h': ['e.g. Saturday 22nd at 3 pm', 'ej.: sábado 22 a las 15 h', 'ex.: sábado, 22, às 15h', 'например: суббота, 22-е, в 15:00', '例如：22 日周六下午 3 点', 'مثلًا: السبت 22 الساعة 3 عصرًا'],

// ---- Planning ----
'Planning de la semaine': ["This week's planner", 'Agenda de la semana', 'Agenda da semana', 'План на неделю', '本周计划', 'جدول الأسبوع'],
"Ajoute seulement ce qui t'aide à t'organiser.": ['Only add what helps you stay organised.', 'Añade solo lo que te ayude a organizarte.', 'Acrescenta só o que te ajuda a organizar-te.', 'Добавляй только то, что помогает тебе.', '只添加对你有帮助的安排。', 'أضيفي فقط ما يساعدك على التنظيم.'],
'Ajouter': ['Add', 'Añadir', 'Adicionar', 'Добавить', '添加', 'إضافة'],
"Rien de prévu, et c'est très bien.": ["Nothing planned, and that's just fine.", 'Nada previsto, y está muy bien.', 'Nada planeado, e está tudo bem.', 'Ничего не запланировано — и это прекрасно.', '没有安排，这样也很好。', 'لا شيء مخطط، وهذا جيد جدًا.'],
'Lundi': ['Monday', 'Lunes', 'Segunda-feira', 'Понедельник', '星期一', 'الاثنين'],
'Mardi': ['Tuesday', 'Martes', 'Terça-feira', 'Вторник', '星期二', 'الثلاثاء'],
'Mercredi': ['Wednesday', 'Miércoles', 'Quarta-feira', 'Среда', '星期三', 'الأربعاء'],
'Jeudi': ['Thursday', 'Jueves', 'Quinta-feira', 'Четверг', '星期四', 'الخميس'],
'Vendredi': ['Friday', 'Viernes', 'Sexta-feira', 'Пятница', '星期五', 'الجمعة'],
'Samedi': ['Saturday', 'Sábado', 'Sábado', 'Суббота', '星期六', 'السبت'],
'Dimanche': ['Sunday', 'Domingo', 'Domingo', 'Воскресенье', '星期日', 'الأحد'],
"aujourd'hui": ['today', 'hoy', 'hoje', 'сегодня', '今天', 'اليوم'],

// ---- Famille ----
'activités faites': ['activities done', 'actividades hechas', 'atividades feitas', 'занятий сделано', '已完成活动', 'أنشطة منجزة'],
'plateformes choisies': ['platforms chosen', 'plataformas elegidas', 'plataformas escolhidas', 'платформ выбрано', '已选平台', 'منصات مختارة'],
'Mes points': ['My points', 'Mis puntos', 'Os meus pontos', 'Мои баллы', '我的积分', 'نقاطي'],
'Voir mes points et mes avis': ['See my points and reviews', 'Ver mis puntos y opiniones', 'Ver os meus pontos e opiniões', 'Мои баллы и отзывы', '查看积分和评价', 'عرض نقاطي وآرائي'],
'Mon journal': ['My journal', 'Mi diario', 'O meu diário', 'Мой дневник', '我的日记', 'مذكراتي'],
'Garde un souvenir de vos activités, avec ou sans photo. Tout reste sur ton téléphone.': ['Keep a memory of your activities, with or without a photo. Everything stays on your phone.', 'Guarda un recuerdo de vuestras actividades, con o sin foto. Todo se queda en tu teléfono.', 'Guarda uma recordação das vossas atividades, com ou sem foto. Tudo fica no teu telemóvel.', 'Сохраняй воспоминания о ваших занятиях — с фото или без. Всё остаётся на твоём телефоне.', '记录你们的活动回忆，可以带照片也可以不带。所有内容都只保存在你的手机上。', 'احتفظي بذكرى أنشطتكم، مع صورة أو بدونها. كل شيء يبقى على هاتفك.'],
'Pas encore de souvenir.': ['No memories yet.', 'Todavía no hay recuerdos.', 'Ainda não há recordações.', 'Пока нет воспоминаний.', '还没有回忆。', 'لا توجد ذكريات بعد.'],
'Ajouter un souvenir': ['Add a memory', 'Añadir un recuerdo', 'Adicionar uma recordação', 'Добавить воспоминание', '添加回忆', 'إضافة ذكرى'],
'Mes enfants': ['My children', 'Mis hijos', 'Os meus filhos', 'Мои дети', '我的孩子', 'أطفالي'],
"Pour proposer des activités adaptées à leur âge. Rien n'est envoyé : tout reste sur ton appareil.": ['To suggest activities that suit their age. Nothing is sent: everything stays on your device.', 'Para proponer actividades adaptadas a su edad. No se envía nada: todo se queda en tu dispositivo.', 'Para sugerir atividades adequadas à idade deles. Nada é enviado: tudo fica no teu aparelho.', 'Чтобы предлагать занятия по возрасту. Ничего не отправляется — всё остаётся на твоём устройстве.', '用来推荐适合孩子年龄的活动。不会发送任何信息，全部保存在你的设备上。', 'لاقتراح أنشطة تناسب أعمارهم. لا يُرسل شيء: كل شيء يبقى على جهازك.'],
'Ajouter un enfant': ['Add a child', 'Añadir un hijo', 'Adicionar um filho', 'Добавить ребёнка', '添加孩子', 'إضافة طفل'],
'Mes données': ['My data', 'Mis datos', 'Os meus dados', 'Мои данные', '我的数据', 'بياناتي'],
'Tout est enregistré uniquement sur cet appareil.': ['Everything is saved only on this device.', 'Todo se guarda solo en este dispositivo.', 'Tudo é guardado apenas neste aparelho.', 'Всё хранится только на этом устройстве.', '所有内容只保存在这台设备上。', 'كل شيء محفوظ على هذا الجهاز فقط.'],
'Effacer mes données': ['Delete my data', 'Borrar mis datos', 'Apagar os meus dados', 'Удалить мои данные', '清除我的数据', 'مسح بياناتي'],
'Petit œuf 🥚': ['Little egg 🥚', 'Huevito 🥚', 'Ovinho 🥚', 'Яичко 🥚', '小蛋蛋 🥚', 'بيضة صغيرة 🥚'],
'Poussin 🐣': ['Chick 🐣', 'Pollito 🐣', 'Pintainho 🐣', 'Цыплёнок 🐣', '小鸡 🐣', 'كتكوت 🐣'],
'Mams débutante 🌸': ['Beginner mom 🌸', 'Mamá principiante 🌸', 'Mãe principiante 🌸', 'Мама-новичок 🌸', '新手妈妈 🌸', 'أم مبتدئة 🌸'],
'Mams en or ✨': ['Golden mom ✨', 'Mamá de oro ✨', 'Mãe de ouro ✨', 'Золотая мама ✨', '金牌妈妈 ✨', 'أم من ذهب ✨'],
'Super mams 🦸': ['Super mom 🦸', 'Supermamá 🦸', 'Supermãe 🦸', 'Супермама 🦸', '超级妈妈 🦸', 'أم خارقة 🦸'],
'Reine des mams 👑': ['Queen of moms 👑', 'Reina de las mamás 👑', 'Rainha das mães 👑', 'Королева мам 👑', '妈妈女王 👑', 'ملكة الأمهات 👑'],

// ---- Messages rapides ----
'6 enfants maximum': ['6 children maximum', 'Máximo 6 hijos', 'Máximo 6 filhos', 'Не больше 6 детей', '最多 6 个孩子', '6 أطفال كحد أقصى'],
'Ajouté à ton agenda': ['Added to your calendar', 'Añadido a tu agenda', 'Adicionado à tua agenda', 'Добавлено в ежедневник', '已加入日程', 'أضيف إلى مفكرتك'],
'Avis mis à jour': ['Review updated', 'Opinión actualizada', 'Opinião atualizada', 'Отзыв обновлён', '评价已更新', 'تم تحديث الرأي'],
"Bienvenue dans l'espace adultes 🍿": ['Welcome to the grown-ups area 🍿', 'Bienvenida al espacio para adultos 🍿', 'Bem-vinda ao espaço para adultos 🍿', 'Добро пожаловать во взрослый раздел 🍿', '欢迎来到成人专区 🍿', 'مرحبًا بك في قسم الكبار 🍿'],
'Choisis une note': ['Choose a rating', 'Elige una nota', 'Escolhe uma nota', 'Выбери оценку', '请选择评分', 'اختاري تقييمًا'],
'Dis ce que tu proposes': ['Say what you suggest', 'Di qué propones', 'Diz o que propões', 'Напиши, что предлагаешь', '写下你的提议', 'قولي ماذا تقترحين'],
'Déjà comptée, bravo !': ['Already counted, well done!', 'Ya contada, ¡bravo!', 'Já contada, parabéns!', 'Уже засчитано, молодец!', '已经记过了，真棒！', 'محسوبة مسبقًا، أحسنتِ!'],
'Photo trop lourde : souvenir gardé sans photo': ['Photo too large: memory saved without the photo', 'Foto demasiado pesada: recuerdo guardado sin foto', 'Foto demasiado pesada: recordação guardada sem foto', 'Фото слишком большое: воспоминание сохранено без фото', '照片太大：回忆已保存，但不含照片', 'الصورة كبيرة جدًا: حُفظت الذكرى بدون صورة'],
'Position indisponible sur ce téléphone': ['Location unavailable on this phone', 'Ubicación no disponible en este teléfono', 'Localização indisponível neste telemóvel', 'Геолокация недоступна на этом телефоне', '这部手机无法获取位置', 'الموقع غير متاح على هذا الهاتف'],
'Profil enregistré sur ton téléphone': ['Profile saved on your phone', 'Perfil guardado en tu teléfono', 'Perfil guardado no teu telemóvel', 'Профиль сохранён на телефоне', '资料已保存到你的手机', 'تم حفظ الملف على هاتفك'],
'Écris ta ville ou touche « Me localiser »': ['Type your town or tap “Locate me”', 'Escribe tu ciudad o toca «Localizarme»', 'Escreve a tua cidade ou toca em «Localizar-me»', 'Напиши город или нажми «Найти меня»', '输入城市或点击“定位我”', 'اكتبي مدينتك أو المسي «حدّدي موقعي»'],
'Écris un mot ou ajoute une photo': ['Write a few words or add a photo', 'Escribe algo o añade una foto', 'Escreve algo ou adiciona uma foto', 'Напиши пару слов или добавь фото', '写几句话或添加照片', 'اكتبي كلمة أو أضيفي صورة'],
'Écris un titre et choisis un jour': ['Write a title and choose a day', 'Escribe un título y elige un día', 'Escreve um título e escolhe um dia', 'Напиши название и выбери день', '写个标题并选择日期', 'اكتبي عنوانًا واختاري يومًا'],
'Noté, bravo !': ['Noted, well done!', 'Anotado, ¡bravo!', 'Registado, parabéns!', 'Отмечено, молодец!', '已记录，真棒！', 'تم التسجيل، أحسنتِ!'],
'Noté une nouvelle fois': ['Noted once more', 'Anotado otra vez', 'Registado mais uma vez', 'Отмечено ещё раз', '又记录了一次', 'تم التسجيل مرة أخرى'],
};

/* Mois, jours, et petits motifs avec des nombres */
const MONTHS = { janvier: 0, 'février': 1, mars: 2, avril: 3, mai: 4, juin: 5, juillet: 6, 'août': 7, septembre: 8, octobre: 9, novembre: 10, 'décembre': 11 };
const LOC = ['en-GB', 'es-ES', 'pt-PT', 'ru-RU', 'zh-CN', 'ar'][COL];
const fmt = (d, o) => { try { return new Intl.DateTimeFormat(LOC, o).format(d); } catch (e) { return null; } };
const W = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const pick = (a) => a[COL];
const R = [
  [/^(\d+) min$/, m => pick([`${m[1]} min`, `${m[1]} min`, `${m[1]} min`, `${m[1]} мин`, `${m[1]} 分钟`, `${m[1]} د`])],
  [/^(\d+)[–-](\d+) ans$/, m => pick([`${m[1]}–${m[2]} yrs`, `${m[1]}–${m[2]} años`, `${m[1]}–${m[2]} anos`, `${m[1]}–${m[2]} лет`, `${m[1]}–${m[2]} 岁`, `${m[1]}–${m[2]} سنة`])],
  [/^(\d+) ans?$/, m => pick([`${m[1]} yrs`, `${m[1]} años`, `${m[1]} anos`, `${m[1]} ${+m[1] % 10 === 1 && +m[1] !== 11 ? 'год' : (+m[1] % 10 >= 2 && +m[1] % 10 <= 4 && (+m[1] < 12 || +m[1] > 14) ? 'года' : 'лет')}`, `${m[1]} 岁`, `${m[1]} سنوات`])],
  [/^(\d+) activités sur (\d+)$/, m => pick([`${m[1]} of ${m[2]} activities`, `${m[1]} de ${m[2]} actividades`, `${m[1]} de ${m[2]} atividades`, `${m[1]} из ${m[2]} занятий`, `${m[2]} 个活动中的 ${m[1]} 个`, `${m[1]} من ${m[2]} نشاطًا`])],
  [/^(\d+) activités par âge$/, m => pick([`${m[1]} activities by age`, `${m[1]} actividades por edad`, `${m[1]} atividades por idade`, `Занятий по возрасту: ${m[1]}`, `${m[1]} 个按年龄分类的活动`, `${m[1]} نشاطًا حسب العمر`])],
  [/^(\d+) recettes$/, m => pick([`${m[1]} recipes`, `${m[1]} recetas`, `${m[1]} receitas`, `Рецептов: ${m[1]}`, `${m[1]} 个食谱`, `${m[1]} وصفة`])],
  [/^Voir les (\d+) nouveautés$/, m => pick([`See the ${m[1]} new items`, `Ver las ${m[1]} novedades`, `Ver as ${m[1]} novidades`, `Смотреть новинки (${m[1]})`, `查看 ${m[1]} 条新内容`, `عرض الجديد (${m[1]})`])],
  [/^(\d) sur 5$/, m => pick([`${m[1]} out of 5`, `${m[1]} de 5`, `${m[1]} em 5`, `${m[1]} из 5`, `${m[1]}/5`, `${m[1]} من 5`])],
  [/^(\d+) points?$/, m => pick([`${m[1]} point${m[1] === '1' ? '' : 's'}`, `${m[1]} punto${m[1] === '1' ? '' : 's'}`, `${m[1]} ponto${m[1] === '1' ? '' : 's'}`, `${m[1]} балл.`, `${m[1]} 分`, `${m[1]} نقطة`])],
  [/^\+(\d+) points?$/, m => '+' + pick([`${m[1]} point${m[1] === '1' ? '' : 's'}`, `${m[1]} punto${m[1] === '1' ? '' : 's'}`, `${m[1]} ponto${m[1] === '1' ? '' : 's'}`, `${m[1]} балл.`, `${m[1]} 分`, `${m[1]} نقطة`])],
  [/^(\d+) (?:blagues, devinettes, énigmes et questions)\. On en ajoute souvent\.$/, m => pick([`${m[1]} jokes, riddles, puzzles and questions. We add more often.`, `${m[1]} chistes, adivinanzas, enigmas y preguntas. Añadimos más a menudo.`, `${m[1]} piadas, adivinhas, enigmas e perguntas. Acrescentamos mais muitas vezes.`, `${m[1]} — шутки, загадки, головоломки и вопросы. Мы часто добавляем новые.`, `${m[1]} 个笑话、谜语、谜题和问题，经常更新。`, `${m[1]} نكتة ولغزًا وأحجية وسؤالًا. نضيف المزيد باستمرار.`])],
  [/^(\d+) recettes, avec des vidéos à voir sur YouTube et TikTok\.$/, m => pick([`${m[1]} recipes, with videos to watch on YouTube and TikTok.`, `${m[1]} recetas, con vídeos en YouTube y TikTok.`, `${m[1]} receitas, com vídeos para ver no YouTube e no TikTok.`, `Рецептов: ${m[1]}, с видео на YouTube и TikTok.`, `${m[1]} 个食谱，可在 YouTube 和 TikTok 上看视频。`, `${m[1]} وصفة مع فيديوهات على YouTube وTikTok.`])],
  [/^Mams · Version (.+)$/, m => pick([`Mams · Version ${m[1]}`, `Mams · Versión ${m[1]}`, `Mams · Versão ${m[1]}`, `Mams · Версия ${m[1]}`, `Mams · 版本 ${m[1]}`, `Mams · الإصدار ${m[1]}`])],
  [/^Version de l'appli : (.+)$/, m => pick([`App version: ${m[1]}`, `Versión de la app: ${m[1]}`, `Versão da app: ${m[1]}`, `Версия приложения: ${m[1]}`, `应用版本：${m[1]}`, `إصدار التطبيق: ${m[1]}`])],
  [/^Ajouté : (.+)$/, m => pick(['Added: ', 'Añadido: ', 'Adicionado: ', 'Добавлено: ', '已添加：', 'تمت الإضافة: ']) + m[1]],
  [/^Mot-clé copié : (.+)$/, m => pick(['Keyword copied: ', 'Palabra clave copiada: ', 'Palavra-chave copiada: ', 'Ключевое слово скопировано: ', '已复制关键词：', 'تم نسخ الكلمة: ']) + m[1]],
  // dates : « dimanche 15 novembre », « 23 décembre », « 14 novembre 2026 », « 15/11/2026 »
  [/^(?:(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi) )?(\d{1,2}) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)(?: (\d{4}))?$/i, m => {
    const y = m[4] ? +m[4] : new Date().getFullYear(); const d = new Date(y, MONTHS[m[3].toLowerCase()], +m[2]);
    return fmt(d, Object.assign({ day: 'numeric', month: 'long' }, m[1] ? { weekday: 'long' } : {}, m[4] ? { year: 'numeric' } : {}));
  }],
  [/^mis à jour le (\d{1,2})\/(\d{1,2})\/(\d{4})$/i, m => pick(['updated on ', 'actualizado el ', 'atualizado a ', 'обновлено ', '更新于 ', 'تحديث بتاريخ ']) + fmt(new Date(+m[3], +m[2] - 1, +m[1]), { day: 'numeric', month: 'long', year: 'numeric' })],
  [/^Mis à jour le (\d{1,2})\/(\d{1,2})\/(\d{4})\. On ajoute des nouveautés souvent\.$/, m => pick(['Updated on ', 'Actualizado el ', 'Atualizado a ', 'Обновлено ', '更新于 ', 'تحديث بتاريخ ']) + fmt(new Date(+m[3], +m[2] - 1, +m[1]), { day: 'numeric', month: 'long', year: 'numeric' }) + pick(['. We add new things often.', '. Añadimos novedades a menudo.', '. Acrescentamos novidades muitas vezes.', '. Мы часто добавляем новое.', '。我们会经常更新。', '. نضيف الجديد باستمرار.'])],
  [/^Mis à jour : (.+?)\. On met à jour souvent\.$/, m => pick(['Updated: ', 'Actualizado: ', 'Atualizado: ', 'Обновлено: ', '更新：', 'آخر تحديث: ']) + (tr(m[1]) || m[1]) + pick(['. We update often.', '. Actualizamos a menudo.', '. Atualizamos muitas vezes.', '. Мы часто обновляем.', '。我们会经常更新。', '. نحدّث باستمرار.'])],
];

function core(t) {
  if (Object.prototype.hasOwnProperty.call(D, t)) return pick(D[t]);
  for (const [re, f] of R) { const m = t.match(re); if (m) { const r = f(m); if (r) return r; } }
  return null;
}
// Traduit un texte : tel quel, ou morceau par morceau autour de « · », ou sans l'emoji du début
function tr(t) {
  const s = t.replace(/\s+/g, ' ').trim(); if (!s) return null;
  let r = core(s); if (r) return r;
  const em = s.match(/^([^\p{L}\p{N}«(]+)\s*(.+)$/u);
  if (em) { r = core(em[2]); if (r) return em[1].trim() + ' ' + r; }
  if (s.includes(' · ')) {
    let hit = false; const parts = s.split(' · ').map(p => { const x = tr(p); if (x) { hit = true; return x; } return p; });
    if (hit) return parts.join(' · ');
  }
  return null;
}

const ATTRS = ['placeholder', 'aria-label', 'title'];
const SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1 };
function doText(n) {
  const p = n.parentElement; if (!p || SKIP[p.tagName] || p.isContentEditable) return;
  const v = n.nodeValue; if (!v || !v.trim()) return;
  if (v.trim() === 'Mams') { mark(p, n); return; }
  if ((p.tagName === 'H3' || p.tagName === 'H4' || p.tagName === 'B') && p.childNodes.length === 1 && !p.dataset.fr) p.dataset.fr = v.trim();
  const r = tr(v);
  if (r) { const lead = v.match(/^\s*/)[0], tail = v.match(/\s*$/)[0]; if (p.childNodes.length === 1) p.dataset.fr = v.trim(); n.nodeValue = lead + r + tail; mark(p, n); }
  else if (p.dataset.mt) { p.classList.remove('notranslate'); delete p.dataset.mt; }
}
// Empêche Google de retraduire ce qui est déjà traduit à la main
function mark(p, n) {
  const others = [...p.childNodes].some(c => c !== n && ((c.nodeType === 3 && c.nodeValue.trim()) || (c.nodeType === 1 && !c.classList.contains('notranslate'))));
  if (!others) { if (!p.classList.contains('notranslate')) { p.classList.add('notranslate'); p.dataset.mt = '1'; } if (RTL) p.dir = 'auto'; }
  else { const s = document.createElement('span'); s.className = 'notranslate'; if (RTL) s.dir = 'auto'; p.insertBefore(s, n); s.appendChild(n); }
}
function doAttrs(el) {
  ATTRS.forEach(a => { const v = el.getAttribute(a); if (v) { const r = tr(v); if (r) el.setAttribute(a, r); } });
}
function walk(root) {
  if (root.nodeType === 3) { doText(root); return; }
  if (root.nodeType !== 1 || SKIP[root.tagName]) return;
  doAttrs(root);
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT); const list = [];
  let n; while ((n = w.nextNode())) list.push(n);
  list.forEach(x => x.nodeType === 3 ? doText(x) : doAttrs(x));
}
/* Google ne traduit pas ce qui est caché (fiches, onglets pas encore ouverts).
   Quand un bloc devient visible, on lui « remet » ses textes pour que Google les voie et les traduise. */
const VIS_ATTRS = { class: 1, hidden: 1, open: 1 };
const vis = new WeakMap(); const pend = new Set(); let raf = 0;
function nudge(el) {
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const list = []; let n;
  while ((n = w.nextNode())) { const p = n.parentElement; if (!p || SKIP[p.tagName] || !n.nodeValue.trim() || p.closest('.notranslate,font,svg')) continue; list.push(n); }
  list.forEach(x => x.replaceWith(document.createTextNode(x.nodeValue)));
}
function queueVis(el) {
  if (el.nodeType !== 1 || el === document.documentElement || el === document.body) return;
  pend.add(el);
  if (!raf) raf = requestAnimationFrame(() => {
    raf = 0; const els = [...pend]; pend.clear();
    els.forEach(e => { if (!e.isConnected) return; const v = e.getClientRects().length > 0; const was = vis.get(e); vis.set(e, v); if (v && !was && e.querySelector('*')) nudge(e); });
  });
}
let busy = false;
const mo = new MutationObserver(recs => {
  if (busy) return; busy = true;
  try {
    recs.forEach(r => {
      if (r.type === 'childList') r.addedNodes.forEach(walk);
      else if (r.type === 'characterData') doText(r.target);
      else if (r.type === 'attributes' && VIS_ATTRS[r.attributeName]) queueVis(r.target);
      else if (r.type === 'attributes') { const v = r.target.getAttribute(r.attributeName); if (v) { const x = tr(v); if (x) r.target.setAttribute(r.attributeName, x); } }
    });
  } finally { mo.takeRecords(); busy = false; }
});
mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS.concat(['class', 'hidden', 'open']) });
document.addEventListener('DOMContentLoaded', () => { busy = true; walk(document.body); mo.takeRecords(); busy = false; });
window.MAMS_TR = tr;

/* ===== Vidéos et recherches dans la langue choisie =====
   Les boutons YouTube, TikTok, Instagram et Google partent d'une recherche en français.
   Au moment du clic, on la refait dans la langue choisie : le titre affiché (déjà traduit)
   + les mots-clés traduits ici. */
const VW = {
'bande-annonce vf': ['official trailer', 'tráiler en español', 'trailer dublado português', 'трейлер на русском', '中文 预告片', 'إعلان مدبلج عربي'],
'bande annonce': ['trailer', 'tráiler', 'trailer', 'трейлер', '预告片', 'إعلان'],
'bande-annonce': ['trailer', 'tráiler', 'trailer', 'трейлер', '预告片', 'إعلان'],
'calendrier de l avent': ['advent calendar', 'calendario de adviento', 'calendário do advento', 'адвент-календарь', '圣诞倒数日历', 'تقويم المجيء'],
'que faire à la maison': ['what to do at home', 'qué hacer en casa', 'o que fazer em casa', 'чем заняться дома', '在家做什么', 'ماذا نفعل في البيت'],
'jour de pluie': ['rainy day', 'día de lluvia', 'dia de chuva', 'дождливый день', '下雨天', 'يوم ممطر'],
'routine du matin': ['morning routine', 'rutina de mañana', 'rotina da manhã', 'утренняя рутина', '早晨日常', 'روتين الصباح'],
'faire manger': ['get kids to eat', 'hacer comer', 'fazer comer', 'как накормить', '让孩子吃', 'كيف تجعلين الأطفال يأكلون'],
'premiers mois': ['first months', 'primeros meses', 'primeiros meses', 'первые месяцы', '头几个月', 'الأشهر الأولى'],
'lutin farceur': ['elf on the shelf', 'elfo travieso', 'elfo travesso', 'проказник эльф', '圣诞小精灵', 'قزم عيد الميلاد'],
'lunch box': ['lunch box', 'fiambrera', 'lancheira', 'ланчбокс', '便当', 'علبة الغداء'],
'black friday': ['black friday', 'black friday', 'black friday', 'чёрная пятница', '黑色星期五', 'الجمعة السوداء'],
'bons plans': ['deals', 'chollos', 'promoções', 'скидки', '优惠', 'عروض'],
'pas cher': ['cheap', 'barato', 'barato', 'недорого', '便宜', 'رخيص'],
'plat mijoté': ['stew', 'guiso', 'estufado', 'тушёное блюдо', '炖菜', 'طبخة'],
'famille nombreuse': ['big family', 'familia numerosa', 'família numerosa', 'многодетная семья', '大家庭', 'عائلة كبيرة'],
'qui travaille': ['working', 'que trabaja', 'que trabalha', 'работающая', '上班的', 'عاملة'],
'de quartier': ['neighbourhood', 'de barrio', 'de bairro', 'из района', '社区', 'الحي'],
'en famille': ['family', 'en familia', 'em família', 'всей семьёй', '全家', 'عائلي'],
'sans matériel': ['no materials', 'sin material', 'sem material', 'без материалов', '不用材料', 'بدون أدوات'],
'gagner du temps': ['save time', 'ahorrar tiempo', 'poupar tempo', 'сэкономить время', '节省时间', 'توفير الوقت'],
'activité manuelle': ['craft', 'manualidad', 'trabalho manual', 'поделка', '手工', 'أشغال يدوية'],
'avec du carton': ['with cardboard', 'con cartón', 'com cartão', 'из картона', '用纸板', 'بالكرتون'],
'expérience scientifique': ['science experiment', 'experimento científico', 'experiência científica', 'научный опыт', '科学实验', 'تجربة علمية'],
'20 minutes': ['20 minutes', '20 minutos', '20 minutos', '20 минут', '20分钟', '20 دقيقة'],
'pas à pas': ['step by step', 'paso a paso', 'passo a passo', 'пошагово', '分步', 'خطوة بخطوة'],
'soi-même': ['diy', 'tú misma', 'tu mesma', 'своими руками', '自己做', 'بنفسك'],
'bac sensoriel': ['sensory bin', 'caja sensorial', 'caixa sensorial', 'сенсорная коробка', '感官箱', 'صندوق حسي'],
'pâte à sel': ['salt dough', 'masa de sal', 'massa de sal', 'солёное тесто', '盐面团', 'عجينة الملح'],
'pâte à modeler': ['play dough', 'plastilina', 'plasticina', 'пластилин', '彩泥', 'صلصال'],
'jeu': ['game', 'juego', 'jogo', 'игра', '游戏', 'لعبة'],
'fabriquer': ['make', 'hacer', 'fazer', 'сделать', '制作', 'صنع'],
'faire': ['make', 'hacer', 'fazer', 'сделать', '做', 'صنع'],
'histoire': ['story', 'cuento', 'história', 'сказка', '故事', 'قصة'],
'lampe': ['lamp', 'linterna', 'lanterna', 'фонарик', '手电', 'مصباح'],
'torche': ['torch', 'linterna', 'lanterna', 'фонарик', '手电筒', 'كشاف'],
'écouter': ['listen', 'escuchar', 'ouvir', 'слушать', '听', 'استماع'],
'eau': ['water', 'agua', 'água', 'вода', '水', 'ماء'],
'carton': ['cardboard', 'cartón', 'cartão', 'картон', '纸板', 'كرتون'],
'dessiner': ['draw', 'dibujar', 'desenhar', 'нарисовать', '画', 'رسم'],
'animaux': ['animals', 'animales', 'animais', 'животные', '动物', 'حيوانات'],
'animal': ['animal', 'animal', 'animal', 'животное', '动物', 'حيوان'],
'jardin': ['garden', 'jardín', 'jardim', 'сад', '花园', 'حديقة'],
'pâte': ['dough', 'masa', 'massa', 'тесто', '面团', 'عجينة'],
'nature': ['nature', 'naturaleza', 'natureza', 'природа', '大自然', 'طبيعة'],
'objets': ['objects', 'objetos', 'objetos', 'предметы', '物品', 'أشياء'],
'audio': ['audio', 'audio', 'áudio', 'аудио', '有声', 'صوتية'],
'bouteille': ['bottle', 'botella', 'garrafa', 'бутылка', '瓶子', 'زجاجة'],
'pliage': ['folding', 'plegado', 'dobragem', 'складывание', '折纸', 'طي'],
'mini': ['mini', 'mini', 'mini', 'мини', '迷你', 'صغير'],
'mains': ['hands', 'manos', 'mãos', 'руки', '手', 'أيدي'],
'mur': ['wall', 'pared', 'parede', 'стена', '墙', 'جدار'],
'lettre': ['letter', 'letra', 'letra', 'буква', '字母', 'حرف'],
'décorée': ['decorated', 'decorada', 'decorada', 'украшенная', '装饰', 'مزينة'],
'boîtes': ['boxes', 'cajas', 'caixas', 'коробки', '盒子', 'علب'],
'boîte': ['box', 'caja', 'caixa', 'коробка', '盒子', 'علبة'],
'verre': ['glass', 'vaso', 'copo', 'стакан', '杯子', 'كوب'],
'halloween': ['halloween', 'halloween', 'halloween', 'хэллоуин', '万圣节', 'هالوين'],
'chocolat': ['chocolate', 'chocolate', 'chocolate', 'шоколад', '巧克力', 'شوكولاتة'],
'fruits': ['fruit', 'frutas', 'fruta', 'фрукты', '水果', 'فواكه'],
'bocal': ['jar', 'tarro', 'frasco', 'банка', '玻璃罐', 'برطمان'],
'chasse': ['hunt', 'búsqueda', 'caça', 'охота', '寻宝', 'بحث'],
'ballon': ['balloon', 'globo', 'balão', 'шарик', '气球', 'بالون'],
'balle': ['ball', 'pelota', 'bola', 'мяч', '球', 'كرة'],
'énigmes': ['puzzles', 'enigmas', 'enigmas', 'загадки', '谜题', 'ألغاز'],
'deviner': ['guess', 'adivinar', 'adivinhar', 'угадать', '猜', 'تخمين'],
'mots': ['words', 'palabras', 'palavras', 'слова', '词语', 'كلمات'],
'coussins': ['cushions', 'cojines', 'almofadas', 'подушки', '靠垫', 'وسائد'],
'téléphone': ['phone', 'teléfono', 'telefone', 'телефон', '电话', 'هاتف'],
'film': ['movie', 'película', 'filme', 'фильм', '电影', 'فيلم'],
'dehors': ['outdoor', 'al aire libre', 'ao ar livre', 'на улице', '户外', 'في الخارج'],
'découpage': ['cutting', 'recortables', 'recorte', 'вырезание', '剪纸', 'قص'],
'collage': ['collage', 'collage', 'colagem', 'аппликация', '拼贴', 'كولاج'],
'feuille': ['sheet', 'hoja', 'folha', 'лист', '纸', 'ورقة'],
'feuilles': ['leaves', 'hojas', 'folhas', 'листья', '树叶', 'أوراق'],
'fleurs': ['flowers', 'flores', 'flores', 'цветы', '花', 'زهور'],
'maquette': ['model', 'maqueta', 'maqueta', 'макет', '模型', 'مجسم'],
'tampons': ['stamps', 'sellos', 'carimbos', 'штампы', '印章', 'أختام'],
'colle': ['glue', 'pegamento', 'cola', 'клей', '胶水', 'غراء'],
'arc-en-ciel': ['rainbow', 'arcoíris', 'arco-íris', 'радуга', '彩虹', 'قوس قزح'],
'bulles': ['bubbles', 'burbujas', 'bolhas', 'мыльные пузыри', '泡泡', 'فقاعات'],
'tableau': ['board', 'pizarra', 'quadro', 'доска', '画板', 'لوحة'],
'craie': ['chalk', 'tiza', 'giz', 'мел', '粉笔', 'طباشير'],
'salon': ['living room', 'salón', 'sala', 'гостиная', '客厅', 'غرفة الجلوس'],
'livres': ['books', 'libros', 'livros', 'книги', '书', 'كتب'],
'gobelets': ['cups', 'vasos', 'copos', 'стаканчики', '纸杯', 'أكواب'],
'chronomètre': ['timer', 'cronómetro', 'cronómetro', 'секундомер', '计时', 'مؤقت'],
'bouchons': ['bottle caps', 'tapones', 'tampas', 'крышки', '瓶盖', 'أغطية'],
'volcan': ['volcano', 'volcán', 'vulcão', 'вулкан', '火山', 'بركان'],
'éruption': ['eruption', 'erupción', 'erupção', 'извержение', '喷发', 'ثوران'],
'plastique': ['plastic', 'plástico', 'plástico', 'пластик', '塑料', 'بلاستيك'],
'pot': ['pot', 'bote', 'pote', 'горшок', '罐子', 'وعاء'],
'couleurs': ['colours', 'colores', 'cores', 'цвета', '颜色', 'ألوان'],
'pop-corn': ['popcorn', 'palomitas', 'pipocas', 'попкорн', '爆米花', 'فشار'],
'observer': ['observe', 'observar', 'observar', 'наблюдать', '观察', 'مراقبة'],
'bicarbonate': ['baking soda', 'bicarbonato', 'bicarbonato', 'сода', '小苏打', 'بيكربونات'],
'journal': ['newspaper', 'periódico', 'jornal', 'газета', '报纸', 'جريدة'],
'bateau': ['boat', 'barco', 'barco', 'кораблик', '船', 'قارب'],
'cuisine': ['cooking', 'cocina', 'cozinha', 'кулинария', '烹饪', 'طبخ'],
'deux': ['two', 'dos', 'dois', 'два', '两个', 'اثنان'],
'plié': ['folded', 'plegado', 'dobrado', 'сложенный', '折叠', 'مطوي'],
'accordéon': ['accordion', 'acordeón', 'acordeão', 'гармошка', '手风琴', 'أكورديون'],
'activité': ['activity', 'actividad', 'atividade', 'занятие', '活动', 'نشاط'],
'enfants': ['kids', 'niños', 'crianças', 'дети', '儿童', 'أطفال'],
'enfant': ['kid', 'niño', 'criança', 'ребёнок', '孩子', 'طفل'],
'anniversaire': ['birthday', 'cumpleaños', 'aniversário', 'день рождения', '生日', 'عيد ميلاد'],
'idées': ['ideas', 'ideas', 'ideias', 'идеи', '点子', 'أفكار'],
'idée': ['idea', 'idea', 'ideia', 'идея', '点子', 'فكرة'],
'thème': ['theme', 'temática', 'tema', 'тема', '主题', 'موضوع'],
'déco': ['decor', 'decoración', 'decoração', 'декор', '装饰', 'ديكور'],
'décoration': ['decoration', 'decoración', 'decoração', 'украшение', '装饰', 'زينة'],
'astuces': ['tips', 'trucos', 'dicas', 'лайфхаки', '妙招', 'نصائح'],
'astuce': ['hack', 'truco', 'dica', 'лайфхак', '妙招', 'حيلة'],
'maman': ['mom', 'mamá', 'mãe', 'мама', '妈妈', 'أم'],
'papa': ['dad', 'papá', 'pai', 'папа', '爸爸', 'أب'],
'bébé': ['baby', 'bebé', 'bebé', 'малыш', '宝宝', 'رضيع'],
'jouets': ['toys', 'juguetes', 'brinquedos', 'игрушки', '玩具', 'ألعاب'],
'maison': ['homemade', 'casero', 'caseiro', 'дома', '在家', 'منزلي'],
'comptines': ['nursery rhymes', 'canciones infantiles', 'canções infantis', 'детские песенки', '儿歌', 'أناشيد أطفال'],
'danse': ['dance', 'baile', 'dança', 'танец', '舞蹈', 'رقص'],
'bouger': ['move', 'moverse', 'mexer', 'двигаться', '动起来', 'حركة'],
'courses': ['grocery shopping', 'compra', 'compras', 'покупки', '买菜', 'التسوق'],
'famille': ['family', 'familia', 'família', 'семья', '家庭', 'عائلة'],
'semaine': ['week', 'semana', 'semana', 'неделя', '一周', 'أسبوع'],
'menu': ['meal plan', 'menú', 'menu', 'меню', '菜单', 'قائمة طعام'],
'budget': ['budget', 'presupuesto', 'orçamento', 'бюджет', '预算', 'ميزانية'],
'noël': ['christmas', 'navidad', 'natal', 'новый год', '圣诞', 'عيد الميلاد'],
'diy': ['diy', 'manualidades', 'diy', 'своими руками', '手工', 'اصنعيها بنفسك'],
'défi': ['challenge', 'reto', 'desafio', 'челлендж', '挑战', 'تحدي'],
'trend': ['trend', 'tendencia', 'tendência', 'тренд', '热门', 'ترند'],
'phrases': ['things', 'frases', 'frases', 'фразы', '话', 'عبارات'],
'drôles': ['funny', 'graciosas', 'engraçadas', 'смешные', '搞笑', 'مضحكة'],
'drôle': ['funny', 'gracioso', 'engraçado', 'смешно', '搞笑', 'مضحك'],
'bêtises': ['mischief', 'travesuras', 'travessuras', 'шалости', '调皮', 'شقاوة'],
'réaction': ['reaction', 'reacción', 'reação', 'реакция', '反应', 'ردة فعل'],
'enlever': ['remove', 'quitar', 'tirar', 'вывести', '去除', 'إزالة'],
'tache': ['stain', 'mancha', 'nódoa', 'пятно', '污渍', 'بقعة'],
'vêtement': ['clothes', 'ropa', 'roupa', 'одежда', '衣服', 'ملابس'],
'expérience': ['experiment', 'experimento', 'experiência', 'опыт', '实验', 'تجربة'],
'facile': ['easy', 'fácil', 'fácil', 'легко', '简单', 'سهل'],
'légumes': ['vegetables', 'verduras', 'legumes', 'овощи', '蔬菜', 'خضار'],
'recette': ['recipe', 'receta', 'receita', 'рецепт', '食谱', 'وصفة'],
'goûter': ['snack', 'merienda', 'lanche', 'полдник', '点心', 'وجبة خفيفة'],
'gâteau': ['cake', 'pastel', 'bolo', 'торт', '蛋糕', 'كعكة'],
'gâteaux': ['cakes', 'pasteles', 'bolos', 'торты', '蛋糕', 'كعك'],
'cadeaux': ['gifts', 'regalos', 'presentes', 'подарки', '礼物', 'هدايا'],
'cadeau': ['gift', 'regalo', 'presente', 'подарок', '礼物', 'هدية'],
'jeux': ['games', 'juegos', 'jogos', 'игры', '游戏', 'ألعاب'],
'quotidien': ['daily life', 'día a día', 'dia a dia', 'будни', '日常', 'يوميات'],
'compilation': ['compilation', 'recopilación', 'compilação', 'подборка', '合集', 'تجميعة'],
'solo': ['single', 'soltera', 'solteira', 'одиночка', '单亲', 'عزباء'],
'ménage': ['cleaning', 'limpieza', 'limpeza', 'уборка', '打扫', 'تنظيف'],
'rapide': ['quick', 'rápido', 'rápido', 'быстро', '快速', 'سريع'],
'garde': ['babysits', 'cuida', 'cuida', 'сидит с', '带', 'يعتني'],
'ranger': ['tidy', 'ordenar', 'arrumar', 'убрать', '整理', 'ترتيب'],
'rangement': ['organising', 'organización', 'arrumação', 'хранение', '收纳', 'ترتيب'],
'chambre': ['bedroom', 'habitación', 'quarto', 'комната', '房间', 'غرفة'],
'soir': ['dinner', 'cena', 'jantar', 'ужин', '晚餐', 'عشاء'],
'école': ['school', 'colegio', 'escola', 'школа', '上学', 'مدرسة'],
'sketch': ['sketch', 'sketch', 'sketch', 'скетч', '小品', 'سكتش'],
'humour': ['humor', 'humor', 'humor', 'юмор', '幽默', 'فكاهة'],
'tutoriel': ['tutorial', 'tutorial', 'tutorial', 'урок', '教程', 'شرح'],
'bricolage': ['craft', 'manualidades', 'trabalhos manuais', 'поделки', '手工', 'أشغال يدوية'],
'papier': ['paper', 'papel', 'papel', 'бумага', '纸', 'ورق'],
'dessin': ['drawing', 'dibujo', 'desenho', 'рисунок', '画画', 'رسم'],
'peinture': ['painting', 'pintura', 'pintura', 'рисование красками', '绘画', 'تلوين'],
'origami': ['origami', 'origami', 'origami', 'оригами', '折纸', 'أوريغامي'],
'création': ['craft', 'creación', 'criação', 'творчество', '创作', 'إبداع'],
'argile': ['clay', 'arcilla', 'argila', 'глина', '黏土', 'صلصال'],
'modelage': ['modelling', 'modelado', 'modelagem', 'лепка', '捏塑', 'تشكيل'],
'sortie': ['outing', 'salida', 'passeio', 'прогулка', '出游', 'نزهة'],
'voyage': ['travel', 'viaje', 'viagem', 'путешествие', '旅行', 'سفر'],
'économies': ['saving money', 'ahorro', 'poupança', 'экономия', '省钱', 'توفير'],
'pyjama': ['pyjama', 'pijama', 'pijama', 'пижама', '睡衣', 'بيجامة'],
'soirée': ['party', 'fiesta', 'festa', 'вечеринка', '派对', 'سهرة'],
'images': ['pictures', 'imágenes', 'imagens', 'картинки', '图片', 'صور'],
'vidéo': ['video', 'vídeo', 'vídeo', 'видео', '视频', 'فيديو'],
};
const STOP = { s: 1, dans: 1, par: 1, ou: 1, fait: 1, de: 1, du: 1, des: 1, la: 1, le: 1, les: 1, l: 1, 'à': 1, avec: 1, et: 1, une: 1, un: 1, ses: 1, pour: 1, que: 1, qui: 1, dit: 1, en: 1, au: 1, sur: 1, d: 1 };
const TAGW = { activiteenfants: 'activité enfants', activitemanuelle: 'activité manuelle', anniversaireenfant: 'anniversaire enfant', astucemaman: 'astuces maman', astucemenage: 'astuce ménage', betisesdenfants: 'bêtises enfants', blackfriday: 'black friday', calendrierdelavent: 'calendrier de l avent', comptines: 'comptines', courses: 'courses', defifamille: 'défi famille', economies: 'économies', enfantdrole: 'enfant drôle', experienceenfants: 'expérience enfants', famillenombreuse: 'famille nombreuse', gateaufacile: 'gâteau facile', gouter: 'goûter', humourmaman: 'humour maman', ideecadeau: 'idée cadeau', jeuxenfamille: 'jeux en famille', journeedemaman: 'quotidien maman', legumesenfants: 'légumes enfants', lunchbox: 'lunch box', lutinfarceur: 'lutin farceur', mamanbebe: 'maman bébé', mamandequartier: 'maman de quartier', mamandrole: 'maman drôle', mamansolo: 'maman solo', menagerapide: 'ménage rapide', momlife: 'maman quotidien', noeldiy: 'noël diy', papaetenfants: 'papa enfants', platmijote: 'plat mijoté', rangement: 'rangement', recettenoel: 'recette noël', recetterapide: 'recette rapide', routinematin: 'routine du matin', soireepyjama: 'soirée pyjama', sortiedecole: 'école', sortieenfants: 'sortie enfants', viedemaman: 'quotidien maman', voyageenfants: 'voyage enfants' };
const VKEYS = Object.keys(VW).sort((a, b) => b.length - a.length);
function trWords(q) {
  let s = ' ' + q.toLowerCase().replace(/[’']/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  const out = [];
  while (s.trim()) {
    s = s.replace(/^\s+/, ' ');
    const k = VKEYS.find(k => s.startsWith(' ' + k + ' '));
    if (k) { out.push(VW[k][COL]); s = s.slice(k.length + 1); continue; }
    const m = s.match(/^ (\S+)/); if (!m) break;
    if (!STOP[m[1]]) out.push(m[1]);
    s = s.slice(m[0].length);
  }
  return out.join(' ');
}
const strip = (t) => (t || '').replace(/^(le|la|les|l['’])\s*/i, '').trim();
function locQ(q, el) {
  let title = '', vis = '';
  const box = el && el.closest && el.closest('.act, .film, .card, .sheet, #sheet');
  const hs = box ? [...box.querySelectorAll('h3, h4, b')] : [];
  for (const h of hs) { const fr = h.dataset.fr; if (fr && fr.length > 2) { const f = q.includes(fr) ? fr : (q.includes(strip(fr)) ? strip(fr) : ''); if (f) { title = f; vis = h.textContent.trim(); break; } } }
  if (title) { const i = q.indexOf(title); return (trWords(q.slice(0, i)) + ' ' + vis + ' ' + trWords(q.slice(i + title.length))).replace(/\s+/g, ' ').trim(); }
  return trWords(q);
}
const HL = ['en', 'es', 'pt-PT', 'ru', 'zh-CN', 'ar'][COL];
function rw(url, el) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('intent://')) {
    const fb = url.match(/S\.browser_fallback_url=([^;]+)/), pk = url.match(/package=([^;]+)/);
    if (!fb || !pk) return url; const web = rw(decodeURIComponent(fb[1]), el);
    return 'intent://' + web.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=' + pk[1] + ';S.browser_fallback_url=' + encodeURIComponent(web) + ';end';
  }
  let u; try { u = new URL(url); } catch (e) { return url; }
  const h = u.hostname;
  if (/youtube\.com$/.test(h) && u.searchParams.get('search_query')) { u.searchParams.set('search_query', locQ(u.searchParams.get('search_query'), el)); u.searchParams.set('hl', HL); return u.href; }
  if (/google\./.test(h) && u.pathname === '/search' && u.searchParams.get('q')) { u.searchParams.set('q', locQ(u.searchParams.get('q'), el)); u.searchParams.set('hl', HL); return u.href; }
  if (/tiktok\.com$/.test(h)) {
    if (u.pathname === '/search' && u.searchParams.get('q')) { u.searchParams.set('q', locQ(u.searchParams.get('q'), el)); return u.href; }
    const t = u.pathname.match(/^\/tag\/([^/]+)/); if (t) { const w = TAGW[decodeURIComponent(t[1])]; if (w) return 'https://www.tiktok.com/search?q=' + encodeURIComponent(trWords(w)); }
  }
  if (/instagram\.com$/.test(h)) {
    const t = u.pathname.match(/^\/explore\/tags\/([^/]+)/); if (t) { const w = TAGW[decodeURIComponent(t[1])]; if (w) return 'https://www.instagram.com/explore/tags/' + encodeURIComponent(trWords(w).replace(/[\s\-']+/g, '').toLowerCase()) + '/'; }
  }
  return url;
}
document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('a[href]'); if (!a) return; const n = rw(a.href, a); if (n && n !== a.href) a.href = n; }, true);
const wo = window.open; window.open = function (u, ...r) { return wo.call(window, rw(u, document.activeElement), ...r); };
window.MAMS_RW = rw;
})();
