const authDb = [
  { username: "bonJovi", role: "RECRUITER", token: "token for bon jovi" },
  { username: "WaR", role: "APPLICANT", token: "token for axl rose" },
  { username: "duffy", role: "APPLICANT", token: "token for duf mckagan" },
];
const expDb = [
  {
    username: "duffy",
    competence: [
      { position: "ticket sales", experience: "0 -> 1 year" },
      { position: "roller coaster operation", experience: "1.1 -> 2 year" },
    ],
  },
  {
    username: "WaR",
    competence: [
      { position: "ticket sales", experience: "0 -> 1 year" },
      { position: "roller coaster operation", experience: "1.1 -> 2 year" },
    ],
  },
];
const availDB = [
  {
    username: "duffy",
    availability: [
      {
        id: 24,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        position: "",
        status: "unhandled",
        contact: "",
      },
      {
        id: 2,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        status: "rejected",
        position: "",
        contact: "Ali",
      },
      {
        id: 32,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        status: "accepted",
        position: "roller coaster operation",
        contact: "Ali",
      },
    ],
  },
  {
    username: "WaR",
    availability: [
      {
        id: 234,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        position: "",
        status: "unhandled",
        contact: "",
      },
      {
        id: 2234,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        status: "rejected",
        position: "",
        contact: "Ali",
      },
      {
        id: 3112,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        status: "accepted",
        position: "roller coaster operation",
        contact: "Ali",
      },
    ],
  },
];

const applicationData = [
  {
    id: 2,
    firstName: "Axl",
    lastName: "Rose",
    username: "WaR",
    email: "axl@rose.com",
    pnr: "",
    experience: [
      { position: "ticket sales", experience: "0 -> 1 year" },
      { position: "roller coaster operation", experience: "1.1 -> 2 year" },
    ],
    fromDate: "2023-01-01",
    toDate: "2023-12-31",
    status: "rejected",
    position: "",
    contact: "Ali",
  },
  {
    id: 32,
    firstName: "Duff",
    lastName: "Mckagan",
    username: "duffy",
    email: "duff@mckagan.com",
    pnr: "",
    role: "APPLICANT",
    experience: [
      { position: "ticket sales", experience: "0 -> 1 year" },
      { position: "roller coaster operation", experience: "1.1 -> 2 year" },
    ],
    fromDate: "2023-01-01",
    toDate: "2023-12-31",
    position: "",
    status: "unhandled",
    contact: "",
  },
  {
    id: 23,
    firstName: "Richie",
    lastName: "Sambora",
    username: "richie",
    email: "ric@sambora.com",
    pnr: "",
    role: "APPLICANT",
    experience: [
      { position: "ticket sales", experience: "0 -> 1 year" },
      { position: "roller coaster operation", experience: "1.1 -> 2 year" },
    ],
    position: "",
    fromDate: "2023-01-01",
    toDate: "2023-12-31",
    status: "unhandled",
    contact: "",
  },
];

const userDB = [
  {
    firstName: "Duff",
    lastName: "Mckagan",
    email: "duff@mckagan.com",
    username: "duffy",
    pnr: "19800211-3333",
  },

  {
    firstName: "Axl",
    lastName: "Rose",
    email: "axl@rose.com",
    pnr: "19800211-3333",
    username: "WaR",
  },
  {
    firstName: "Bon",
    lastName: "Jovi",
    username: "bonJovi",
    email: "bon@jovi.com",
    pnr: "19800211-3333",
  },
];

function getAuthByUsername(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const auth = authDb.find((auth) => auth.username === username);
      if (auth) {
        resolve(auth);
      } else {
        reject(new Error("User not found"));
      }
    }, 2000); // Simulating a delay of 2 seconds
  });
}

function getUserByUsernameMock(token, username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userDB.find((user) => user.username === username);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 2000); // Simulating a delay of 2 seconds
  });
}
function getExperienceByUsernameMock(token, username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exp = expDb.find((exp) => exp.username === username);
      if (exp) {
        resolve(exp.competence);
      } else {
        resolve([]);
      }
    }, 2000);
  });
}
function getAvailabilityByUsernameMock(token, username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const avail = availDB.find((item) => item.username === username);
      if (avail) {
        resolve(avail.availability);
      } else {
        resolve([]);
      }
    }, 2000);
  });
}

function getByApplicationIdMock(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const theApplication = applicationData.find(
        (application) => application.id === id
      );
      if (theApplication) {
        resolve(theApplication);
      } else {
        reject(new Error("User not found"));
      }
    }, 2000);
  });
}
function getAllApplicationsMock(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(applicationData);
    }, 2000);
  });
}

module.exports = {
  getUserByUsernameMock,
  getByApplicationIdMock,
  getAllApplicationsMock,
  getExperienceByUsernameMock,
  getAvailabilityByUsernameMock,
  getAuthByUsername,
};
