
const questionsList = [
    { question_text: "A quelle distance (en km) habitez-vous d\'Efrei ?" },
    { question_text: "Comment vous déplacez-vous pour vous y rendre ?" },
    { question_text: "Combien de fois par semaine mangez-vous de la viande ?" },
    { question_text: "Quelle destination envisagez-vous pour la mobilité L3 ?" },
    { question_text: "Par quels moyens comptez-vous y aller ?" },
];
  
const countryEmissions = [
    {code:"stokeontrent", location:"Stoke-on-Trent, Angleterre", train: 4.4, bus: 22, avion: 129, voiture:159},
    {code:"pologne", location:"Cravovie, Pologne", train: 10, bus: 46, avion: 229, voiture: 338 },
    {code:"hongrie", location:"Budapest, Hongrie", train: 10, bus: 44, avion: 224, voiture: 326 },
    {code:"tcheque", location:"Ostrava, République Tchèque", train: 8, bus: 41, avion: 207, voiture: 306 },
    {code:"montreal", location:"Montréal, Canada", train: 0, bus: 0, avion: 835, voiture: 0 },
    {code:"malaisie", location:"Kuala Lumpur, Malaisie", train: 0, bus: 0, avion: 1581, voiture: 0 },
    {code:"afrique", location:"Le Cap, Afrique du Sud", train: 0, bus: 0, avion: 2767, voiture: 0 },
    {code:"toronto", location:"Toronto, Canada", train: 0, bus: 0, avion: 910, voiture: 0 },
    {code:"etatsunis", location:"Irvine, Etats-Unis", train: 0, bus: 0, avion: 1380, voiture: 0 },
    {code:"portsmouth", location:"Portsmouth, Angleterre", train: 3.7, bus: 17, avion: 76, voiture: 122 },
    {code:"tallinn", location:"Tallinn, Estonie", train: 16, bus: 75, avion: 332, voiture: 557 },
    {code:"vilnius", location:"Vilnius, Lituanie", train: 13, bus: 62, avion: 303, voiture: 456 },
    {code:"espagne", location:"Malaga, Espagne", train: 11, bus: 53, avion: 260, voiture: 391 },
];

const responsesList = [
];


const usersList = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Doe", email: "jane@example.com" },
];


module.exports = {
    questionsList,
    responsesList,
    usersList,
};
