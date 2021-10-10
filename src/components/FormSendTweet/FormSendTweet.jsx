import { FormControl, FormGroup, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import "./FormSendTweet.scss";
const FormSendTweet = ({ sendTweet, formValue, setFormValue, userLogin }) => {
  const { tweet } = formValue;
  const [wordLength, setWordLength] = useState();

  const handleValue = (e) => {
    if (e.target.name === "tweet") {
      e.target.name.substring(0, e.target.maxLength);
      lengthWords(e.target.value);
    }

    setFormValue((prevValue) => ({
      ...prevValue,
      name: userLogin.name,
      [e.target.name]: e.target.value,
    }));
  };

  const lengthWords = (word) => {
    setWordLength(word.length);
  };

  return (
    <div className="form-send-tweet">
      <h2 className="form-send-tweet__title">Enviar Tweet</h2>
      <form className="form-send-tweet__form" onSubmit={(e) => sendTweet(e)}>
        <FormControl>
          <FormGroup>
            <TextField
              className="form-send-tweet__form-name"
              type="text"
              name={userLogin.name}
              value={userLogin.name}
              onChange={(e) => handleValue(e)}
              placeholder="nombre del usuario"
              margin="normal"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              className="form-send-tweet__form-textarea"
              type="text"
              name="tweet"
              onChange={(e) => handleValue(e)}
              value={tweet}
              inputProps={{ maxLength: 50 }}
              multiline
              rows="6"
              placeholder="escribi tu tweet"
              margin="normal"
            />
            <p>Máximo 50 caracteres</p>
            <p>{wordLength}</p>
          </FormGroup>
          <FormGroup>
            <Button type="submit">Enviar tweet</Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};

export default FormSendTweet;
