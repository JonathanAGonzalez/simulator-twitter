import { Grid } from "@material-ui/core";
import Tweet from "../Tweet";
import "./TweetsList.scss";

const TweetsList = ({ tweets, userLogin }) => {
  return tweets.length === 0 ? (
    <div className="tweets__empty">
      <h2>No hay tweets</h2>
    </div>
  ) : (
    <Grid container className="tweets__list">
      {tweets.map((tweet) => (
        <Grid key={tweet.id} item xs={3} className="tweets__item">
          <Tweet userLogin={userLogin} {...tweet} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TweetsList;
