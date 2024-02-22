import React from "react";
import { render } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import {
  positionOptions,
  statusOptions,
  experienceOptions,
} from "../../model/businessModel";

// Define mock components for testing
const TestComponent = ({ atom }) => {
  const value = useRecoilValue(atom);
  return <div>{JSON.stringify(value)}</div>;
};

describe("Recoil Atoms", () => {
  test("should have default position options", () => {
    const { container } = render(
      <RecoilRoot>
        <TestComponent atom={positionOptions} />
      </RecoilRoot>
    );
    expect(container.textContent).toEqual(
      JSON.stringify(["ticket sales", "roller coaster operation", "lotteries"])
    );
  });

  test("should have default status options", () => {
    const { container } = render(
      <RecoilRoot>
        <TestComponent atom={statusOptions} />
      </RecoilRoot>
    );
    expect(container.textContent).toEqual(
      JSON.stringify(["accepted", "rejected", "unhandled"])
    );
  });

  test("should have default experience options", () => {
    const { container } = render(
      <RecoilRoot>
        <TestComponent atom={experienceOptions} />
      </RecoilRoot>
    );
    expect(container.textContent).toEqual(
      JSON.stringify(["0 -> 1 year", "1.1 -> 2 year", "2.1 -> 3", "3.1 -> "])
    );
  });
});
