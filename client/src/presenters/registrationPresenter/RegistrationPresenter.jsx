import React from "react";
import RegistrationView from "../../views/registrationView/RegistrationView";

function RegistrationPresenter() {
  function submit(user) {} //TODO integeration with backend to login
  return (
    <div data-testid="registration-presenter">
      <RegistrationView onSubmit={submit} />
    </div>
  );
}

export default RegistrationPresenter;
