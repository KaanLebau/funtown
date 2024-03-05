import { atom } from "recoil";

export const positionOptions = atom({
  key: "positionOptions",
  default: ["ticket sales", "roller coaster operation", "lotteries"],
});

export const statusOptions = atom({
  key: "statusOptions",
  default: ["accepted", "rejected", "unhandled"],
});

export const experienceOptions = atom({
  key: "experienceOptions",
  default: ["0 -> 1 year", "1.1 -> 2 year", "2.1 -> 3", "3.1 -> "],
});
