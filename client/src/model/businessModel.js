/**
 * Atom representing the options for positions available.
 */
import { atom } from "recoil";

export const positionOptions = atom({
  key: "positionOptions",
  default: [
    {
      id: 1,
      position: "ticket sales",
    },
    {
      id: 2,
      position: "lotteries",
    },
    {
      id: 3,
      position: "roller coaster operation",
    },
  ],
});
/**
 * Atom representing the options for application status.
 * Warning: These values are mapped to enums in the backend. If the backend enums are updated, these values will not update automatically and need to be changed manually.
 */
export const statusOptions = atom({
  key: "statusOptions",
  default: ["ACCEPTED", "REJECTED", "UNHANDLED"],
});
/**
 * Atom representing the options for experience levels.
 * Warning: These values are mapped to enums in the backend. If the backend enums are updated, these values will not update automatically and need to be changed manually.
 */
export const experienceOptions = atom({
  key: "experienceOptions",
  default: ["0 -> 1 year", "1.1 -> 2 year", "2.1 -> 3 year", "3.1 -> year"],
});
