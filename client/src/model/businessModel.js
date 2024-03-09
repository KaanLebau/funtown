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

export const statusOptions = atom({
  key: "statusOptions",
  default: ["ACCEPTED", "REJECTED", "UNHANDLED"],
});

export const experienceOptions = atom({
  key: "experienceOptions",
  default: ["0 -> 1 year", "1.1 -> 2 year", "2.1 -> 3 year", "3.1 -> year"],
});
