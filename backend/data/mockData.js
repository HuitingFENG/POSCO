const countryEmissions = [
    {id: 1, code:"stokeontrent", location:"Stoke-on-Trent, Angleterre", Train: 4.4, Bus: 22, Avion: 129, Voiture:159},
    {id: 2, code:"pologne", location:"Cravovie, Pologne", Train: 10, Bus: 46, Avion: 229, Voiture: 338 },
    {id: 3, code:"hongrie", location:"Budapest, Hongrie", Train: 10, Bus: 44, Avion: 224, Voiture: 326 },
    {id: 4, code:"tcheque", location:"Ostrava, République Tchèque", Train: 8, Bus: 41, Avion: 207, Voiture: 306 },
    {id: 5, code:"montreal", location:"Montréal, Canada", Train: 0, Bus: 0, Avion: 835, Voiture: 0 },
    {id: 6, code:"malaisie", location:"Kuala Lumpur, Malaisie", Train: 0, Bus: 0, Avion: 1581, Voiture: 0 },
    {id: 7, code:"afrique", location:"Le Cap, Afrique du Sud", Train: 0, Bus: 0, Avion: 2767, Voiture: 0 },
    {id: 8, code:"toronto", location:"Toronto, Canada", Train: 0, Bus: 0, Avion: 910, Voiture: 0 },
    {id: 9, code:"etatsunis", location:"Irvine, Etats-Unis", Train: 0, Bus: 0, Avion: 1380, Voiture: 0 },
    {id: 10, code:"portsmouth", location:"Portsmouth, Angleterre", Train: 3.7, Bus: 17, Avion: 76, Voiture: 122 },
    {id: 11, code:"tallinn", location:"Tallinn, Estonie", Train: 16, Bus: 75, Avion: 332, Voiture: 557 },
    {id: 12, code:"vilnius", location:"Vilnius, Lituanie", Train: 13, Bus: 62, Avion: 303, Voiture: 456 },
    {id: 13, code:"espagne", location:"Malaga, Espagne", Train: 11, Bus: 53, Avion: 260, Voiture: 391 }, 
    {id: 14, code:"autres", location:"Autres", Train: 0.0294, Bus: 0.11, Avion: 0.215, Voiture: 0.125 }, // emission carbon par km en fonction de mode de transport
];

const locationOptions = countryEmissions.map(item => item.location);
const responsesList = [];

/* const usersList = [
    { userId: 0, name: "admin", email: "admin@efrei.fr", password: "admin" },
    { userId: 1, name: "student1", email: "student1@efrei.net", password: "student1" },
    { userId: 2, name: "student2", email: "student2@efrei.net", password: "student2" },
    { userId: 3, name: "student3", email: "student3@efrei.net", password: "student3" },
]; */

const usersList = [
    { id: 1, userId: 1, name: "admin", email: "admin@efrei.fr", password: "$2b$10$KEQLNT4TB3BFTj2m/m5YX.B2iCo6Lk1ZEB5ItS4e7y9eGLXSYP7Tu" },
    { id: 2, userId: 2, name: "student1", email: "student1@efrei.net", password: "$2b$10$gMKcu98m.DWj0cF6SwB5NeuD2Jwzh3juZpX2pfLW0oFbOuebLhBtW" },
    { id: 3, userId: 3, name: "student2", email: "student2@efrei.net", password: "$2b$10$MPe3hsguE4U9YF79h8SAEOpVNXqfkv7lRuDKE.fn0mFCtjZ0.YQb6" },
    { id: 4, userId: 4, name: "student3", email: "student3@efrei.net", password: "$2b$10$PsqQFN9ATlQ6FIPp3oMvIeAUhhg23hPyLTS55eoQeCixtz6RZvaiC" },
];

const emissionsList = [];

