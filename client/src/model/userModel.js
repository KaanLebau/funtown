import { atom, selector } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    naturalId: "1",
    firstName: "Jhon",
    lastName: "Doe",
    username: "Jhonny",
    email: "jhon@doe.com",
    pnr: "11112233-4444",
    role: "RECRUITER", //"APPLICANT" & "RECRUITER"
    experience: [],
    availability: [],
  },
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
