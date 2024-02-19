import { atom, selector } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    naturalId: "1",
    firstName: "Jhon",
    lastName: "Doe",
    username: "Johny",
    email: "jhon@doe.com",
    pnr: "12342211-4444",
    role: "APPLICANT", //"APPLICANT" & "RECRUITER"
    experience: [],
    availability: [
      {
        id: 1,
        from: "2022-01-01",
        to: "2022-01-11",
        status: "unhandled",
        position: "",
        contact: "",
      },
      {
        id: 2,
        from: "2022-01-01",
        to: "2022-01-11",
        status: "unhandled",
        position: "",
        contact: "",
      },
      {
        id: 3,
        from: "2022-01-01",
        to: "2022-01-11",
        status: "unhandled",
        position: "",
        contact: "",
      },
      {
        id: 4,
        from: "2022-01-01",
        to: "2022-01-11",
        status: "unhandled",
        position: "",
        contact: "",
      },
    ],
  },
});
/*

{
        id: 1,
        from: "2022-01-01",
        to: "2022-01-11",
        status: "unhandled",
        position: "",
        contact: "",
      },
      {
        id: 21,
        from: "2022-01-01",
        to: "2022-01-11",
        status: "rejected",
        position: "",
        contact: "",
      },
      {
        id: 12,
        from: "2022-02-01",
        to: "2022-02-11",
        position: "roller coaster operation",
        status: "accepted",
        contact: "Jhon Doe",
      },
      {
        id: 2,
        from: "2024-03-13",
        to: "2024-03-21",
        status: "accepted",
        position: "ticket sales",
        contact: "Jhon Doe",
      },
      {
        id: 3,
        from: "2024-02-13",
        to: "2024-02-15",
        status: "accepted",
        position: "lotteries",
        contact: "Jhon Doe",
      },


*/
export const userLoggedIn = atom({
  key: "userLoggedIn",
  default: true,
});

export const availabilitySelectorState = selector({
  key: "availabilitySelectorState",
  get: ({ get }) => get(currentUserState).availability,
  set: ({ get, set }, newValue) => {
    if (!Array.isArray(newValue)) {
      console.error("New value is not an array:", newValue);
      return;
    }
    const isValidValue = newValue.every(
      (availability) =>
        typeof availability === "object" &&
        "from" in availability &&
        "to" in availability
    );
    if (!isValidValue) {
      console.error("Invalid value format:", newValue);
      return;
    }
    let newState = { ...get(currentUserState) };
    newState.availability = newValue;
    set(currentUserState, newState);
  },
});

export const experienceSelectorState = selector({
  key: "experienceSelectorState",
  get: ({ get }) => get(currentUserState).experience,
  set: ({ get, set }, newValue) => {
    if (!Array.isArray(newValue)) {
      console.error("New value is not an array:", newValue);
      return;
    }
    const isValidValue = newValue.every(
      (item) =>
        typeof item === "object" && "position" in item && "experience" in item
    );

    if (!isValidValue) {
      console.error("Invalid value format:", newValue);
      return;
    }

    let newState = { ...get(currentUserState) };
    newState.experience = newValue;

    set(currentUserState, newState);
  },
});
