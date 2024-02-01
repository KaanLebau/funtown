import { atom, selector } from "recoil";

export const userState = atom({
  key: "currentUser",
  default: {
    naturalId: "1",
    firstName: "Jhon",
    lastName: "Doe",
    username: "jhonny",
    email: "jhon@doe.com",
    pnr: "12342211-4444",
    role: "applicant",
  },
});
