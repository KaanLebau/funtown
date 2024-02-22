import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AvailabilityView from "../../views/availabilityView/AvailabilityView";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe("AvailabilityView component", () => {
  const noErr = { state: false, msg: "" };
  test("renders availability title correctly", () => {
    const availabilityTitle = "Availability";
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView availabilityList={[]} err={noErr} />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId("availability-view-titel")).toBeInTheDocument();
  });

  test("renders no data message when availability list is empty", () => {
    const noDataMessage = "No availability data available";
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView availabilityList={[]} err={noErr} />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId("availability-view-no-data")).toBeInTheDocument();
  });

  test("renders availability list correctly", () => {
    const availabilityList = [
      { id: 1, from: "2022-03-01", to: "2022-03-05" },
      { id: 2, from: "2022-03-10", to: "2022-03-15" },
    ];
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView availabilityList={availabilityList} err={noErr} />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId("availability-list").children.length).toBe(
      availabilityList.length
    );
  });

  test("renders availability controller elements correctly", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView availabilityList={[]} err={noErr} />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(
      screen.getByTestId("availability-from-selector")
    ).toBeInTheDocument();
    expect(screen.getByTestId("availability-to-selector")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("renders error message container when error state is true", () => {
    const errorMessage = "Error: Invalid date range";
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView
            availabilityList={[]}
            err={{ state: true, msg: errorMessage }}
          />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(
      screen.getByTestId("availability-error-container")
    ).toBeInTheDocument();
    expect(screen.getByTestId("availability-error-msg")).toBeInTheDocument();
  });

  test("calls handleDates prop when input values change", async () => {
    const handleDatesMock = jest.fn();
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView
            err={noErr}
            availabilityList={[]}
            handleDates={handleDatesMock}
          />
        </RecoilRoot>
      </BrowserRouter>
    );

    const fromInput = screen.getByTestId("availability-from-selector");
    const toInput = screen.getByTestId("availability-to-selector");

    await act(async () => {
      await userEvent.type(fromInput, "2022-03-01");
      await userEvent.type(toInput, "2022-03-05");
    });

    expect(handleDatesMock).toHaveBeenCalledTimes(2);
    expect(handleDatesMock).toHaveBeenCalledWith({
      id: "from",
      value: "2022-03-01",
    });
    expect(handleDatesMock).toHaveBeenCalledWith({
      id: "to",
      value: "2022-03-05",
    });
  });

  test("calls add prop when add button is clicked", async () => {
    const addMock = jest.fn();
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView err={noErr} availabilityList={[]} add={addMock} />
        </RecoilRoot>
      </BrowserRouter>
    );

    const addButton = screen.getByText("Add");
    await act(async () => {
      userEvent.click(addButton);
    });

    expect(addMock).toHaveBeenCalledTimes(1);
  });

  test("calls remove prop with correct index when remove icon is clicked", async () => {
    const removeMock = jest.fn();
    const availabilityList = [{ id: 1, from: "2022-03-01", to: "2022-03-05" }];
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AvailabilityView
            availabilityList={availabilityList}
            err={noErr}
            remove={removeMock}
          />
        </RecoilRoot>
      </BrowserRouter>
    );

    const removeIcon = screen.getByTestId("availability-list-element-icon");
    await act(async () => {
      userEvent.click(removeIcon);
    });

    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(removeMock).toHaveBeenCalledWith(0); // Index of the item in the availability list
  });
});
