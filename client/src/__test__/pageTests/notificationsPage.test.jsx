import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import NotificationPage from "../../pages/notificationsPage/NotificationPage";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: { redirect: "/user/dashboard", code: 201 }, // Mock location state
  }),
}));

describe("NotificationsPage Component", () => {
  test("renders NotificationsPage component", () => {
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={["/notification"]}>
          <NotificationPage />
        </MemoryRouter>
      </RecoilRoot>
    );
    const notificationPresenter = screen.getByTestId(
      "notification-presenter-componenet"
    );

    expect(notificationPresenter).toBeInTheDocument();
  });
});
