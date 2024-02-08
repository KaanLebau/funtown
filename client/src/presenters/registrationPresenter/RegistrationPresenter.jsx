import React from "react";
import RegistrationView from "../../views/registrationView/RegistrationView";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";

function RegistrationPresenter() {
  const navigate = useNavigate();
  async function submit(user) {
    const { username, password } = user;
    try {
      const client = await apiModule.registration(username, password);
      console.log(
        "******************* server respons *******************************"
      );

      console.log(client);
      console.log(
        "******************* user input *******************************"
      );
      console.log(user);
      navigate("/user");
    } catch (error) {}
  }
  return (
    <div data-testid="registration-presenter">
      <RegistrationView onSubmit={submit} />
    </div>
  );
}

export default RegistrationPresenter;
