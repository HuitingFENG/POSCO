const countryEmissions = [
    {code:"stokeontrent", location:"Stoke-on-Trent, Angleterre", Train: 4.4, Bus: 22, Avion: 129, Voiture:159},
    {code:"pologne", location:"Cravovie, Pologne", Train: 10, Bus: 46, Avion: 229, Voiture: 338 },
    {code:"hongrie", location:"Budapest, Hongrie", Train: 10, Bus: 44, Avion: 224, Voiture: 326 },
    {code:"tcheque", location:"Ostrava, République Tchèque", Train: 8, Bus: 41, Avion: 207, Voiture: 306 },
    {code:"montreal", location:"Montréal, Canada", Train: 0, Bus: 0, Avion: 835, Voiture: 0 },
    {code:"malaisie", location:"Kuala Lumpur, Malaisie", Train: 0, Bus: 0, Avion: 1581, Voiture: 0 },
    {code:"afrique", location:"Le Cap, Afrique du Sud", Train: 0, Bus: 0, Avion: 2767, Voiture: 0 },
    {code:"toronto", location:"Toronto, Canada", Train: 0, Bus: 0, Avion: 910, Voiture: 0 },
    {code:"etatsunis", location:"Irvine, Etats-Unis", Train: 0, Bus: 0, Avion: 1380, Voiture: 0 },
    {code:"portsmouth", location:"Portsmouth, Angleterre", Train: 3.7, Bus: 17, Avion: 76, Voiture: 122 },
    {code:"tallinn", location:"Tallinn, Estonie", Train: 16, Bus: 75, Avion: 332, Voiture: 557 },
    {code:"vilnius", location:"Vilnius, Lituanie", Train: 13, Bus: 62, Avion: 303, Voiture: 456 },
    {code:"espagne", location:"Malaga, Espagne", Train: 11, Bus: 53, Avion: 260, Voiture: 391 },
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
    { name: "admin", email: "admin@efrei.fr", password: "$2b$10$KEQLNT4TB3BFTj2m/m5YX.B2iCo6Lk1ZEB5ItS4e7y9eGLXSYP7Tu" },
    { name: "student1", email: "student1@efrei.net", password: "$2b$10$gMKcu98m.DWj0cF6SwB5NeuD2Jwzh3juZpX2pfLW0oFbOuebLhBtW" },
    { name: "student2", email: "student2@efrei.net", password: "$2b$10$MPe3hsguE4U9YF79h8SAEOpVNXqfkv7lRuDKE.fn0mFCtjZ0.YQb6" },
    { name: "student3", email: "student3@efrei.net", password: "$2b$10$PsqQFN9ATlQ6FIPp3oMvIeAUhhg23hPyLTS55eoQeCixtz6RZvaiC" },
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


// category: 1 => Questions sur empreinte carbone personnelle  
// category: 2 => Questions sur la mobilité
const questionsList = [
    { id: 1, category: 1, question_text: "En quelle année êtes-vous ?", type: "text", options: ["L1", "L2", "L3", "M1", "M2"] },
    { id: 2, category: 1, question_text: "A quelle distance (en km) habitez-vous d\'Efrei ?", type: "number", options: [] },
    { id: 3, category: 1, question_text: "Comment vous déplacez-vous pour vous y rendre ?" , type: "text", options: transportOptionsWithoutAvion},
    { id: 4, category: 1, question_text: "Combien de fois par semaine mangez-vous de la viande ?", type: "number", options: []},
    { id: 5, category: 1, question_text: "De quelle viande s’agit-il ?" , type: "text", options: viandeOptions},
    { id: 6, category: 2, question_text: "Quelle destination envisagez-vous pour la mobilité L3 ?", type: "mcq", options: locationOptions },
    { id: 7, category: 2, question_text: "Par quels moyens comptez-vous y aller ?" , type: "text", options: transportOptionsWithoutTDVApied },
    { id: 8, category: 2, question_text: "Envisagez-vous de réaliser un autre long voyage depuis votre destination de mobilité ?" , type: "text", options: ["Oui", "Non"]},
    { id: 9, category: 2, question_text: "A quelle distance (en km) du lieu officiel de votre choix de mobilité ?" , type: "number", options: []},
    { id: 10, category: 2, question_text: "Comment comptez-vous vous y rendre ?" , type: "text", options: transportOptionsWithoutTDVApied },
];


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


const maxMobiliteCarbonEmissionList = [
    {id: 1, year: 2022, L1: 400, L2: 400, L3: 500, M1: 500, M2: 500},
    {id: 2, year: 2023, L1: 400, L2: 400, L3: 500, M1: 500, M2: 500},
    {id: 3, year: 2024, L1: 500, L2: 500, L3: 600, M1: 600, M2: 600},
]


module.exports = {
    questionsList,
    countryEmissions,
    consummationEmissions,
    responsesList,
    usersList,
    emissionsList,
    maxMobiliteCarbonEmissionList,
    conseilsList,
};

