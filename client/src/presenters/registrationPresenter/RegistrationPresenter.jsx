import React from "react";
import RegistrationView from "../../views/registrationView/RegistrationView";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";

function RegistrationPresenter() {
  const navigate = useNavigate();
  async function submit(user) {
    const { username, password } = user;
    console.log(username);
    console.log(password);
    try {
      const client = await apiModule.registration(username, password);
      console.log(
        "******************* server respons *******************************"
      );

      console.log(client);
      //console.log(
      // "******************* user input *******************************"
      //);
      //console.log(user);
      navigate("/notification", {
        replace: true,
        state: { redirect: "/user/dashboard", code: 201 },
      });
    } catch (error) {
      console.error(
        "An error occurred during registration:",
        error.response || error
      );
      navigate("/notification", {
        replace: true,
        state: { redirect: "/user/dashboard", code: 401 },
      });
    }
  }
  return (
    <div data-testid="registration-presenter">
      <RegistrationView onSubmit={submit} />
    </div>
  );
}

export default RegistrationPresenter;
