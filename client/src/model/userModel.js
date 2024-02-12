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
    role: "recruiter",
    experience: [],
    availability: [],
  },
});

export const availabilitySelectorState = selector({
  key: "availabilitySelectorState",
  get: ({ get }) => get(userState).availability,
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
    let newState = { ...get(userState) };
    newState.availability = newValue;
    set(userState, newState);
  },
});

export const experienceSelectorState = selector({
  key: "experienceSelectorState",
  get: ({ get }) => get(userState).experience,
  set: ({ get, set }, newValue) => {
    if (!Array.isArray(newValue)) {
      console.error("New value is not an array:", newValue);
      return;
    }

    // Verify that each element in the array has the expected structure
    const isValidValue = newValue.every(
      (item) =>
        typeof item === "object" && "position" in item && "experience" in item
    );

    if (!isValidValue) {
      console.error("Invalid value format:", newValue);
      return;
    }

    let newState = { ...get(userState) };
    newState.experience = newValue;

    set(userState, newState);
  },
});
