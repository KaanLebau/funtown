import RegistrationView from "../../views/registrationView/RegistrationView";
import { userState } from "../../model/userModel";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import apiModule from "../../api/funtownApi.cjs";

function RegistrationPresenter() {
  const [client, setClient] = useRecoilState(userState);
  const navigate = useNavigate();
  async function submit(user) {
    const { username, password } = user;
    console.log(username, password);
    const response = await apiModule.register(username, password);
    console.log(user);
    setClient(user);
    console.log(response);
    console.log(client);
    navigate("/user");
  } //TODO integeration with backend to login
  return (
    <div data-testid="registration-presenter">
      <RegistrationView onSubmit={submit} />
    </div>
  );
}

export default RegistrationPresenter;
