import React from "react";
import { act, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import App from "../App.js";
import { createRoot } from "react-dom/client";
import "@testing-library/jest-dom";

xdescribe("App component", () => {
  test("renders without crashing", async () => {
    const div = document.createElement("div");

    act(async () => {
      const root = createRoot(div);
      root.render(
        <React.StrictMode>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </React.StrictMode>
      );
      await waitFor(() => {
        expect(screen.getByTestId("app-componenet")).toBeInTheDocument();
      });
      // Optionally, you can also assert something here
    });

    // No need for a new act block here
    const root = createRoot(div);
    act(async () => {
      await root.unmount();
    });
  });
});
