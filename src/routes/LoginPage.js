import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../lib/fbase";
import styles from "../style/loginPage.module.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";

const LoginPage = (setUser) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || !email.includes("@")) {
      setEmail("");
      setPassword("");
      setEmailError(true);
      return;
    }
    if (password === "" || password.length < 8) {
      setPassword("");
      setEmailError(false);
      setPasswordError(true);
      return;
    }
    try {
      setUser(await signInWithEmailAndPassword(authService, email, password));
      navigate("/");
    } catch ({ message }) {
      setPassword("");
      if (message === "Firebase: Error (auth/user-not-found).") {
        setEmail("");
        setEmailError(true);
      }
      if (message === "Firebase: Error (auth/wrong-password).") {
        setEmailError(false);
        setPasswordError(true);
      }
    }
  };
  const onPasswordResetClick = () => {
    navigate("/resetpassword");
  };

  const onClick = () => {
    navigate("/register");
  };

  const onAuthWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(authService, googleProvider);
      if ((await getDoc(doc(dbService, "users", user.email))).exists()) {
        navigate("/");
        return;
      }
      await setDoc(doc(dbService, "users", user.email), {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        nickName: user.email.split("@")[0],
        clubPosition: ["", ""],
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>?????????</title>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.img} />
            <div className={styles.title}>AJOUBOARD ?????????</div>
          </div>
          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label}>
              <span
                className={`${styles.email} ${emailError ? styles.error : ""}`}
              >
                ?????????
              </span>
              <input
                name="email"
                type="email"
                onChange={onChange}
                value={email}
                className={`${styles.input} ${
                  emailError ? styles.errorInput : ""
                }`}
                placeholder="???????????? ??????????????????."
                required
              />
            </label>
            <label className={styles.label}>
              <span
                className={`${styles.password} ${
                  passwordError ? styles.error : ""
                }`}
              >
                ????????????
              </span>
              <input
                placeholder="??????????????? ??????????????????."
                name="password"
                type="password"
                onChange={onChange}
                value={password}
                className={`${styles.input} ${
                  passwordError ? styles.errorInput : ""
                }`}
                required
              />
            </label>
            <button className={styles.button}>?????????</button>
          </form>
          <button onClick={onAuthWithGoogle} className={styles.google}>
            Login with Google Account
          </button>
          <form>
            <span onClick={onPasswordResetClick} className={styles.findEmail}>
              ???????????? ??????
            </span>
            <span onClick={onClick} className={styles.register}>
              ????????????
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
