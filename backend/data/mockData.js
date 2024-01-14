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


// category: 1 => questions pour la vie quoditienne d'un individu
// category: 2 => questions pour la mobilite d'un etudiant
const questionsList = [
    { id: 1, category: 1, question_text: "A quelle distance (en km) habitez-vous d\'Efrei ?", type: "number", options: [] },
    { id: 2, category: 1, question_text: "Comment vous déplacez-vous pour vous y rendre ?" , type: "text", options: ["Train", "Bus", "Metro", "Voiture", "A pied"]},
    { id: 3, category: 1, question_text: "Combien de fois par semaine mangez-vous de la viande ?" , type: "number", options: []},
    { id: 4, category: 2, question_text: "Quelle destination envisagez-vous pour la mobilité L3 ?", type: "mcq", options: locationOptions },
    { id: 5, category: 2, question_text: "Par quels moyens comptez-vous y aller ?" , type: "text", options: ["Train", "Bus", "Avion", "Voiture"]},
];
  
const responsesList = [];

const usersList = [
    { userId: 0, name: "admin", email: "admin@efrei.fr", password: "admin" },
    { userId: 1, name: "student1", email: "student1@efrei.net", password: "student1" },
    { userId: 2, name: "student2", email: "student2@efrei.net", password: "student2" },
    { userId: 3, name: "student3", email: "student3@efrei.net", password: "student3" },
];

const emissionsList = [];

module.exports = {
    questionsList,
    countryEmissions,
    responsesList,
    usersList,
    emissionsList
};

