import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@material-ui/core";
import logo from "../../assets/logo.png";
import "./Login.scss";
const Login = ({ sigWithGoogle }) => {
  return (
    <div className="login__container">
      <div>
        <img src={logo} alt="Logo" />
        <Button onClick={sigWithGoogle} variant="contained" disableElevation>
          <LoginIcon />
          Logueate con tu cuenta <GoogleIcon />
          oogle
        </Button>
      </div>
    </div>
  );
};

export default Login;
