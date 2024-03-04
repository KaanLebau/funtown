import { act, render } from "@testing-library/react";
import { atom, selector } from "recoil";
import { localStorageEffect } from "../../model/languageModel";
import { userLanguageState } from "../../model/languageModel";
import { RecoilRoot } from "recoil";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

xtest("saves value to local storage on initialization", () => {
  // Call the atom function with your desired parameters
  const testAtom = atom({
    key: "testAtom",
    default: "initialValue",
    effects_UNSTABLE: [localStorageEffect("testAtom")], // Pass the mock directly
  });

  expect(localStorageMock.getItem).toBeCalledWith("testAtom");
});

test("updates local storage value when atom changes", () => {});