// https://nosgestesclimat.fr/documentation/alimentation/plats/viande-1 
/*
Empreinte carbone par type de transport : 
Avion : 215g de CO2 par km parcouru 
Voiture : 125g par km par passager 
TGV : 2.4g CO2 par km 
Train normal : 29.4g par km 
Bus : 110g par km
Viande : Empreinte carbone pour 100g de protéines  
Poulet : 5700g de CO2 
Porc : 7600g de CO2 
Volaille : 5700g de CO2 
Boeuf : 49900g de CO2 
*/
/* Nombre de voyage maison-efrei :  
Pour un an : 40 semaines de cours x 4 jours de présentiel x (aller+retour) → 40 x 7 x 4 x2 = 2440 
 */

const consummationEmissions = [
    {consummationId: 1, category: 1, name: "Avion", number: 0.215}, // category: 1 => transport  category: 2 => food
    {consummationId: 2, category: 1, name: "Voiture", number: 0.125},  
    {consummationId: 3, category: 1, name: "TGV", number: 0.0024},
    {consummationId: 4, category: 1, name: "Train", number: 0.0294},
    {consummationId: 5, category: 1, name: "Bus", number: 0.11},
    {consummationId: 6, category: 1, name: "A pied", number: 0},
    {consummationId: 7, category: 2, name: "Poulet", number: 2.1},
    {consummationId: 8, category: 2, name: "Porc", number: 2.1}, // poulet / porc : 2.1 kg CO2e / 1 repas
    {consummationId: 9, category: 2, name: "Agneau", number: 5.51}, // boeuf / veau / agneau : 5.51 kg CO2e / 1 repas 
    {consummationId: 10, category: 2, name: "Boeuf", number: 5.51},
    {consummationId: 11, category: 2, name: "Veau", number: 5.51}, 
]

const viandeOptions = consummationEmissions
    .filter(item => item.category === 2)
    .map(item => item.name);

const transportOptionsWithoutAvion = consummationEmissions
    .filter(item => item.category === 1 && item.name !== "Avion")
    .map(item => item.name);

const transportOptionsWithoutTDVApied = consummationEmissions
    .filter(item => item.category === 1 && item.name !== "TGV" && item.name !== "A pied")
    .map(item => item.name);


// const transportOptionsFromImpactCO2 = [
//     {id: 1, name: "Avion (court courrier)"},
//     {"id": 2, "name: "TGV"},
//     {"id": 3, "name": "Intercités"},
//     {"id": 4,"name": "Voiture (Moteur thermique)"},
//     {"id": 5,"name": "Voiture (Moteur électrique)"},
//     {"id": 6,"name": "Autocar"},
//     {"id": 7,"name": "Vélo ou marche"},
//     {"id": 8,"name": "Vélo (ou trottinette) à assistance électrique"},
//     {"id": 9,"name": "Bus (Moteur thermique)"},
//     {"id": 10,"name": "Tramway"},
//     {"id": 11, "name": "Métro"},
//     {"id": 12,"name": "Scooter ou moto légère"},
//     {"id": 13, "name": "Moto"},
//     {"id": 14, "name": "RER ou Transilien"},
//     {"id": 15, "name": "TER"},
//     {"id": 16,"name": "Bus (Moteur électrique)"},
//     {"id": 21,"name": "Bus (GNV)"}
// ];



const transportOptionsFromImpactCO2 = [
    // { id: 1, name: "Avion (court courrier)", slug: "avioncourtcourrier" },
    { id: 2, name: "TGV", slug: "tgv" },
    { id: 3, name: "Intercités", slug: "intercites"  },
    { id: 4, name: "Voiture (Moteur thermique)", slug: "voiturethermique"  },
    { id: 5, name: "Voiture (Moteur électrique)", slug: "voitureelectrique"  },
    { id: 6, name: "Autocar", slug: "autocar"  },
    { id: 7, name: "Vélo ou marche", slug: "velo"  },
    { id: 8, name: "Vélo (ou trottinette) à assistance électrique", slug: "veloelectrique"  },
    { id: 9, name: "Bus (Moteur thermique)", slug: "busthermique"  },
    { id: 10, name: "Tramway" , slug: "tramway" },
    { id: 11, name: "Métro", slug: "metro"  },
    { id: 12, name: "Scooter ou moto légère", slug: "scooter"  },
    { id: 13, name: "Moto" , slug: "moto" },
    { id: 14, name: "RER ou Transilien" , slug: "rer" },
    { id: 15, name: "TER" , slug: "ter" },
    { id: 16, name: "Bus (Moteur électrique)", slug: "buselectrique"  },
    { id: 21, name: "Bus (GNV)" , slug: "busgnv" },
    { id: 22, name: "Avion (court courrier <= 3h)", slug: "avioncourtcourrier"  },
    { id: 23, name: "Avion (moyen courrier 3 - 6h)" , slug: "avionmoyencourrier" },
    { id: 24, name: "Avion (long courrier >= 6h)", slug: "avionlongcourrier" },
];
const transportOptionsFromImpactCO2ShortTrip = transportOptionsFromImpactCO2.filter(option => 
    option.slug !== "avioncourtcourrier" && 
    option.slug !== "avionmoyencourrier" && 
    option.slug !== "avionlongcourrier").map(item => item.name);
