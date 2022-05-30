import React from "react";
import styles from "../styles/Header.module.scss";
import { signOut } from "next-auth/react";

const Header = ({ user }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTitle}>
        <h1>Task Manager - {user.name}</h1>
      </div>
      <div className={styles.headerButtonContainer}>
        <button className={styles.headerButton} type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
