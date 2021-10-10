import { useState } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import { v4 as uuid } from "uuid";
import ModalContainer from "../ModalContainer/ModalContainer";
import FormSendTweet from "../FormSendTweet/FormSendTweet";
import "./SendTweet.scss";
import { db } from "../../firebase";
let initialState = {
  name: "",
  tweet: "",
};

const SendTweet = ({ setToastProps, userLogin }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formValue, setFormValue] = useState(initialState);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    let { tweet } = formValue;

    if (!tweet.trim()) {
      setToastProps({
        open: true,
        text: "Warning: Todos los campos son obligatorios",
        warning: true,
      });
    } else {
      formValue.time = moment().format("LLL");
      formValue.id = uuid();
      formValue.picture = userLogin.picture;
      db.collection("tweets").add(formValue);
      setFormValue(initialState);
      setToastProps({
        open: true,
        text: "Success: Tweet agregado correctamente",
        succes: true,
      });
      setIsOpenModal(false);
    }
  };

  return (
    <article className="send-tweet">
      <Fab
        onClick={openModal}
        className="send-tweet__open-modal"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
        <div className="form-send-container">
          <FormSendTweet
            userLogin={userLogin}
            sendTweet={sendTweet}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        </div>
      </ModalContainer>
    </article>
  );
};

export default SendTweet;