const transportOptionsFromImpactCO2LongTrip = transportOptionsFromImpactCO2.filter(option => 
    option.slug === "avioncourtcourrier" || option.slug === "voiturethermique" ||
    option.slug === "avionmoyencourrier" || option.slug === "voitureelectrique" ||
    option.slug === "avionlongcourrier"  || option.slug === "autocar" || 
    option.slug === "buselectrique" || option.slug === "busgnv"
    ).map(item => item.name);    
const transportOptionsFromImpactCO2LongShortTrip = transportOptionsFromImpactCO2.map(item => item.name);
// const transportOptionsWithoutAvionFromImpactCO2 = transportOptionsFromImpactCO2.filter(item => item.name !== "Avion (court courrier)").map(item => item.name);
// const transportOptionsWithoutTGVFromImpactCO2 = transportOptionsFromImpactCO2.filter(item => item.name !== "TGV").map(item => item.name);



const repasAllOptionsFromImpactCO2 = [
    {id: 1, name: "Repas avec du boeuf", slug: "repasavecduboeuf" },
    {id: 2, name: "Repas végétarien[s]", slug: "repasvegetarien" },
    {id: 3, name: "Repas végétalien[s]", slug: "repasvegetalien"},
    {id: 4, name: "Repas avec du poisson blanc", slug: "repasavecdupoissonblanc" },
    {id: 5, name: "Repas avec du poisson gras", slug: "repasavecdupoissongras" },
    {id: 6, name: "Repas avec du poulet", slug: "repasavecdupoulet"}
];
const repasOptionsFromImpactCO2 = repasAllOptionsFromImpactCO2.map(item => item.name);


// category = 1 : PGE (FISE avec SWIM, FISA) 
// category = 2 : PEx  
// const mobiliteCategory = [
//     {id: 1, category: 1, fullName: "Mobilités Programmes Ingéneurs (PGE) - FISE", name: "PGE_L3_FISE" /*  "PGE - L3 FISE" */},
//     {id: 2, category: 1, fullName: "Mobilités Programmes Ingéneurs (PGE) - FISA", name: "PGE_L3_FISA"},
//     {id: 3, category: 2, fullName: "Mobilités Programmes Experts (PEx) - Bachelor B2 ", name: "PEx_B2"},
//     {id: 4, category: 2, fullName: "Mobilités Programmes Experts (PEx) - Mission Msc M2 ", name: "PEx_M2_Msc_Cyber"},
//     {id: 5, category: 2, fullName: "Mobilités Programmes Experts (PEx) - Mission Ecosystème Digital M2 ", name: "PEx_M2_Optionnelle"},
// ]; 

const mobiliteCategory = [
    {id: 1, category: 1, name: "PGE_L1"},
    {id: 2, category: 1, name: "PGE_L2"},
    {id: 3, category: 1, name: "PGE_L3"},
    {id: 4, category: 1, name: "PGE_M1"},
    {id: 5, category: 1, name: "PGE_M2"},
    {id: 6, category: 2, name: "PEx_B1"},
    {id: 7, category: 2, name: "PEx_B2"},
    {id: 8, category: 2, name: "PEx_B3"},
    {id: 9, category: 2, name: "PEx_MS1"},
    {id: 10, category: 2, name: "PEx_MS2_Cyber"},
    {id: 11, category: 2, name: "PEx_MS2_Optionnelle"},
    {id: 12, category: 3, name: "Autres"},
];

