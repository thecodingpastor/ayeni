import { GrSend } from "react-icons/gr";

import classes from "./ContactButton.module.scss";

interface IProps {
  onClick: () => void;
}
const ContactButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <a className={classes.Container} onClick={onClick}>
      Contact
      <GrSend />
    </a>
  );
};

export default ContactButton;
