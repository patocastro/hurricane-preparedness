export type Shelter = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const shelters: Shelter[] = [
  {
    id: "1",
    name: "Primaria Felipe Carrillo Puerto",
    address: "Calle 13 s/n por 28 y 30 Col. Maya",
    latitude: 21.015021,
    longitude: -89.577815
  },
  {
    id: "2",
    name: "Primaria Elvira Parra Avila",
    address: "Calle 20 Sur s/n por 37 y 39-A Col. Emiliano Zapata Oriente",
    latitude: 20.985097,
    longitude: -89.574065
  },
  {
    id: "3",
    name: "Centro de Atención Multiple No. 3",
    address: "Calle 51 s/n por 20 y Circuito Col. Ávila Camacho",
    latitude: 20.971468,
    longitude: -89.589957
  },
  {
    id: "4",
    name: "Primaria José Vasconcelos",
    address: "Calle 87 por 4-A y 4-B Diag. Col. Nueva Kukulkán",
    latitude: 20.939048,
    longitude: -89.586736
  },
  {
    id: "5",
    name: "Centro de Desarrollo Comunitario \"Salvador Alvarado Sur\"",
    address: "Calle 10 Sur s/n por 37 y 39 Col. Salvador Alvarado Sur",
    latitude: 20.933279,
    longitude: -89.599321
  },
  {
    id: "6",
    name: "Centro de Desarrollo Comunitario \"Emiliano Zapata\"",
    address: "Calle 88-B por 161 y 163 Col. Emiliano Zapata Sur",
    latitude: 20.9144841,
    longitude: -89.6519512
  },
  {
    id: "7",
    name: "Centro de Desarrollo Comunitario \"San José Tecoh\"",
    address: "Calle 151 por 68 y 70 Col. San José Tecoh",
    latitude: 20.9149626,
    longitude: -89.638752
  },
  {
    id: "8",
    name: "Primaria Pedro Enríquez Ureña",
    address: "Calle 50-B s/n por 167 y 165 Col. Plan de Ayala Sur",
    latitude: 20.907168,
    longitude: -89.621004
  },
  {
    id: "9",
    name: "Primaria Guadalupe Victoria",
    address: "Calle 45 número 412 por 26-D y 28, periférico, Col. El Roble",
    latitude: 20.919921,
    longitude: -89.684594
  },
  {
    id: "10",
    name: "Primaria Miguel Hidalgo y Costilla",
    address: "Calle 10 número 128 por 41 y 43 Col. San Marcos Nocoh",
    latitude: 20.925748,
    longitude: -89.672974
  },
  {
    id: "11",
    name: "Primaria Agustín de Iturbide",
    address: "Calle 88 por 179 y 181 Col. San Antonio Xluch III",
    latitude: 20.899029,
    longitude: -89.651248
  },
  {
    id: "12",
    name: "Jardín de niños Estado de Yucatán",
    address: "Calle 181 por Av. 86, San Antonio Xluch III",
    latitude: 20.898854,
    longitude: -89.650505
  },
  {
    id: "13",
    name: "Primaria Rómulo Rozo Peña",
    address: "Calle 64 número 322 por 145 y 147 San José Tecoh Sur III",
    latitude: 20.916198,
    longitude: -89.635531
  },
  {
    id: "14",
    name: "Primaria José López Portillo y Rojas",
    address: "Calle 39 número 74 por 32 y 34 Col. Xoclan López Portillo",
    latitude: 20.966659,
    longitude: -89.660491
  },
  
  {
    id: "15",
    name: "Secundaria José Esquivel Pren",
    address: "Calle 108 número 919 por 81 y Av. Internacional Col. Sambulá",
    latitude: 20.947072,
    longitude: -89.655594
  },
  {
    id: "16",
    name: "Juan Pablo Sabido Sosa",
    address: "Calle 46 por 27-A Col. Amapolita Chenkú",
    latitude: 21.008208,
    longitude: -89.660172
  },
  {
    id: "17",
    name: "Primaria Marcial Novelo Briceño",
    address: "Calle 32 número 272 por 21 y 23 Col. San Vicente Chuburná",
    latitude: 21.009547,
    longitude: -89.644291
  },
  {
    id: "18",
    name: "Caucel",
    address: "Secundaria Humberto Lara y Lara — Calle 23 por 4 Carretera Caucel-Mérida",
    latitude: 21.008641,
    longitude: -89.695011
  },
  {
    id: "19",
    name: "Cosgaya",
    address: "Escuela primaria \"Miguel Jorge\" — Domicilio conocido",
    latitude: 21.097113,
    longitude: -89.704592
  },
  {
    id: "20",
    name: "Chablekal",
    address: "Centro de Desarrollo Comunitario — Calle 17 por 14 y 18",
    latitude: 21.097428,
    longitude: -89.574028
  },
  {
    id: "21",
    name: "Chalmuch",
    address: "Escuela primaria \"Vicente Guerrero\" — Calle 22 por 19 y 21",
    latitude: 20.972941,
    longitude: -89.728968
  },
  {
    id: "22",
    name: "Cheumán",
    address: "Escuela primaria \"Miguel Hidalgo y Costilla\" — Calle 20-A por 21 y 23",
    latitude: 21.06674,
    longitude: -89.706974
  },
  {
    id: "23",
    name: "Chichí Suárez",
    address: "Escuela primaria \"Francisco I. Madero\" Calle 33 s/n por 14 y 16",
    latitude: 20.999206,
    longitude: -89.555461
  },

  {
    id: "24",
    name: "Cholul",
    address: "Escuela primaria Agustín Melgar — Calle 21 por 14 y 16",
    latitude: 21.042375,
    longitude: -89.552844
  },
  {
    id: "25",
    name: "Dzibilchaltún",
    address: "Casa Comisarial — Calle 22 por 17 y 19",
    latitude: 21.098689,
    longitude: -89.598484
  },
  {
    id: "26",
    name: "Dzidzilché",
    address: "Escuela primaria \"Ignacio Allende\" — Calle 21 por 16 y 18",
    latitude: 21.152126,
    longitude: -89.689679
  },
  {
    id: "27",
    name: "Dzityá",
    address: "Escuela primaria \"Guillermo Prieto\" — Calle 15 número 100 por 16 y 18",
    latitude: 21.053269,
    longitude: -89.676917
  },
  {
    id: "28",
    name: "Dzodzil Norte",
    address: "Escuela Primaria \"Cesar Mendoza Santa Ana\" — Calle 31 Bis x 36",
    latitude: 21.0437256,
    longitude: -89.6212
  },


  {
    id: "29",
    name: "Dzoyaxché",
    address: "Escuela primaria \"Juan Miguel Castro Ruiz\" Calle 19 por 18 y 20",
    latitude: 20.791765,
    longitude: -89.589847
  },
  {
    id: "30",
    name: "Dzununcán",
    address: "Escuela primaria Manuel Berzunza — Calle 19 número 100 por 20",
    latitude: 20.866972,
    longitude: -89.653008
  },
  {
    id: "31",
    name: "Hunxectamán",
    address: "Casa Comisarial — Calle 21-A por 20",
    latitude: 20.883102,
    longitude: -89.55838
  },
  {
    id: "32",
    name: "Kikteil",
    address: "Casa Comisarial — Domicilio conocido",
    latitude: 21.130712,
    longitude: -89.692265
  },
  {
    id: "33",
    name: "Komchén",
    address: "Centro de Desarrollo Integral Municipal — Calle 28 por 37 y 35",
    latitude: 21.101787,
    longitude: -89.661216
  },
  {
    id: "34",
    name: "Molas",
    address: "Escuela primaria \"Benito Juárez\" (vespertina) — Calle 19-A por 20 y 22",
    latitude: 20.817225,
    longitude: -89.630901
  },
  {
    id: "35",
    name: "Molas",
    address: "Escuela Secundaria Técnica no. 40 — Calle 24 por 19 y 21",
    latitude: 20.815269,
    longitude: -89.634088
  },
  {
    id: "36",
    name: "Noc Ac",
    address: "Iglesia Presbiteriana \"El buen sembrador\" — Domicilio conocido",
    latitude: 21.080556,
    longitude: -89.717177
  },
  {
    id: "37",
    name: "Oncán",
    address: "Escuela primaria \"20 de Noviembre\" — Calle 20 por 19 y 21 Frente Hacienda",
    latitude: 20.964711,
    longitude: -89.483079
  },
  {
    id: "38",
    name: "Opichén",
    address: "Casa Comisarial — Calle 138 por 79-A y 81 Opichen",
    latitude: 20.949542,
    longitude: -89.679514
  },

  {
    id: "39",
    name: "Petac",
    address: "Escuela primaria \"Candelaria Ruz Patron\" — Domicilio conocido",
    latitude: 20.770078,
    longitude: -89.659156
  },
  {
    id: "40",
    name: "Sac-Nicté",
    address: "Jardín de niños Arcoiris — Domicilio conocido",
    latitude: 21.142005,
    longitude: -89.584687
  },
  {
    id: "41",
    name: "San Ignacio Tesip",
    address: "Escuela primaria Mariano Matamoros — Domicilio conocido",
    latitude: 20.84264,
    longitude: -89.611444
  },
  {
    id: "42",
    name: "San José Tzal",
    address: "Centro de Desarrollo Comunitario — Calle 14 s/n por 21-A y 23",
    latitude: 20.821777,
    longitude: -89.65591
  },
  {
    id: "43",
    name: "San José Tzal",
    address: "Escuela Secundaria Técnica No. 61 — Calle 16 número 60 por 23 y 23-A",
    latitude: 20.821251,
    longitude: -89.657739
  },
  {
    id: "44",
    name: "San Pedro Chimay",
    address: "Escuela primaria Emiliano Zapata — Calle 20 no. 39 por 23 y 25",
    latitude: 20.861729,
    longitude: -89.579988
  },
  {
    id: "45",
    name: "Santa Cruz Palomeque",
    address: "Escuela primaria \"Francisco J. Mujica\" — Calle 86 A por 23 y 25",
    latitude: 20.879624,
    longitude: -89.654156
  },
  {
    id: "46",
    name: "Santa Gertrudis Copó",
    address: "Escuela primaria Agustín Franco Villanueva — Calle 16 s/n por 7-C y 9",
    latitude: 21.039601,
    longitude: -89.596354
  },
  {
    id: "47",
    name: "Santa María Chí",
    address: "Escuela primaria Zamná — Calle 18 por 17 y 21",
    latitude: 21.033057,
    longitude: -89.480542
  },
  {
    id: "48",
    name: "Sierra Papacal",
    address: "Telesecundaria No. 42 \"Andrés Quintana Roo\" Calle 8 por 17 (Entrada a comisaría)",
    latitude: 21.122535,
    longitude: -89.724934
  },
  {
    id: "49",
    name: "Sitpach",
    address: "Casa comisarial — Calle 11 por 8 y 10",
    latitude: 21.027053,
    longitude: -89.520893
  },
  {
    id: "50",
    name: "Susulá",
    address: "Escuela primaria \"Josefa Ortiz de Domínguez\" Calle 18 por 17 y 19",
    latitude: 20.975826,
    longitude: -89.695687
  },

  {
    id: "51",
    name: "Suytunchén",
    address: "Escuela primaria \"Benito Juárez García\" Domicilio conocido",
    latitude: 21.100516,
    longitude: -89.731715
  },
  {
    id: "52",
    name: "Tahdzibichén",
    address: "Escuela primaria \"Miguel Hidalgo y Costilla\" — Calle 42 por 45 y 47",
    latitude: 20.88645,
    longitude: -89.597744
  },
  {
    id: "53",
    name: "Tamanché",
    address: "Escuela primaria Narciso Mendoza — Calle 20 por 21 y 23",
    latitude: 21.139173,
    longitude: -89.641008
  },
  {
    id: "54",
    name: "Texán Cámara",
    address: "Escuela primaria \"Hermenegildo Galeana\" Calle 18 por 21 y 23",
    latitude: 20.789007,
    longitude: -89.66401
  },
  {
    id: "55",
    name: "Tixcacal",
    address: "Escuela primaria \"Salvador Alvarado\" — Calle 21 s/n por 18 y 20",
    latitude: 20.943435,
    longitude: -89.714565
  },
  {
    id: "56",
    name: "Tixcuytún",
    address: "Escuela primaria Luz y Verdad — Domicilio conocido",
    latitude: 21.065939,
    longitude: -89.570332
  },
  {
    id: "57",
    name: "Tzacalá",
    address: "Telesecundaria \"Antonio Mediz Bolio\" — Calle 18-A por 21",
    latitude: 20.75181,
    longitude: -89.652675
  },
  {
    id: "58",
    name: "Xcanatún",
    address: "Iglesia — Calle 20 por 19",
    latitude: 21.075906,
    longitude: -89.6286164
  },
  {
    id: "59",
    name: "Xcumpich",
    address: "Jardín de niños \"Chichen Itza\" — Calle 5-A número 321 por 20 y 24",
    latitude: 21.033598,
    longitude: -89.635702
  },
  {
    id: "60",
    name: "Xcunyá",
    address: "Escuela primaria Emiliano Zapata — Calle 22 por 21",
    latitude: 21.132043,
    longitude: -89.613799
  },
  {
    id: "61",
    name: "Xmatkuil",
    address: "Escuela primaria \"Jesús García Corona\" — Calle 253 s/n por 52-A y 50-E",
    latitude: 20.860025,
    longitude: -89.62624
  },
  {
    id: "62",
    name: "Xmatkuil",
    address: "Campus de Ciencias Biologicas y Agropecuarias Carretera Xmatkuil km 15.5",
    latitude: 20.866852,
    longitude: -89.62477
  },
  {
    id: "63",
    name: "Yaxché Casares",
    address: "Escuela primaria Delio Moreno Cantón — Calle 21 por 20 y 22",
    latitude: 21.034494,
    longitude: -89.499006
  },

  {
    id: "64",
    name: "Yaxnic",
    address: "Escuela primaria \"Melchor Ocampo\" — Calle 23 por 18-A y 20",
    latitude: 20.789819,
    longitude: -89.618933
  }
];