const mobiliteCategoryNameList = mobiliteCategory.map(item => item.name);
const destinationId1 = countryEmissions.filter(item => item.id <= 9).map(item => item.location);
const destinationId2 = countryEmissions.filter(item => item.id === 6 || item.id === 8 || item.id === 10 || item.id === 11).map(item => item.location);
const destinationId3 = countryEmissions.filter(item => item.id === 10 || item.id === 12).map(item => item.location);
const destinationId4 = countryEmissions.filter(item => item.id === 13).map(item => item.location);
const destinationId5 = countryEmissions.filter(item => item.id === 14).map(item => item.location);  // Autres
const destinationOptionsList = [
    {id: 1, mobiliteCategoryId: 1, options: destinationId5},  // Les autres
    {id: 2, mobiliteCategoryId: 2, options: destinationId5},   // Les autres
    {id: 3, mobiliteCategoryId: 3, options: destinationId1},  // PGE_L3 
    {id: 4, mobiliteCategoryId: 4, options: destinationId5},   // Les autres
    {id: 5, mobiliteCategoryId: 5, options: destinationId5},  // Les autres
    {id: 6, mobiliteCategoryId: 6, options: destinationId5},   // Les autres
    {id: 7, mobiliteCategoryId: 7, options: destinationId2},  // PEx_B2
    {id: 8, mobiliteCategoryId: 8, options: destinationId5},   // Les autres
    {id: 9, mobiliteCategoryId: 9, options: destinationId5},    // Les autres
    {id: 10, mobiliteCategoryId: 10, options: destinationId3},   // PEx_MS2_cyber
    {id: 11, mobiliteCategoryId: 11, options: destinationId4},   // PEx_MS2_optionnelle
    {id: 12, mobiliteCategoryId: 12, options: destinationId5}, 
];


// category: 1 => Questions sur empreinte carbone personnelle  
// category: 2 => Questions sur la mobilité

