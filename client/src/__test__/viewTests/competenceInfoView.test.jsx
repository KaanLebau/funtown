import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import CompetenceInfoView from "../../views/competenceInfoView/CompetenceInfoView";
import userEvent from "@testing-library/user-event";
describe("Competence info view renders", () => {
  const props = {
    experience: [
      { position: "Position 1", experience: "Experience 1" },
      { position: "Position 2", experience: "Experience 2" },
    ],
    newCompetence: jest.fn(), // Mock function
    selectedCompetence: 0,
    setSelectedCompetence: jest.fn(), // Mock function
  };
  const mockNewCompetence = jest.fn();
  test("no data correct ", () => {
    render(
      <RecoilRoot>
        <CompetenceInfoView experience={[]} />
      </RecoilRoot>
    );
    expect(screen.getByTestId("competence-view-title")).toBeInTheDocument();
    expect(screen.getByTestId("p-no-competence")).toBeInTheDocument();
    expect(screen.getByTestId("button-no-competence")).toBeInTheDocument();
  });

  test("renders the competence information when experience array is not empty", () => {
    render(
      <RecoilRoot>
        <CompetenceInfoView {...props} />
      </RecoilRoot>
    );
    expect(screen.getByTestId("position-option-0")).toBeInTheDocument();
  });
  test("calls setSelectedCompetence function with correct index when an option is clicked", async () => {
    render(
      <RecoilRoot>
        <CompetenceInfoView {...props} />
      </RecoilRoot>
    );
    const option1 = screen.getByTestId("position-option-0");
    const option2 = screen.getByTestId("position-option-1");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(option1);
    });

    expect(props.setSelectedCompetence).toHaveBeenCalledWith(0);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(option2);
    });

    expect(props.setSelectedCompetence).toHaveBeenCalledWith(1);
  });
});
