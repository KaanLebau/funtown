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
  },
});

export const experienceSelectorState = selector({
  key: "experienceSelectorState",
  get: ({ get }) => get(userState).experience,
  set: ({ get, set }, newValue) => {
    // Ensure newValue is an array
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

    // Get the current state and update the experience property with the new value
    let newState = { ...get(userState) };
    newState.experience = newValue;

    // Set the updated state
    //set(userState, newState);
    //let newState = get(userState);
    //newState.experience.push(newValue);
    //console.log(newState);
    set(userState, newState);
  },
});
