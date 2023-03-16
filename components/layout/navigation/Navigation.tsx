import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "./Logo";
import SideNav from "./SideNav";
import HamburgerContainer from "./HamburgerContainer";
import ContactButton from "./ContactButton";
import Modal from "../../modal/Modal";
import ContactForm from "../../general/ContactForm";

import { RiSuitcase2Line } from "react-icons/ri";
import { FaBloggerB } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { LogOut } from "../../../features/auth/authApi";
import navData from "./data";

import { MenuMode } from "./types";

import classes from "./Navigation.module.scss";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { pathname } = useRouter();

  const [ShowSideNav, setShowSideNav] = useState(false);
  const [ShowContactModal, setShowContactModal] = useState(false);
  const [Animate, setAnimate] = useState<MenuMode>("x-leave");

  const handleHamburgerClick = () => {
    if (ShowSideNav) {
      setShowSideNav(false);
      setAnimate("x-leave");
    } else {
      setAnimate("x-enter");
      setShowSideNav(true);
    }
  };

  const ToggleContactModal = () => {
    setShowContactModal((prev) => !prev);
  };

  const handleLogout = () => {
    setShowSideNav(false);
    dispatch(LogOut());
  };

  return (
    <>
      <Modal
        isOpen={ShowContactModal}
        close={() => setShowContactModal(false)}
        disableBackgroundClick
      >
        <ContactForm />
      </Modal>

      <header className={classes.Container}>
        <Logo />

        <HamburgerContainer
          IsOpen={ShowSideNav}
          onClick={handleHamburgerClick}
          animate={Animate}
          setAnimate={setAnimate}
        />

        <SideNav
          onClose={handleHamburgerClick}
          animate={Animate}
          ToggleContactModal={ToggleContactModal}
        />

        <nav>
          {navData.map((item) => (
            <Link
              href={item.href}
              key={item.text}
              className={pathname === item.href ? classes.Active : ""}
            >
              {item.text}
            </Link>
          ))}
          {accessToken ? (
            <div>
              <Link
                href="/create-blog"
                className={pathname === "/create-blog" ? classes.Active : ""}
              >
                <FaBloggerB />
              </Link>
              <Link
                href="/create-project"
                className={pathname === "/create-project" ? classes.Active : ""}
              >
                <RiSuitcase2Line />
              </Link>
              <Link href="/" onClick={handleLogout}>
                <AiOutlineLogout />
              </Link>
            </div>
          ) : (
            <ContactButton onClick={ToggleContactModal} />
          )}
        </nav>
      </header>
    </>
  );
};

export default Navigation;
