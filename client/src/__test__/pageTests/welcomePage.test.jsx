import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import WelcomePage from "../../pages/welcomePage/WelcomePage";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
import user from "@testing-library/user-event";
import { RecoilRoot } from "recoil";

const navigate = jest.fn();
beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});
describe("Welcome page renders", () => {
  test("aternatives correctly", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <WelcomePage />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("icons correctly", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <WelcomePage />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTitle("To login")).toBeInTheDocument();
    expect(screen.getByTitle("To registration")).toBeInTheDocument();
  });

  test("login routes correctly", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <WelcomePage />
        </RecoilRoot>
      </BrowserRouter>
    );
    await act(async () => {
      await user.click(screen.getByTitle("Login"));
    });

    expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toHaveBeenCalledWith("./");
    expect(navigate).toHaveBeenCalledWith("./login");
  });
  test("registration routes correctly", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <WelcomePage />
        </RecoilRoot>
      </BrowserRouter>
    );
    await act(async () => {
      await user.click(screen.getByTitle("Registration"));
    });

    expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toHaveBeenCalledWith("./");
    expect(navigate).toHaveBeenCalledWith("./registration");
  });
});
