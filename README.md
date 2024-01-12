# Efrei Paris M2 Engineering Projet: POSCO

### Goal: calculate carbon emission

### Contributors: 

    Yasmine ESSID
    Huiting FENG
    Océane HADDADENE
    Jihen JEMAI
    Jimmy SHI


        if (results[i] == "angleterre" || results[i] == "pologne" || results[i] == "hongrie" || results[i] == "tcheque") {
          total += parseInt(countryEmissions.results[i].results[i], 10) || 0;
          break;
        } else {
          total += parseInt(countryEmissions.results[i].avion, 10) || 0;
          break;
        }