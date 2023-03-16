import classes from "./AuthPageLoading.module.scss";

const AuthPageLoading = () => {
  return (
    <div className={classes.Container}>
      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          points="20, 1 40,40 1, 40"
        />
        <text fill="#fff" x="5" y="47">
          Please Wait...
        </text>
      </svg>
    </div>
  );
};

export default AuthPageLoading;
