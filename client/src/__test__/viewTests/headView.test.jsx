/* eslint-disable testing-library/prefer-presence-queries */
import { fireEvent, render, screen, userEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeadView from "../../views/headView/HeadView";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

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
      screen.getByTestId("recruiter-application-list-element")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("recruiter-applicationList-icon")
    ).toBeInTheDocument();
  });
  test("renders user controller elements for recruiter role", () => {
    const language = {
      dashboard: "Dashboard",
      applicationList: "Application List",
      schedule: "Schedule",
    };
    const user = { role: "RECRUITER" };
    const redirectMock = jest.fn();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <HeadView
            user={user}
            active={true}
            redirect={redirectMock}
            language={language}
            languageList={[{ language: "English", code: "en" }]}
          />
        </RecoilRoot>
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("recruiter-dashboard-element")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("recruiter-application-list-element")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("recruiter-schedule-element")
    ).toBeInTheDocument();
  });

  test("renders user controller elements for regular user", () => {
    const language = {
      dashboard: "Dashboard",
      applicationForm: "Application Form",
    };
    const user = { role: "USER" };
    const redirectMock = jest.fn();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <HeadView
            user={user}
            active={true}
            redirect={redirectMock}
            language={language}
            languageList={[{ language: "English", code: "en" }]}
          />
        </RecoilRoot>
      </BrowserRouter>
    );

    expect(screen.getByTestId("user-dashboard-element")).toBeInTheDocument();
    expect(screen.getByTestId("user-application-element")).toBeInTheDocument();
  });

  test("renders language setup", () => {
    const languageList = [{ language: "English", code: "en" }];
    const changeLanguageMock = jest.fn();
    const user = { role: "RECRUITER" };
    const language = {
      dashboard: "Dashboard",
      applicationList: "Application List",
      schedule: "Schedule",
    };
    render(
      <BrowserRouter>
        <RecoilRoot>
          <HeadView
            user={user}
            active={true}
            changeLanguage={changeLanguageMock}
            languageList={languageList}
            language={language}
          />
        </RecoilRoot>
      </BrowserRouter>
    );

    expect(screen.getByTestId("head-view-language-setup")).toBeInTheDocument();
  });

  test("renders language setup and handles language change", () => {
    // Mock data
    const languageList = [
      { language: "English", code: "en" },
      { language: "Svenska", code: "swe" },
    ];
    const changeLanguageMock = jest.fn();

    // Render the component
    render(
      <RecoilRoot>
        <HeadView
          user={{ role: "RECRUITER" }}
          active={true}
          changeLanguage={changeLanguageMock}
          languageList={languageList}
          language={{
            dashboard: "Dashboard",
            applicationList: "Application List",
            schedule: "Schedule",
          }}
        />
      </RecoilRoot>
    );

    // Assertions
    const languageSetup = screen.getByTestId("head-view-language-setup");
    const languageIcon = screen.getByTestId("language-icon");
    const languageListDropdown = screen.getByTestId("language-list");

    // Check if the elements are rendered
    expect(languageSetup).toBeInTheDocument();
    expect(languageIcon).toBeInTheDocument();
    expect(languageListDropdown).toBeInTheDocument();
    expect(languageListDropdown).toHaveValue("en");
    expect(screen.getByText("English")).toBeInTheDocument();

    // Simulate changing the language
    fireEvent.change(languageListDropdown, { target: { value: "swe" } });

    // Check if the changeLanguage function is called with the correct value
    expect(changeLanguageMock).toHaveBeenCalledWith("swe");
  });

  test("handles redirect when user controller elements are clicked", () => {
    const language = {
      dashboard: "Dashboard",
      applicationList: "Application List",
      schedule: "Schedule",
    };
    const user = { role: "RECRUITER" };
    const redirectMock = jest.fn();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <HeadView
            user={user}
            active={true}
            redirect={redirectMock}
            language={language}
            languageList={[{ language: "English", code: "en" }]}
          />
        </RecoilRoot>
      </BrowserRouter>
    );

    const dashboardElement = screen.getByTestId("recruiter-dashboard-element");
    const applicationListElement = screen.getByTestId(
      "recruiter-application-list-element"
    );
    const scheduleElement = screen.getByTestId("recruiter-schedule-element");

    dashboardElement.click();
    applicationListElement.click();
    scheduleElement.click();

    expect(redirectMock).toHaveBeenCalledTimes(3);
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

  test("renders recruiter options", () => {
    // Mock data
    const languageList = [
      { language: "English", code: "en" },
      { language: "Svenska", code: "swe" },
    ];
    const changeLanguageMock = jest.fn();
    const redirectMock = jest.fn();
    const user = { role: "RECRUITER" };

    // Render the component
    render(
      <RecoilRoot>
        <HeadView
          user={user}
          active={true}
          changeLanguage={changeLanguageMock}
          languageList={languageList}
          language={{
            dashboard: "Dashboard",
            applicationList: "Application List",
            schedule: "Schedule",
          }}
          redirect={redirectMock}
        />
      </RecoilRoot>
    );

    // Assertions
    const recruiterDashboardElement = screen.getByTestId(
      "recruiter-dashboard-element"
    );
    const recruiterApplicationListElement = screen.getByTestId(
      "recruiter-application-list-element"
    );
    const recruiterScheduleElement = screen.getByTestId(
      "recruiter-schedule-element"
    );

    // Simulate clicking on recruiter elements
    fireEvent.click(recruiterDashboardElement);
    fireEvent.click(recruiterApplicationListElement);
    fireEvent.click(recruiterScheduleElement);

    // Check if redirect function is called with correct IDs
    expect(redirectMock).toHaveBeenCalledWith("recruiter/dashboard");
    expect(redirectMock).toHaveBeenCalledWith("recruiter/applications");
    expect(redirectMock).toHaveBeenCalledWith("recruiter/schedule");
  });

  test("renders user options", () => {
    // Mock data
    const languageList = [
      { language: "English", code: "en" },
      { language: "Svenska", code: "swe" },
    ];
    const changeLanguageMock = jest.fn();
    const redirectMock = jest.fn();
    const user = { role: "USER" };

    // Render the component
    render(
      <RecoilRoot>
        <HeadView
          user={user}
          active={true}
          changeLanguage={changeLanguageMock}
          languageList={languageList}
          language={{
            dashboard: "Dashboard",
            applicationForm: "Application Form",
          }}
          redirect={redirectMock}
        />
      </RecoilRoot>
    );

    // Assertions
    const userDashboardElement = screen.getByTestId("user-dashboard-element");
    const userApplicationElement = screen.getByTestId(
      "user-application-element"
    );

    // Simulate clicking on user elements
    fireEvent.click(userDashboardElement);
    fireEvent.click(userApplicationElement);

    // Check if redirect function is called with correct IDs
    expect(redirectMock).toHaveBeenCalledWith("user/dashboard");
    expect(redirectMock).toHaveBeenCalledWith("user/application");
  });
});
