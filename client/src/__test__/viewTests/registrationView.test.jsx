import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RegistrationView from "../../views/registrationView/RegistrationView";
import { wait } from "@testing-library/user-event/dist/utils";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

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
    expect(screen.getByText("First Name:")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Person nr:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
  });
  test("button correctly", () => {
    render(<RegistrationView />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("error messages correctly", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationView onSubmit={mockSubmit} />
        </RecoilRoot>
      </BrowserRouter>
    );
    const userInteract = screen.getByRole("button");

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
    expect(screen.getByTestId("emailErr")).toHaveTextContent("Email required!");

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
    const userInteract = screen.getByRole("button");
    const inputEmail = screen.getByTitle("Email");

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
    const userInteract = screen.getByRole("button");
    const inputName = screen.getByTitle("First name");
    const inputLastName = screen.getByTitle("Last name");
    const inputUsername = screen.getByTitle("Username");
    const inputEmail = screen.getByTitle("Email");
    const inputPnr = screen.getByTitle("Person number");
    const inputPassword = screen.getByTitle("Password");

    await act(async () => {
      await userEvent.type(inputName, "test name");
      await userEvent.type(inputLastName, "test last name");
      await userEvent.type(inputEmail, "test@email.com");
      await userEvent.type(inputPnr, "123456789");
      await userEvent.type(inputUsername, "test user");
      await userEvent.type(inputPassword, "test password");

      await userEvent.click(userInteract);
    });

    expect(mockSubmit).toHaveBeenCalledWith({
      firstName: "test name",
      lastName: "test last name",
      email: "test@email.com",
      pnr: "123456789",
      username: "test user",
      password: "test password",
    });
  });
});
