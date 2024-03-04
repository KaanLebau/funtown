//test lib
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { wait } from "@testing-library/user-event/dist/utils";
//wrapper
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
//componenet
import RegistrationView from "../../views/registrationView/RegistrationView";

const mockSubmit = jest.fn();

describe("Registration view renders", () => {
  test("labels correctly", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationView />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(
      screen.getByTestId("registration-form-view-firstname")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("registration-form-view-lastname")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("registration-form-view-username")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("registration-form-view-email")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("registration-form-view-pnr")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("registration-form-view-password")
    ).toBeInTheDocument();
  });
  test("button correctly", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationView />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(
      screen.getByTestId("registration-form-view-submit-button")
    ).toBeInTheDocument();
  });

  test("error messages correctly", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationView onSubmit={mockSubmit} />
        </RecoilRoot>
      </BrowserRouter>
    );
    const userInteract = screen.getByTestId(
      "registration-form-view-submit-button"
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(userInteract);
    });

    expect(screen.getByTestId("firstNameErr")).not.toBe(null);
    expect(screen.getByTestId("firstNameErr")).toHaveTextContent(
      "First name required!"
    );

    expect(screen.getByTestId("lastNameErr")).not.toBe(null);
    expect(screen.getByTestId("lastNameErr")).toHaveTextContent(
      "Last name required!"
    );

    expect(screen.getByTestId("userNameErr")).not.toBe(null);
    expect(screen.getByTestId("userNameErr")).toHaveTextContent(
      "Username required!"
    );

    expect(screen.getByTestId("emailErr")).not.toBe(null);
    expect(screen.getByTestId("emailErr")).toHaveTextContent(
      "Email address required!"
    );

    expect(screen.getByTestId("pnrErr")).not.toBe(null);
    expect(screen.getByTestId("pnrErr")).toHaveTextContent(
      "Person number required!"
    );

    expect(screen.getByTestId("passwordErr")).not.toBe(null);
    expect(screen.getByTestId("passwordErr")).toHaveTextContent(
      "Password required!"
    );
  });

  test("wrong email err correcly", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationView onSubmit={mockSubmit} />
        </RecoilRoot>
      </BrowserRouter>
    );
    const userInteract = screen.getByTestId(
      "registration-form-view-submit-button"
    );
    const inputEmail = screen.getByTestId("registration-form-view-email");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(inputEmail, "test");
      await userEvent.click(userInteract);
    });

    await wait(() => {
      expect(screen.getByTestId("emailErr")).not.toBe(null);
      expect(screen.getByTestId("emailErr")).toHaveTextContent(
        "Invalid email address!"
      );
    });
  });

  test("user input correctly", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationView onSubmit={mockSubmit} />
        </RecoilRoot>
      </BrowserRouter>
    );
    const userInteract = screen.getByTestId(
      "registration-form-view-submit-button"
    );
    const inputName = screen.getByTestId("registration-form-view-firstname");
    const inputLastName = screen.getByTestId("registration-form-view-lastname");
    const inputUsername = screen.getByTestId("registration-form-view-username");
    const inputEmail = screen.getByTestId("registration-form-view-email");
    const inputPnr = screen.getByTestId("registration-form-view-pnr");
    const inputPassword = screen.getByTestId("registration-form-view-password");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(inputName, "test name");
      await userEvent.type(inputLastName, "test last name");
      await userEvent.type(inputEmail, "test@email.com");
      await userEvent.type(inputPnr, "19900101-1234");
      await userEvent.type(inputUsername, "test user");
      await userEvent.type(inputPassword, "test password");

      await userEvent.click(userInteract);
    });

    expect(mockSubmit).toHaveBeenCalledWith({
      firstName: "test name",
      lastName: "test last name",
      email: "test@email.com",
      pnr: "19900101-1234",
      username: "test user",
      password: "test password",
    });
  });
});
