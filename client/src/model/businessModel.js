import { atom, selector } from "recoil";

export const currentPositions = atom({
    key: 'currentPositions', 
    default: [
        "ticket sales",
        "roller coaster operation",
        "lotteries", 
    ]
  });

export const statusOptions = atom({
    key: 'statusOptions', 
    default: [
        "accepted",
        "rejected",
        "unhandled",
    ]
  });