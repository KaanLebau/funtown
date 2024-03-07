import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExperienceView from "../../views/experienceView/ExperienceView";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";

describe("ExperienceView", () => {
  test("renders the alert icon when edit state is true", () => {
    const props = {
      experience: [{ position: "Position 1", experience: "Experience 1" }],
      editStates: [true], // Assuming edit state is true for the first item
      editExperience: jest.fn(),
      updateExperience: jest.fn(),
      removeExperience: jest.fn(),
      addExperience: jest.fn(),
      positions: [],
      experienceOption: [],
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    const alertIcon = screen.getByTestId("alert-icon");
    expect(alertIcon).toBeInTheDocument();
  });

  test("calls addExperience function with correct parameters when add button is clicked", () => {
    // Define mock functions and necessary props
    const addExperienceMock = jest.fn();
    const props = {
      experience: [],
      editStates: [],
      editExperience: jest.fn(),
      updateExperience: jest.fn(),
      removeExperience: jest.fn(),
      addExperience: addExperienceMock, // Pass the mock function
      positions: ["Position 1", "Position 2"], // Mock data for positions
      experienceOption: ["Experience 1", "Experience 2"], // Mock data for experience options
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    // Select elements needed for the test
    const positionSelect = screen.getByTestId("position-alternatives");
    const experienceSelect = screen.getByTestId("experience-alternatives");
    const addButton = screen.getByTestId("add-experience-button");

    // Simulate user interaction: select position and experience, then click add button
    userEvent.selectOptions(positionSelect, "Position 1");
    userEvent.selectOptions(experienceSelect, "Experience 1");
    userEvent.click(addButton);

    // Verify that addExperience function is called with correct parameters
    expect(addExperienceMock).toHaveBeenCalledWith({
      position: "Position 1",
      experience: "Experience 1",
    });
  });

  test("renders select inputs and add button when experience length is not equal to positions length", () => {
    // Define mock functions and necessary props
    const addExperienceMock = jest.fn();
    const props = {
      experience: [{ position: "Position 1", experience: "Experience 1" }],
      editStates: [],
      editExperience: jest.fn(),
      updateExperience: jest.fn(),
      removeExperience: jest.fn(),
      addExperience: addExperienceMock,
      positions: ["Position 1", "Position 2"], // Mock data for positions
      experienceOption: ["Experience 1", "Experience 2"], // Mock data for experience options
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    // Select elements needed for the test
    const positionSelect = screen.getByTestId("position-alternatives");
    const experienceSelect = screen.getByTestId("experience-alternatives");
    const addButton = screen.getByTestId("add-experience-button");

    // Verify that select inputs and add button are rendered
    expect(positionSelect).toBeInTheDocument();
    expect(experienceSelect).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("calls editExperience function with correct index when edit icon is clicked", () => {
    // Define mock functions and necessary props
    const editExperienceMock = jest.fn();
    const props = {
      experience: [
        { position: "Position 1", experience: "Experience 1" },
        { position: "Position 2", experience: "Experience 2" },
      ],
      editStates: [false, false],
      editExperience: editExperienceMock,
      updateExperience: jest.fn(),
      removeExperience: jest.fn(),
      addExperience: jest.fn(),
      positions: [],
      experienceOption: [],
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    // Get the edit icons
    const editIcons = screen.getAllByTestId("edit-experience-icon");

    // Click the first edit icon
    userEvent.click(editIcons[0]);

    // Verify that editExperience function is called with correct index
    expect(editExperienceMock).toHaveBeenCalledWith(0);

    // Click the second edit icon
    userEvent.click(editIcons[1]);

    // Verify that editExperience function is called with correct index
    expect(editExperienceMock).toHaveBeenCalledWith(1);
  });
  test("calls removeExperience function with correct index when remove icon is clicked", async () => {
    // Define mock functions and necessary props
    const removeExperienceMock = jest.fn();
    const props = {
      experience: [
        { position: "Position 1", experience: "Experience 1" },
        { position: "Position 2", experience: "Experience 2" },
      ],
      editStates: [false, true], // Set edit mode for the second item
      editExperience: jest.fn(),
      updateExperience: jest.fn(),
      removeExperience: removeExperienceMock,
      addExperience: jest.fn(),
      positions: [],
      experienceOption: [],
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    // Wait for the component to update
    await waitFor(() => {
      // Get the remove icon
      const removeIcon = screen.getByTestId("remove-experience-icon");
      // Verify that the remove icon is visible
      expect(removeIcon).toBeInTheDocument();
    });

    // Click the remove icon
    const removeIcon = screen.getByTestId("remove-experience-icon");
    userEvent.click(removeIcon);

    // Verify that removeExperience function is called with correct index
    expect(removeExperienceMock).toHaveBeenCalledWith(1);
  });

  test("calls updateExperience function with correct parameters when refresh icon is clicked", async () => {
    // Define mock functions and necessary props
    const updateExperienceMock = jest.fn();
    const props = {
      experience: [
        { position: "Position 1", experience: "Experience 1" },
        { position: "Position 2", experience: "Experience 2" },
      ],
      editStates: [true, false], // Set both items to not be in edit mode initially
      editExperience: jest.fn(),
      updateExperience: updateExperienceMock,
      removeExperience: jest.fn(),
      addExperience: jest.fn(),
      positions: [],
      experienceOption: [],
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    // Get the edit icons
    const editIcons = screen.getAllByTestId("edit-experience-icon");

    // Click the first edit icon
    userEvent.click(editIcons[0]);

    // Wait for the component to update
    await waitFor(() => {
      // Get the refresh icon
      const refreshIcon = screen.getByTestId("update-experience-icon");
      // Verify that the refresh icon is displayed
      expect(refreshIcon).toBeInTheDocument();
    });

    // Get the refresh icon
    const refreshIcon = screen.getByTestId("update-experience-icon");

    // Click the refresh icon
    userEvent.click(refreshIcon);

    // Wait for the component to update after clicking refresh icon
    await waitFor(() => {
      // Verify that updateExperience function is called with correct parameters
      expect(updateExperienceMock).toHaveBeenCalled();
    });
  });

  test("calls addExperience function with correct parameters when Add button is clicked", () => {
    // Define mock function and necessary props
    const addExperienceMock = jest.fn();
    const props = {
      experience: [],
      editStates: [],
      editExperience: jest.fn(),
      updateExperience: jest.fn(),
      removeExperience: jest.fn(),
      addExperience: addExperienceMock,
      positions: ["Position 1", "Position 2"],
      experienceOption: ["Experience 1", "Experience 2"],
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    // Get the Add button
    const addButton = screen.getByTestId("add-experience-button");

    // Set values for position and experience selects
    const positionSelect = screen.getByTestId("position-alternatives");
    const experienceSelect = screen.getByTestId("experience-alternatives");
    userEvent.selectOptions(positionSelect, props.positions[0]);
    userEvent.selectOptions(experienceSelect, props.experienceOption[0]);

    // Click the Add button
    userEvent.click(addButton);

    // Verify that addExperience function is called with correct parameters
    expect(addExperienceMock).toHaveBeenCalledWith({
      position: props.positions[0],
      experience: props.experienceOption[0],
    });
  });
  test("renders select inputs and add button when experience length is equal to positions length", () => {
    // Define mock functions and necessary props
    const addExperienceMock = jest.fn();
    const props = {
      experience: [{ position: "Position 1", experience: "Experience 1" }],
      editStates: [],
      editExperience: jest.fn(),
      updateExperience: jest.fn(),
      removeExperience: jest.fn(),
      addExperience: addExperienceMock,
      positions: ["Position 1"], // Experience length is equal to positions length
      experienceOption: ["Experience 1"],
      dashboard: false,
      dashboardUpdate: jest.fn(),
    };

    render(
      <RecoilRoot>
        <ExperienceView {...props} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("full-experience-msg")).toBeInTheDocument();
  });
});
