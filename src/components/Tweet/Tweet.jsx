import { Card, CardContent } from "@material-ui/core";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import "./Tweet.scss";

const Tweet = (props) => {
  const { name, time, tweet, picture } = props.tweet;
  let { id, userLogin } = props;

  //Función para eliminar un tweet
  const deleteTweet = (id) => {
    Swal.fire({
      title: "Estas seguro de querer este tweet?",
      text: "No vas a poder recuperarlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!");
        db.collection("tweets").doc(id).delete();
      }
    });
  };

  return (
    <Card className="tweet__item--card">
      <CardContent>
        <figure>
          <img
            className="tweet__item--picture"
            src={picture}
            alt="Foto de perfil"
          />
        </figure>
        <div className="tweet__header">
          <h5>{name}</h5>
          {userLogin.name === name && (
            <DeleteTwoToneIcon onClick={() => deleteTweet(id)} />
          )}
        </div>
        <p>{tweet}</p>
        <div className="tweet__footer">
          <p>{time}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tweet;