const allQuestionsList = [
    // { id: 1, category: 1, question_text: "En quelle année êtes-vous ?", type: "text", options: mobiliteCategoryNameList },
    { id: 1, category: 1, question_text: "De quel type de mobilité s'agit-il ?", type: "text", options: mobiliteCategoryNameList },
    { id: 2, category: 1, question_text: "A quelle distance (en km) habitez-vous d\'Efrei ?", type: "number", options: [] },
    { id: 3, category: 1, question_text: "Comment vous déplacez-vous pour vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2ShortTrip},
    { id: 4, category: 1, question_text: "Quel est votre repas typique au quotidien ?" , type: "text", options: repasOptionsFromImpactCO2 },
    { id: 5, category: 1, question_text: "Combien de fois par semaine mangez-vous de ce type de repas ?", type: "number", options: []},

    // { id: 6, category: 2, question_text: "Quelle destination envisagez-vous pour la mobilité L3 ?", type: "mcq", options: locationOptions },
    { id: 6, category: 2, question_text: "Quelle destination envisagez-vous pour cette mobilité ?", type: "text", options: [] },
    // { id: 7, category: 2, question_text: "Par quels moyens comptez-vous y aller ?" , type: "text", options: transportOptionsFromImpactCO2LongTrip },
    { id: 7, category: 2, question_text: "A quelle distance (en km) entre l'école et votre choix de destination pour cette mobilité ? (Merci de sauter cette question si vous avez indiqué votre destination dans la question précédente)" , type: "number", options: []},
    { id: 8, category: 2, question_text: "Par quels moyens comptez-vous y aller ?" , type: "text", options: ["Train", "Bus", "Avion", "Voiture"] },

    { id: 9, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité ?" , type: "text", options: ["Oui", "Non"]},
    { id: 10, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 11, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongTrip },
    // { id: 10, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },

    { id: 12, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité ?" , type: "text", options: ["Oui", "Non"]},
    { id: 13, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 14, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },

    { id: 15, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité ?" , type: "text", options: ["Oui", "Non"]},
    { id: 16, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 17, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },

    { id: 18, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyagedepuis votre destination de mobilité ?" , type: "text", options: ["Oui", "Non"]},
    { id: 19, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 20, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },

    { id: 21, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité ?" , type: "text", options: ["Oui", "Non"]},
    { id: 22, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 23, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },


    { id: 24, category: 2, question_text: "Pour la destination de votre SWIM, à quelle distance (en km) de notre école ?", type: "number", options: [] },
    { id: 25, category: 2, question_text: "Par quels moyens comptez-vous y aller ?" , type: "text", options: transportOptionsFromImpactCO2LongTrip },

    { id: 26, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité (SWIM) ?" , type: "text", options: ["Oui", "Non"]},
    { id: 27, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 28, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },
    // { id: 11, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité ?" , type: "text", options: ["Oui", "Non"]},

    { id: 29, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité (SWIM) ?" , type: "text", options: ["Oui", "Non"]},
    { id: 30, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 31, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },

    { id: 32, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité (SWIM) ?" , type: "text", options: ["Oui", "Non"]},
    { id: 33, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 34, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },

    { id: 35, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyagedepuis votre destination de mobilité (SWIM) ?" , type: "text", options: ["Oui", "Non"]},
    { id: 36, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 37, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },

    { id: 38, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité (SWIM) ?" , type: "text", options: ["Oui", "Non"]},
    { id: 39, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 40, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsFromImpactCO2LongShortTrip },
];


const questionsList = allQuestionsList.filter(item => item.id >= 1 && item.id <= 11);



conseilsCategory1 = ["Privilégiez les transports en commun, le covoiturage, le vélo ou la marche", "Optez pour des véhicules économes en carburant ou électriques si possible", "Planifiez vos déplacements pour éviter les trajets inutiles"];
conseilsCategory2 = ["Utilisez des ampoules LED et éteignez les lumières lorsque vous quittez une pièce", "Éteignez les appareils électroniques et débranchez les chargeurs lorsqu'\ils ne sont pas utilisés", "Investissez dans des appareils écoénergétiques et bien notés en matière d'efficacité énergétique"];
conseilsCategory3 = ["Privilégiez les produits locaux et de saison pour réduire l\'empreinte carbone liée au transport", "Réduisez la consommation de viande et optez pour des alternatives végétariennes ou végétaliennes", "Évitez le gaspillage alimentaire en planifiant vos repas, en stockant les aliments correctement et en recyclant les déchets organiques"];
conseilsCategory4 = ["Recyclez autant que possible, y compris le papier, le plastique, le verre et le métal", "Réduisez l\'utilisation de produits à usage unique et préférez des articles réutilisables", "Compostez les déchets organiques pour réduire les émissions de méthane dans les décharges"];
conseilsCategory5 = ["Réparez les fuites d\'eau et utilisez des appareils et des systèmes économes en eau", "Collectez l\'eau de pluie pour un usage extérieur", "Adoptez des pratiques d\'arrosage économes, comme arroser tôt le matin ou tard le soir"];
conseilsCategory6 = ["Sensibilisez votre entourage aux enjeux climatiques et partagez des conseils sur la réduction de l\'empreinte carbone", "Participez à des initiatives locales de lutte contre le changement climatique"];
conseilsCategory7 = ["Soutenez des entreprises et des initiatives respectueuses de l\'environnement", "Explorez des options d'investissement socialement responsables"];
conseilsCategory8 = ["Restez informé sur les questions environnementales et les solutions durables", "Adoptez un mode de vie axé sur la durabilité et encouragez d\'autres personnes à faire de même"];


const conseilsList = [
    {id: 1, type : "Transport durable", options: conseilsCategory1},
    {id: 2, type : "Économie d\'énergie", options: conseilsCategory2},
    {id: 3, type : "Consommation responsable", options: conseilsCategory3},
    {id: 4, type : "Gestion des déchets", options: conseilsCategory4},
    {id: 5, type : "Économie d\'eau", options: conseilsCategory5},
    {id: 6, type : "Engagement communautaire", options: conseilsCategory6},
    {id: 7, type : "Investissements responsables", options: conseilsCategory7},
    {id: 8, type : "Éducation continue", options: conseilsCategory8},
];


compensationCategory1 = ["vélo d’occasion (gagner 40 kg de CO2)", "machine à laver d’occasion (gagner 160 kg de CO2)", "meubles d’occasion (gagner environ 100 kg de CO2 par meuble)", "voiture d’occasion (gagner 2.5 tonnes de CO2)", "vêtements d’occasion (gagner environ 7 kg de CO2 par vêtement)"];
compensationCategory2 = ["métal (gagner 1.625 kg de CO2)", "plastique (gagner 1.625 kg de CO2)", "papier (gagner 1.625 kg de CO2)", "verre (gagner 1.625 kg de CO2)"];
compensationCategory3 = ["LED (gagner 100 kg de CO2 par an)"];
compensationCategory4 = ["savon noir (gagner 100 kg de CO2 par an)", "vinaigre blanc (gagner 100 kg de CO2 par an)", "bicarbonate de soude (gagner 100 kg de CO2 par an)"];
compensationCategory5 = ["isoler la toiture avec de la laine de verre (gagner 1.5 tonne de CO2 par an)", " isoler les murs avec de la laine de verre (gagner 4 tonne de CO2 par an)", "remplacer les fenêtres par un double vitrage (gagner 0.5 tonne de CO2 par an)"];


const compensationsList = [
    {id: 1, type : "Acheter de l\'équipement d\'occasion", options: compensationCategory1},
    {id: 2, type : "Trier les déchets triés (par kg)", options: compensationCategory2},
    {id: 3, type : "Privilégier l\’éclairage", options: compensationCategory3},
    {id: 4, type : "Substituer les produits de nettoyage domestique par 3 produits naturels", options: compensationCategory4},
    {id: 5, type : "Améliorer l\’isolation thermique de la toiture, des murs, et des fenêtres dans sa maison", options: compensationCategory5},
];



// const maxMobiliteCarbonEmissionList = [
//     {id: 1, year: 2022, "PGE - L3 FISE": 100, "PGE - L3 FISA": 100, "PEx - B2": 200, "PEx - M2 Msc Cyber": 200, "PEx - M2 optionnelle": 200},
//     {id: 2, year: 2023, "PGE - L3 FISE": 100, "PGE - L3 FISA": 100, "PEx - B2": 200, "PEx - M2 Msc Cyber": 200, "PEx - M2 optionnelle": 200},
//     {id: 3, year: 2024, "PGE - L3 FISE": 200, "PGE - L3 FISA": 200, "PEx - B2": 300, "PEx - M2 Msc Cyber": 300, "PEx - M2 optionnelle": 300},
//     {id: 4, year: 2024, "PGE - L3 FISE": 250, "PGE - L3 FISA": 250, "PEx - B2": 350, "PEx - M2 Msc Cyber": 350, "PEx - M2 optionnelle": 350},
// ]


// const maxMobiliteCarbonEmissionList0 = [
//     {id: 1, year: 2024, PGE_L3_FISE: 100, PGE_L3_FISA: 100, PEx_B2: 200, PEx_M2_Msc_Cyber: 200, PEx_M2_Optionnelle: 200},
// ];

const maxMobiliteCarbonEmissionList = [
    {id: 1, year: 2024, PGE_L1: 200, PGE_L2:200, PGE_L3:200, PGE_M1:200, PGE_M2:200, PEx_B1: 300, PEx_B2: 300,  PEx_B3: 300, PEx_MS1: 300, PEx_MS2_Cyber: 300, PEx_MS2_Optionnelle: 300, Autres: 300},
];


module.exports = {
    questionsList,
    countryEmissions,
    consummationEmissions,
    responsesList,
    usersList,
    emissionsList,
    maxMobiliteCarbonEmissionList,
    conseilsList,
    compensationsList,
    transportOptionsFromImpactCO2LongTrip,
    destinationId1,
    destinationId2,
    destinationId3,
    destinationId4,
    destinationOptionsList,
    transportOptionsFromImpactCO2LongShortTrip,
    transportOptionsFromImpactCO2ShortTrip,
    transportOptionsFromImpactCO2,
};

