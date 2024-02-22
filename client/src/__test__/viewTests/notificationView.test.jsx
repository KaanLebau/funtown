//test lib
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { wait } from "@testing-library/user-event/dist/utils";
//wrapper
import { RecoilRoot } from "recoil";
import { languageSelector } from "../../model/languageModel";
import { BrowserRouter } from "react-router-dom";
//componenet
import NotificationView from "../../views/notificationView/NotificationView";

describe("Notification view renders", () => {
  test("testing informations with success icon", () => {
    const information201 = {
      icon: "success",
      code: 201,
      msg: "Successfully created a new user.",
      desc: "language.registredDesc",
      redirect: "language.redirect",
      redirectPath: "props.redirect",
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <NotificationView information={information201} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByTestId("notification-icon-success")).toBeInTheDocument();
    expect(screen.getByTestId("notification-view-content")).toBeInTheDocument();
    expect(screen.getByTestId("notification-code")).toBeInTheDocument();
    expect(screen.getByTestId("notification-msg")).toBeInTheDocument();
    expect(screen.getByTestId("notification-desc")).toBeInTheDocument();
    expect(screen.getByTestId("notification-redirection")).toBeInTheDocument();
  });
  test("testing informations with unAuth icon", () => {
    const information201 = {
      icon: "unAuth",
      code: "props.code",
      msg: "Successfully created a new user.",
      desc: "language.registredDesc",
      redirect: "language.redirect",
      redirectPath: "props.redirect",
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <NotificationView information={information201} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByTestId("notification-icon-unAuth")).toBeInTheDocument();
    expect(screen.getByTestId("notification-view-content")).toBeInTheDocument();
    expect(screen.getByTestId("notification-code")).toBeInTheDocument();
    expect(screen.getByTestId("notification-msg")).toBeInTheDocument();
    expect(screen.getByTestId("notification-desc")).toBeInTheDocument();
    expect(screen.getByTestId("notification-redirection")).toBeInTheDocument();
  });
  test("testing informations with applied icon", () => {
    const information201 = {
      icon: "applied",
      code: "props.code",
      msg: "Successfully created a new user.",
      desc: "language.registredDesc",
      redirect: "language.redirect",
      redirectPath: "props.redirect",
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <NotificationView information={information201} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByTestId("notification-icon-applied")).toBeInTheDocument();
    expect(screen.getByTestId("notification-view-content")).toBeInTheDocument();
    expect(screen.getByTestId("notification-code")).toBeInTheDocument();
    expect(screen.getByTestId("notification-msg")).toBeInTheDocument();
    expect(screen.getByTestId("notification-desc")).toBeInTheDocument();
    expect(screen.getByTestId("notification-redirection")).toBeInTheDocument();
  });
  test("testing informations with updated icon", () => {
    const information201 = {
      icon: "updated",
      code: "props.code",
      msg: "Successfully created a new user.",
      desc: "language.registredDesc",
      redirect: "language.redirect",
      redirectPath: "props.redirect",
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <NotificationView information={information201} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByTestId("notification-icon-updated")).toBeInTheDocument();
    expect(screen.getByTestId("notification-view-content")).toBeInTheDocument();
    expect(screen.getByTestId("notification-code")).toBeInTheDocument();
    expect(screen.getByTestId("notification-msg")).toBeInTheDocument();
    expect(screen.getByTestId("notification-desc")).toBeInTheDocument();
    expect(screen.getByTestId("notification-redirection")).toBeInTheDocument();
  });
  test("testing informations with default icon", () => {
    const information201 = {
      icon: "",
      code: "props.code",
      msg: "Successfully created a new user.",
      desc: "language.registredDesc",
      redirect: "language.redirect",
      redirectPath: "props.redirect",
    };
    render(
      <RecoilRoot>
        <BrowserRouter>
          <NotificationView information={information201} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByTestId("notification-icon")).toBeInTheDocument();
    expect(screen.getByTestId("notification-view-content")).toBeInTheDocument();
    expect(screen.getByTestId("notification-code")).toBeInTheDocument();
    expect(screen.getByTestId("notification-msg")).toBeInTheDocument();
    expect(screen.getByTestId("notification-desc")).toBeInTheDocument();
    expect(screen.getByTestId("notification-redirection")).toBeInTheDocument();
  });
});
