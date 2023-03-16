import classes from "./Bubble.module.scss";

const Bubble = () => {
  return (
    <div>
      <section className={classes.Container}>
        <figure className={`${classes.ball} ${classes.bubble}`}></figure>
      </section>
    </div>
  );
};

export default Bubble;
