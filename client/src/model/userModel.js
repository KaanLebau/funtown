import { atom, selector } from "recoil";
import apiModule from "../integration/funtownApi";

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
const fetchUserExperience = async (token, username) => {
  try {
    const experienceData = await apiModule.getUserExperience(token, username); // Call your API function to fetch experience data
    return experienceData;
  } catch (error) {
    console.error("Failed to fetch user experience:", error);
    return [];
  }
};

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    pnr: "",
    role: "", //"APPLICANT" & "RECRUITER"
    token: "",
    experience: [],
    availability: [],
  },
  effects: [localStorageEffect("currentUserState")],
});

export const userLoggedIn = atom({
  key: "userLoggedIn",
  default: false,
  effects: [localStorageEffect("userLoggedIn")],
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

export const jwtTokenSelector = selector({
  key: "jwtTokenSelector",
  get: ({ get }) => get(currentUserState).token,
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
