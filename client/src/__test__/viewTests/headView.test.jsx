/* eslint-disable testing-library/prefer-presence-queries */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeadView from "../../views/headView/HeadView";
import { RecoilRoot } from "recoil";

const languageEN = {
  //page relaterade information
  login: "login",
  Login: "Login",
  Register: "Register",
  register: "register",
  dashboard: "Dashboard",
  //user related information
  username: "Username",
  password: "Password",
  firstname: "First name",
  lastname: "Last name",
  email: "Email",
  pnr: "Person number",
  // required err msg
  usernameReq: "Username required!",
  passwordReq: "Password required!",
  firstnameReq: "First name required!",
  lastnameReq: "Last name required!",
  emailReq: "Email address required!",
  pnrReq: "Person number required!",
  //constraint err msg
  usernameContrain: "Username must be at least 5 characters long!",
  firstnameConstrain: "First name must be at least 2 characters long!",
  lastnameConstrain: "Last name must be at least 2 characters long!",
  emailConstrain: "Invalid email address!",
  pnrConstrain: "Input must follow the pattern YYYYMMDD-NNNN",
  passwordConstrain: "Password must be at least 8 characters long!",
  //button and title related information
  submit: "Submit",
  save: "Save",
  add: "Add",
  edit: "Edit",
  cancel: "Cancel",
  remove: "Remove",
  apply: "Apply",
  addExperience: "Add experience",
  updateExperience: "Update experience",
  editExperience: "Edit experience",
  removeExperience: "Remove experience",
  // Application
  applicationTitle: "Apply for a job",
  applicationCompetenceTitle: "Your Competence",
  applicationForm: "Application form",
  applicationList: "Applications",
  //Compotence related
  competencePosition: "Position",
  competenceExperience: "Experience",
  competenceEmpty: "Add your experiences",
  competenceFull: "All available positions are filled with experience",
  schedule: "Schedule",
};
const languageList = [
  { code: "en", language: "English" },
  { code: "swe", language: "Svenska" },
];

describe("Head view renders", () => {
  test("No user logged in and Language icon and selector correctly", () => {
    render(
      <RecoilRoot>
        <HeadView languageList={languageList} active={false} />
      </RecoilRoot>
    );
    ///expect(screen.getByTestId("user-application-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("language-list")).toBeInTheDocument();
    expect(screen.getByTestId("language-icon")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(2);
  });
  test("An user with RECRUITER role logged in and recruiter tools render correctly", () => {
    const user = { role: "RECRUITER" };
    render(
      <RecoilRoot>
        <HeadView
          user={user}
          active={true}
          languageList={languageList}
          language={languageEN}
        />
      </RecoilRoot>
    );
    expect(screen.getByTestId("language-list")).toBeInTheDocument();
    expect(screen.getByTestId("language-icon")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(2);
    expect(
      screen.getByTestId("recruiter-dashboard-element")
    ).toBeInTheDocument();
    expect(screen.getByTestId("recruiter-dashboard-icon")).toBeInTheDocument();
    expect(
      screen.getByTestId("recruiter-schedule-element")
    ).toBeInTheDocument();
    expect(screen.getByTestId("recruiter-schedule-icon")).toBeInTheDocument();
    expect(
      screen.getByTestId("recruiter-applicationList-element")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("recruiter-applicationList-icon")
    ).toBeInTheDocument();
  });

  test("An user with APPLICANT role logged in and applicant tools render correctly", () => {
    const user = { role: "APPLICANT" };
    render(
      <RecoilRoot>
        <HeadView
          user={user}
          active={true}
          languageList={languageList}
          language={languageEN}
        />
      </RecoilRoot>
    );
    expect(screen.getByTestId("language-list")).toBeInTheDocument();
    expect(screen.getByTestId("language-icon")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(2);
    expect(screen.getByTestId("user-dashboard-element")).toBeInTheDocument();
    expect(screen.getByTestId("user-application-element")).toBeInTheDocument();
    expect(screen.getByTestId("user-application-icon")).toBeInTheDocument();
  });
});
