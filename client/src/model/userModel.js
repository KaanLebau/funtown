import { atom, selector } from "recoil";

/**
 * Effect for managing a Recoil state value in localStorage.
 * This effect retrieves the value from localStorage on initialization and stores it back when the value changes.
 * @param {string} key - The key under which the value is stored in localStorage.
 * @returns {Function} A function that acts as the effect handler.
 */
export const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
export const currentUserState = atom({
  key: "currentUserState",
  default: {
    naturalId: "1",
    firstName: "Jhon",
    lastName: "Doe",
    username: "Jhonny",
    email: "jhon@doe.com",
    pnr: "",
    role: "RECRUITER", //"APPLICANT" & "RECRUITER"
    experience: [],
    availability: [
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
    ],
  },
  effects: [localStorageEffect("currentUserState")],
});

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
