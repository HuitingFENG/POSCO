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
    { name: "admin", email: "admin@efrei.fr", password: "admin" },
    { name: "student1", email: "student1@efrei.net", password: "student1" },
    { name: "student2", email: "student2@efrei.net", password: "student2" },
    { name: "student3", email: "student3@efrei.net", password: "student3" },
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



module.exports = {
    questionsList,
    countryEmissions,
    consummationEmissions,
    responsesList,
    usersList,
    emissionsList
};

