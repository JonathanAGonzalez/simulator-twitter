import { Container, Snackbar, Alert } from "@material-ui/core";
import { useEffect, useState } from "react";
import { firebase, db } from "../../firebase";
import Header from "../Header";
import Loading from "../Loading";
import SendTweet from "../SendTweet";
import TweetsList from "../TweetsList/TweetsList.jsx";
import "./Home.scss";
import Login from "../Login";
let userInLocal = JSON.parse(window.localStorage.getItem("user"));

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [toastProps, setToastProps] = useState({
    open: false,
    success: false,
    warning: false,
    text: null,
  });
  const [loading, setloading] = useState(true);
  const [userLogin, setUserLogin] = useState(userInLocal);

  useEffect(() => {
    db.collection("tweets").onSnapshot((doc) => {
      let tweets = [];
      doc.forEach((doc) => {
        let tweet = {
          id: doc.id,
          tweet: doc.data(),
        };
        tweets.push(tweet);
      });
      setTweets(tweets);
      setloading(false);
    });
  }, []);

  //Función para cerrar el modal
  const handleClose = () => {
    setToastProps({
      open: false,
      text: null,
    });
  };

  //Función para desloguear con Google
  const logOutWithGoogle = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.clear();
        setUserLogin(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Función para iniciar sesión con GOOGLE
  const sigWithGoogle = () => {
    let googleSign = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleSign)
      .then((response) => {
        let user = {
          email: response.additionalUserInfo.profile.email,
          name: response.additionalUserInfo.profile.name,
          picture: response.additionalUserInfo.profile.picture,
        };
        window.localStorage.setItem("user", JSON.stringify(user));
        setUserLogin(response.additionalUserInfo.profile);
      })
      .catch((err) => console.log(err));
  };

  return userLogin ? (
    <Container className="tweets-simulator" maxWidth={false}>
      <Header
        userLogin={userLogin}
        setUserLogin={setUserLogin}
        logOutWithGoogle={logOutWithGoogle}
      />
      <SendTweet
        setToastProps={setToastProps}
        setTweets={setTweets}
        tweets={tweets}
        userLogin={userLogin}
      />
      {loading ? (
        <Loading />
      ) : (
        <TweetsList userLogin={userLogin} tweets={tweets} />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
        open={toastProps.open}
        autoHideDuration={3000}
        message={<span id="message-id">{toastProps.text}</span>}
      >
        <Alert severity={toastProps.warning ? "warning" : "success"}>
          {toastProps.text}
        </Alert>
      </Snackbar>
    </Container>
  ) : (
    <Login sigWithGoogle={sigWithGoogle} />
  );
};

export default Home;
