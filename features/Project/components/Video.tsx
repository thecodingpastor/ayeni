// import YouTube, { YouTubeProps } from "react-youtube";
import classes from "./Video.module.scss";
const Video: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className={classes.Container}>
      <video src={src} autoPlay controls loop></video>
    </div>
  );
};

// const Video = () => {
//   const onPlayerReady: YouTubeProps["onReady"] = (event) => {
//     // access to player in all event handlers via event.target
//     event.target.playVideo();
//   };

//   const opts: YouTubeProps["opts"] = {
//     height: "480vh",
//     width: "100%",
//     // height: "390",
//     // width: "640",
//     playerVars: {
//       // https://developers.google.com/youtube/player_parameters
//       autoplay: 0,
//     },
//   };

//   return (
//     <div className={classes.Container}>
//       <YouTube videoId="cXlIKpHGwkc" opts={opts} onReady={onPlayerReady} />
//     </div>
//   );
// };

export default Video;
