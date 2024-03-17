import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AvailabilityPresenter from "../../presenters/availabilityPresenter/AvailabilityPresenter";

describe("Add availability", () => {
  test("handles error when adding availability with empty dates", async () => {
    render(
      <RecoilRoot>
        <AvailabilityPresenter />
      </RecoilRoot>
    );

    const addButton = screen.getByText("Add");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(addButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("availability-error-msg");

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
