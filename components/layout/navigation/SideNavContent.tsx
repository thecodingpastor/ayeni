import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import navData from "./data";
import { LogOut } from "../../../features/auth/authApi";

type IProps = {
  handleClose: () => void;
};

const SideNavContent: React.FC<IProps> = ({ handleClose }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(LogOut());
    handleClose();
  };

  return (
    <>
      {navData.map((item) => (
        <span onClick={handleClose} key={item.text}>
          <Link href={item.href}>{item.text}</Link>
        </span>
      ))}

      {accessToken && (
        <>
          <span onClick={handleClose}>
            <Link href="/create-blog">Create Blog</Link>
          </span>
          <span onClick={handleClose}>
            <Link href="/create-project">Create Project</Link>
          </span>
          <span onClick={handleLogOut}>
            <Link href="/">Logout</Link>
          </span>
        </>
      )}
    </>
  );
};

export default SideNavContent;
