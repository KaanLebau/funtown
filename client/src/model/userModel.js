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

/**
 * Atom representing the current user's state.
 */
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
/**
 * Atom representing the state of user login status.
 */
export const userLoggedIn = atom({
  key: "userLoggedIn",
  default: false,
  effects: [localStorageEffect("userLoggedIn")],
});
/**
 * Selector representing the availability state of the current user.
 */
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
/**
 * Selector representing the JWT token of the current user.
 */

export const jwtTokenSelector = selector({
  key: "jwtTokenSelector",
  get: ({ get }) => get(currentUserState).token,
});
/**
 * Selector representing the experience state of the current user.
 */
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
