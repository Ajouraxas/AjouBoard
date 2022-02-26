import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../lib/fbase";
import "../style/reset.css";
import styles from "../style/loginPage.module.css";

const LoginPage = () => {
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
    try {
      await signInWithEmailAndPassword(authService, email, password);
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

  const onClick = () => {
    navigate("/register");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.img} />
          <div className={styles.title}>AJOURA 로그인</div>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            <span
              className={`${styles.email} ${emailError ? styles.error : ""}`}
            >
              이메일
            </span>
            <input
              name="email"
              type="email"
              onChange={onChange}
              value={email}
              className={`${styles.input} ${
                emailError ? styles.errorInput : ""
              }`}
              placeholder="初めまして、私わみんぎゅです"
              required
            />
          </label>
          <label className={styles.label}>
            <span
              className={`${styles.password} ${
                passwordError ? styles.error : ""
              }`}
            >
              파스워도
            </span>
            <input
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
          <button className={styles.button}>ログイン</button>
        </form>
        <button className={styles.google}>Login with Google Account</button>
        <form>
          <span className={styles.findEmail}>이메일 기억안나누 ㅋㅋ</span>
          <span onClick={onClick} className={styles.register}>
            회원가입
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
