import React from "react";
import RegistrationView from "../../views/registrationView/RegistrationView";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";

function RegistrationPresenter() {
  const navigate = useNavigate();
  function submit(user) {
    const { username, password } = user;
    try {
      apiModule.registration(username, password);
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
