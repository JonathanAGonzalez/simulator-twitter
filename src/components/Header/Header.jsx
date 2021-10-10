import { Button } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/logo.png";
import "./Header.scss";
const Header = ({ userLogin: { name }, logOutWithGoogle }) => {
  return (
    <header className="header">
      <div>
        <img src={logo} alt="Logo Firebase" />
        <h1>Te damos la bienvenida {name}</h1>
      </div>
      <Button variant="outlined" onClick={logOutWithGoogle}>
        Cerrar sesión <LogoutIcon />
      </Button>
    </header>
  );
};

export default Header;
