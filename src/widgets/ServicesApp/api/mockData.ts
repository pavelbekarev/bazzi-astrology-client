import chineseBook from "#assets/chineseBook.jpg";
import flowerImage from "#assets/flowerImage.jpg";
import forecast from "#assets/forecast.jpg";
import goldenDragon from "#assets/gold_dragon.jpg";
import health2 from "#assets/health2.jpg";
import imageLove from "#assets/imageLove.jpg";
import loveTree from "#assets/love_tree.jpg";
import newYear from "#assets/newYear.jpg";
import pinkFlowers from "#assets/pinkFlowers.jpg";
import pinkSea from "#assets/pinkSea.jpg";
import { ServiceData } from "#shared/utils/types/ServiceDataType";

export const services: ServiceData[] = [
  {
    name: "Индивидуальный видеоразбор",
    shortDescription:
      "Для тех, кто хочет узнать о себе всё в тончайших подробностях ",
    description: "",
    description_points: [
      "Эта услуга позволяет полноценно изучить вашу карту Бацзы и узнать все детали вашей личности и основных аспектов",
      "Анализ возможностей;",
      "Консультация дает полное понимание себя и ответы на самые глубоковолнующие вопросы",
    ],
    descriptionAfter:
      "Вам нужна такая консультация, если вы хотите узнать о себе всё, достать нераскрытые таланты, научиться применять свои сильные и слабые стороны, выйти из депрессии и прокрастинирующего состояния, познать себя и начать получать удовольствие от жизни",
    imagePath: forecast,
    format: "видео на 60-90 мин",
    price: "6000 ₽",
  },
  {
    name: "Индивидуальная очная консультация",
    shortDescription:
      "Для тех, кто хочет задать все интересующие вопросы напрямую",
    description: "",
    description_points: [
      "Услуга включает в себя детальное изучение Вашей бацзы-карты, охватывая важнейшие аспекты жизни, что способствует глубокому самоосознанию и получению ответов на интересующие вопросы",
      "Карта разбирается индивидуально, предоставляя возможность задавать вопросы непосредственно и получать сильный энергетический импульс с внутренним раскрытием.",
    ],
    descriptionAfter: "",
    imagePath: goldenDragon,
    format: "личная встреча на 120 минут",
    price: "13000 ₽",
  },
  {
    name: "Консультация по совместимости",
    shortDescription:
      "Эта услуга представляет собой консультацию по отношениям и совместимости",
    description: "",
    description_points: [
      "Такая консультация нужна: Если ваша цель — построить прочные, гармоничные, здоровые отношения, основанные на принципах экологичности и не опирающиеся на общественные стандарты, нормы и обычаи.",
      "Такая консультация не нужна: Если вы переполнены страстью и ваши отношения итак кажутся вам совершенными.",
    ],
    descriptionAfter: "",
    imagePath: health2,
    format: "видео на 60-90 мин",
    price: "8600 ₽",
  },
  {
    name: "Разбор карты ребенка",
    shortDescription:
      "Эта услуга предполагает всесторонний анализ карты Бацзы вашего малыша",
    description:
      "Он охватывает важнейшие аспекты жизни и раскрывает способности, позволяя вам глубже понять своего ребенка.",
    description_points: [
      "Открытие потенциала вашего ребенка и методы его бережного развития",
      "Советы по организации режима дня, питанию и заботе о малыше",
      "Разъяснение возможных трудностей со здоровьем и пути их предотвращения или коррекции",
      "Понимание внутреннего мира ребенка для гармоничного общения с ним",
      "Определение талантов, которые стоит развивать, и тех, на что не следует тратить усилия впустую",
      "Корректировка негативных аспектов карты бацзы",
      "Выявление вероятных жизненных ситуаций",
      "Помощь в выборе профессии и направлений для обучения (учебное заведение, специальность, кружки, секции, спорт)",
      "Такой анализ будет полезен: если вы стремитесь лучше понять своего ребенка и создать все условия для его счастливого будущего, ведь дети - наша главная радость!",
    ],
    descriptionAfter: "",
    imagePath: imageLove,
    format: "видео на 60-90 мин",
    price: "6000 ₽",
  },
  {
    name: "Разбор одной сферы",
    shortDescription: `Данная услуга предлагает всесторонний анализ по выбранной вами тематике`,
    description:
      "Ключевым моментом является чёткость запроса – вы указываете конкретную цель и проблематику, над которой мы будем работать.",
    description_points: [
      "Любовь: вероятность замужества/женитьбы, встреча с партнером, его описание и т.д.",
      "Помощь в учебе: как помочь своему ребёнку учиться лучше, как в целом пройдёт новый учебный год, фен-шуй советы, отношения с одноклассниками, на какие предметы обратить внимание и заняться ими более углубленно",
      "Здоровье и самочувствие: выявление проблем со здоровьем, методы устранения негативных факторов, практические рекомендации для улучшения жизненной энергии и состояния здоровья, предостережение от рисков в сложные периоды, поддержание высокого уровня энергии, правильный подход к лечению без вреда для себя, восстановление энергетического баланса, устранение блоков, профилактика обострений заболеваний, знание о слабых и сильных сторонах вашего организма, предрасположенность к определённым болезням",
      "Другие области по вашему желанию",
    ],
    descriptionAfter:
      "Такая консультация необходима: если вы стремитесь детально разобраться в интересующей вас сфере.",
    imagePath: loveTree,
    format: "аудио/голосовые сообщения в чате",
    price: "3000 ₽",
  },
  {
    name: "Консультация по профессиональной реализации",
    shortDescription: `Для тех, кто желает быстрее и качественнее достигнуть профессионального роста. `,
    description:
      "Эта услуга предполагает разбор вашей карты бацзы на предмет карьеры и продвижения. Консультация позволит понять, можно ли вам идти в бизнес, каким направлением лучше заниматься, в какое время нужно быть осторожным и не идти на риски.",
    description_points: [
      "Анализируем профессиональную деятельность.",
      "Определение подходящих отраслей для работы",
      "Возможность создания собственного дела или предпочтительнее трудоустройство",
      "Лучшее время для начала бизнеса или смены места работы",
      "Ситуации, когда рисковать не стоит",
      "Определение природных способностей",
      "Выявление скрытых талантов",
      "Способы увеличения дохода",
      "Реализация личных возможностей для достижения успеха",
      "Каналы продвижения (сарафанное радио, маркетинговые кампании и т.д.)",
      "Цветовая гамма в оформлении бизнеса (соцсети, сайт, реклама)",
      "Определение жизненного пути",
      "Выбор наиболее перспективных отраслей для достижения успеха и заработка",
      "Стратегия партнерства в бизнесе",
      "Необходимость партнера, его характеристики и временные рамки",
      "Пути продвижения по карьерной лестнице",
      "Эффективное общение с коллегами, руководством и подчиненными",
      "Выбор удачных дат для подачи резюме, увольнения, подписания документов.",
    ],
    descriptionAfter:
      "Такая консультация нужна, если вы хотите найти свое место в жизни и заниматься любимым делом, которое будет являться вашим высокооплачиваемым хобби",
    imagePath: chineseBook,
    format: "видео на 60-90 мин",
    price: "8000 ₽",
  },
  {
    name: "Прогноз на год",
    shortDescription: `Узнай главные темы этого года `,
    description:
      "Эта услуга представляет собой разбор главных тем этого года, на что стоит обратить внимание, как подготовиться к ним и что следует предпринять.",
    description_points: [
      "Определение текущих задач, актуальных направлений и перспектив на текущий год",
      "Анализ возможностей",
      "Рассмотрение перспектив в отношениях, перспективы создания семьи",
      "Здоровье: на что обратить внимание, как укрепить здоровье",
      "Рекомендации как эффективно прожить год",
    ],
    descriptionAfter:
      "Такая консультация нужна, если вы хотите выстроить стратегию на год и заранее узнать его тенденции",
    imagePath: newYear,
    format: "текстовый файл / аудиоформат",
    price: "6000 ₽",
  },
  {
    name: "Денежная удача",
    shortDescription: `Действия по привлечению финансов и увеличения вашего дохода `,
    description:
      "Консультация представляет набор действий по вашей карте бацзы, которые будут стимулировать денежные потоки и увеличивать вашу финансовую удачу.",
    description_points: [
      "Ключевые сферы, в которых Вы можете преуспеть и получить наибольшую прибыль",
      "Действия для привлечения денежной удачи и советы как привлечь финансы по Вашей личной карте",
      "Ваше отношение к деньгам",
      "Кризисные моменты",
      "Инвестиции",
    ],
    descriptionAfter:
      "Такая консультация нужна, если вы хотите улучшить свое финансовое положение",
    imagePath: flowerImage,
    format: "текстовый файл / видео",
    price: "3830 ₽",
  },
  {
    name: "Раскачай себя",
    shortDescription: `Получи конкретные энергетические действия для наилучшего самочувствия `,
    description:
      "Энергетические действия — это индивидуальные действия, выполнение которых способствует привлечению удачи, сил и энергии..",
    description_points: [
      "Энергетические действия нужны Вам, если вы чувствуете упадок сил, апатию, нежелание действовать",
      "Ознакомившись с энергетическими действиями, Вы можете заметить, что некоторые из них Вы уже реализуете в своей жизни, что говорит о том, что Вы уже интуитивно почувствовали необходимость в восполнении той или иной энергии.",
    ],
    descriptionAfter:
      "Выполнение энергетических действий требует ответственности. Внедрять действия в жизнь можно по 1−2 пункта из списка.",
    imagePath: pinkFlowers,
    format: "текстовый файл",
    price: "3000 ₽",
  },
  {
    name: "Бацзы ответ",
    shortDescription: `Задай любой вопрос и получи метафизический ответ `,
    description:
      "Услуга по представлению ответа на один любой вопрос, который может касаться:",
    description_points: [
      "любви или личных отношений",
      "финансов или карьеры",
      "здоровья",
      "и другие сферы",
    ],
    descriptionAfter: "",
    imagePath: pinkSea,
    format: "текст или аудио-голосовые",
    price: "1300 ₽",
  },
  {
    name: "Раскачай себя",
    shortDescription: `Получи конкретные энергетические действия для наилучшего самочувствия `,
    description:
      "Энергетические действия — это индивидуальные действия, выполнение которых способствует привлечению удачи, сил и энергии..",
    description_points: [
      "Энергетические действия нужны Вам, если вы чувствуете упадок сил, апатию, нежелание действовать",
      "Ознакомившись с энергетическими действиями, Вы можете заметить, что некоторые из них Вы уже реализуете в своей жизни, что говорит о том, что Вы уже интуитивно почувствовали необходимость в восполнении той или иной энергии.",
    ],
    descriptionAfter:
      "Выполнение энергетических действий требует ответственности. Внедрять действия в жизнь можно по 1−2 пункта из списка.",
    imagePath: pinkFlowers,
    format: "текстовый файл",
    price: "3000 ₽",
  },
  {
    name: "Бацзы ответ",
    shortDescription: `Задай любой вопрос и получи метафизический ответ `,
    description:
      "Услуга по представлению ответа на один любой вопрос, который может касаться:",
    description_points: [
      "любви или личных отношений",
      "финансов или карьеры",
      "здоровья",
      "и другие сферы",
    ],
    descriptionAfter: "",
    imagePath: pinkSea,
    format: "текст или аудио-голосовые",
    price: "1300 ₽",
  },
];
