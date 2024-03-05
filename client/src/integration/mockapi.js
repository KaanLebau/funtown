// mockApi.js

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    firstname: "Ariel",
    lastname: "Aldhouse",
    status: "unhandled",
    position: "ticket sales",
    from: "2023-12-19",
    to: "2023-11-27",
    competence: "0 -> 1 year",
  },
  {
    id: 2,
    firstname: "Kori",
    lastname: "Renyard",
    status: "accepted",
    position: "ticket sales",
    from: "2023-09-27",
    to: "2024-01-05",
    competence: "0 -> 1 year",
  },
  {
    id: 3,
    firstname: "Hayward",
    lastname: "Tease",
    status: "accepted",
    position: "ticket sales",
    from: "2023-03-06",
    to: "2023-05-16",
    competence: "2.1 -> 3",
  },
  {
    id: 4,
    firstname: "Peggy",
    lastname: "Vannoni",
    status: "rejected",
    position: "lotteries",
    from: "2023-12-15",
    to: "2023-11-03",
    competence: "3.1 ->",
  },
  {
    id: 5,
    firstname: "Corinne",
    lastname: "Lafayette",
    status: "unhandled",
    position: "roller coaster operation",
    from: "2023-06-17",
    to: "2023-10-06",
    competence: "2.1 -> 3",
  },
  {
    id: 6,
    firstname: "Chan",
    lastname: "Trew",
    status: "accepted",
    position: "lotteries",
    from: "2024-01-17",
    to: "2023-08-11",
    competence: "2.1 -> 3",
  },
  {
    id: 7,
    firstname: "Bren",
    lastname: "Kennaway",
    status: "accepted",
    position: "roller coaster operation",
    from: "2023-11-16",
    to: "2024-02-18",
    competence: "0 -> 1 year",
  },
  {
    id: 8,
    firstname: "Kristin",
    lastname: "Baterip",
    status: "unhandled",
    position: "lotteries",
    from: "2023-06-09",
    to: "2023-12-14",
    competence: "0 -> 1 year",
  },
  {
    id: 9,
    firstname: "Torrance",
    lastname: "Lucas",
    status: "accepted",
    position: "lotteries",
    from: "2023-07-04",
    to: "2024-01-16",
    competence: "1.1 -> 2 year",
  },
  {
    id: 10,
    firstname: "Cherrita",
    lastname: "De Beneditti",
    status: "unhandled",
    position: "roller coaster operation",
    from: "2023-10-16",
    to: "2023-04-05",
    competence: "3.1 ->",
  },
  {
    id: 11,
    firstname: "Muhammad",
    lastname: "Keepe",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-05-04",
    to: "2023-10-19",
    competence: "3.1 ->",
  },
  {
    id: 12,
    firstname: "Dorey",
    lastname: "Petroselli",
    status: "accepted",
    position: "lotteries",
    from: "2023-02-20",
    to: "2023-11-03",
    competence: "3.1 ->",
  },
  {
    id: 13,
    firstname: "Lauralee",
    lastname: "Quilkin",
    status: "accepted",
    position: "ticket sales",
    from: "2023-06-12",
    to: "2023-07-25",
    competence: "3.1 ->",
  },
  {
    id: 14,
    firstname: "Lamont",
    lastname: "Curedell",
    status: "rejected",
    position: "lotteries",
    from: "2023-10-12",
    to: "2023-11-19",
    competence: "1.1 -> 2 year",
  },
  {
    id: 15,
    firstname: "Todd",
    lastname: "Probart",
    status: "accepted",
    position: "roller coaster operation",
    from: "2023-09-04",
    to: "2023-06-08",
    competence: "2.1 -> 3",
  },
  {
    id: 16,
    firstname: "Sam",
    lastname: "Starrs",
    status: "accepted",
    position: "lotteries",
    from: "2024-02-02",
    to: "2023-08-02",
    competence: "3.1 ->",
  },
  {
    id: 17,
    firstname: "Octavia",
    lastname: "Eggleton",
    status: "unhandled",
    position: "lotteries",
    from: "2023-12-13",
    to: "2023-11-29",
    competence: "3.1 ->",
  },
  {
    id: 18,
    firstname: "Hilda",
    lastname: "Wearing",
    status: "accepted",
    position: "lotteries",
    from: "2023-12-07",
    to: "2023-07-16",
    competence: "0 -> 1 year",
  },
  {
    id: 19,
    firstname: "Dredi",
    lastname: "Arnau",
    status: "rejected",
    position: "lotteries",
    from: "2024-02-09",
    to: "2023-09-26",
    competence: "3.1 ->",
  },
  {
    id: 20,
    firstname: "Claire",
    lastname: "Pedro",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-06-18",
    to: "2023-09-04",
    competence: "1.1 -> 2 year",
  },
  {
    id: 21,
    firstname: "Verine",
    lastname: "Hutten",
    status: "rejected",
    position: "lotteries",
    from: "2023-09-12",
    to: "2023-08-07",
    competence: "0 -> 1 year",
  },
  {
    id: 22,
    firstname: "Annabal",
    lastname: "Chaplin",
    status: "unhandled",
    position: "ticket sales",
    from: "2023-04-14",
    to: "2023-10-23",
    competence: "0 -> 1 year",
  },
  {
    id: 23,
    firstname: "Prince",
    lastname: "Radmore",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-12-28",
    to: "2023-03-30",
    competence: "0 -> 1 year",
  },
  {
    id: 24,
    firstname: "Miquela",
    lastname: "Anfossi",
    status: "accepted",
    position: "ticket sales",
    from: "2023-03-20",
    to: "2023-08-23",
    competence: "3.1 ->",
  },
  {
    id: 25,
    firstname: "Adelind",
    lastname: "Quidenham",
    status: "unhandled",
    position: "ticket sales",
    from: "2023-07-14",
    to: "2023-04-28",
    competence: "1.1 -> 2 year",
  },
  {
    id: 26,
    firstname: "Hatty",
    lastname: "Fayne",
    status: "unhandled",
    position: "ticket sales",
    from: "2024-02-04",
    to: "2023-08-23",
    competence: "2.1 -> 3",
  },
  {
    id: 27,
    firstname: "Tucky",
    lastname: "Arrandale",
    status: "unhandled",
    position: "ticket sales",
    from: "2023-03-15",
    to: "2024-01-14",
    competence: "3.1 ->",
  },
  {
    id: 28,
    firstname: "Keriann",
    lastname: "Punshon",
    status: "accepted",
    position: "ticket sales",
    from: "2023-06-10",
    to: "2023-06-27",
    competence: "0 -> 1 year",
  },
  {
    id: 29,
    firstname: "Patricia",
    lastname: "Knotton",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-10-25",
    to: "2023-02-26",
    competence: "2.1 -> 3",
  },
  {
    id: 30,
    firstname: "Elyssa",
    lastname: "Demaid",
    status: "accepted",
    position: "roller coaster operation",
    from: "2023-02-20",
    to: "2023-10-01",
    competence: "0 -> 1 year",
  },
  {
    id: 31,
    firstname: "Ricard",
    lastname: "Ridpath",
    status: "accepted",
    position: "lotteries",
    from: "2024-02-18",
    to: "2023-03-06",
    competence: "3.1 ->",
  },
  {
    id: 32,
    firstname: "Erhart",
    lastname: "Ruvel",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-08-07",
    to: "2023-09-18",
    competence: "0 -> 1 year",
  },
  {
    id: 33,
    firstname: "Rivalee",
    lastname: "Trim",
    status: "rejected",
    position: "lotteries",
    from: "2023-06-08",
    to: "2023-09-13",
    competence: "2.1 -> 3",
  },
  {
    id: 34,
    firstname: "Yvon",
    lastname: "Joyson",
    status: "rejected",
    position: "ticket sales",
    from: "2023-12-09",
    to: "2023-08-08",
    competence: "2.1 -> 3",
  },
  {
    id: 35,
    firstname: "Luther",
    lastname: "Berridge",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-03-15",
    to: "2024-01-26",
    competence: "1.1 -> 2 year",
  },
  {
    id: 36,
    firstname: "Merci",
    lastname: "Foyston",
    status: "rejected",
    position: "ticket sales",
    from: "2023-11-22",
    to: "2023-07-12",
    competence: "1.1 -> 2 year",
  },
  {
    id: 37,
    firstname: "Gratia",
    lastname: "Sibson",
    status: "accepted",
    position: "ticket sales",
    from: "2023-10-12",
    to: "2024-01-16",
    competence: "0 -> 1 year",
  },
  {
    id: 38,
    firstname: "Doralynne",
    lastname: "Paddick",
    status: "accepted",
    position: "roller coaster operation",
    from: "2023-10-11",
    to: "2023-10-02",
    competence: "0 -> 1 year",
  },
  {
    id: 39,
    firstname: "Allen",
    lastname: "Aickin",
    status: "rejected",
    position: "lotteries",
    from: "2023-10-14",
    to: "2024-01-09",
    competence: "0 -> 1 year",
  },
  {
    id: 40,
    firstname: "Lorrayne",
    lastname: "Ritzman",
    status: "rejected",
    position: "lotteries",
    from: "2023-07-14",
    to: "2024-01-13",
    competence: "3.1 ->",
  },
  {
    id: 41,
    firstname: "Odetta",
    lastname: "Basten",
    status: "accepted",
    position: "lotteries",
    from: "2023-09-03",
    to: "2023-12-01",
    competence: "2.1 -> 3",
  },
  {
    id: 42,
    firstname: "Job",
    lastname: "Glazer",
    status: "rejected",
    position: "lotteries",
    from: "2024-01-31",
    to: "2023-06-29",
    competence: "0 -> 1 year",
  },
  {
    id: 43,
    firstname: "Fidelity",
    lastname: "Hounsom",
    status: "accepted",
    position: "lotteries",
    from: "2023-06-14",
    to: "2023-04-05",
    competence: "0 -> 1 year",
  },
  {
    id: 44,
    firstname: "Lazare",
    lastname: "Millea",
    status: "accepted",
    position: "ticket sales",
    from: "2024-02-13",
    to: "2023-11-19",
    competence: "0 -> 1 year",
  },
  {
    id: 45,
    firstname: "Monica",
    lastname: "Elcocks",
    status: "rejected",
    position: "ticket sales",
    from: "2023-12-21",
    to: "2023-12-31",
    competence: "3.1 ->",
  },
  {
    id: 46,
    firstname: "Minta",
    lastname: "Lowres",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-08-21",
    to: "2023-11-01",
    competence: "2.1 -> 3",
  },
  {
    id: 47,
    firstname: "Paloma",
    lastname: "Willetts",
    status: "rejected",
    position: "lotteries",
    from: "2023-07-04",
    to: "2023-05-08",
    competence: "0 -> 1 year",
  },
  {
    id: 48,
    firstname: "Sigfrid",
    lastname: "Courtier",
    status: "accepted",
    position: "lotteries",
    from: "2023-02-21",
    to: "2023-09-19",
    competence: "0 -> 1 year",
  },
  {
    id: 49,
    firstname: "Willem",
    lastname: "Skeath",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-03-13",
    to: "2023-11-13",
    competence: "1.1 -> 2 year",
  },
  {
    id: 50,
    firstname: "Morey",
    lastname: "Raymont",
    status: "accepted",
    position: "roller coaster operation",
    from: "2023-07-25",
    to: "2023-11-26",
    competence: "1.1 -> 2 year",
  },
  {
    id: 51,
    firstname: "Ollie",
    lastname: "Hancorn",
    status: "unhandled",
    position: "lotteries",
    from: "2023-07-13",
    to: "2023-07-15",
    competence: "0 -> 1 year",
  },
  {
    id: 52,
    firstname: "Bourke",
    lastname: "Wyeth",
    status: "accepted",
    position: "roller coaster operation",
    from: "2023-08-10",
    to: "2024-02-17",
    competence: "3.1 ->",
  },
  {
    id: 53,
    firstname: "Viki",
    lastname: "Zanneli",
    status: "accepted",
    position: "ticket sales",
    from: "2023-07-24",
    to: "2023-03-02",
    competence: "3.1 ->",
  },
  {
    id: 54,
    firstname: "Cosetta",
    lastname: "Albers",
    status: "unhandled",
    position: "ticket sales",
    from: "2023-04-08",
    to: "2023-03-06",
    competence: "3.1 ->",
  },
  {
    id: 55,
    firstname: "Wandis",
    lastname: "Fagence",
    status: "unhandled",
    position: "roller coaster operation",
    from: "2023-03-11",
    to: "2023-08-25",
    competence: "1.1 -> 2 year",
  },
  {
    id: 56,
    firstname: "Ram",
    lastname: "Kettle",
    status: "unhandled",
    position: "ticket sales",
    from: "2023-06-30",
    to: "2023-06-03",
    competence: "1.1 -> 2 year",
  },
  {
    id: 57,
    firstname: "Timmy",
    lastname: "Crowter",
    status: "rejected",
    position: "roller coaster operation",
    from: "2023-10-24",
    to: "2023-10-28",
    competence: "3.1 ->",
  },
  {
    id: 58,
    firstname: "Jacki",
    lastname: "Signe",
    status: "unhandled",
    position: "ticket sales",
    from: "2023-10-10",
    to: "2024-02-11",
    competence: "1.1 -> 2 year",
  },
  {
    id: 59,
    firstname: "Anastassia",
    lastname: "Muneely",
    status: "accepted",
    position: "lotteries",
    from: "2023-05-21",
    to: "2023-07-15",
    competence: "1.1 -> 2 year",
  },
  {
    id: 60,
    firstname: "Dorrie",
    lastname: "Lammerding",
    status: "accepted",
    position: "ticket sales",
    from: "2023-11-03",
    to: "2024-02-06",
    competence: "0 -> 1 year",
  },
];

export async function getAllApplications() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return mockApplications;
}

const mockApi = {
  getAllApplications,
};

export default mockApi;
