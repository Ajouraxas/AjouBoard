import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styles from "../style/ResetPasswordPage.module.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 이메일
  const [emailError, setEmailError] = useState(false);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || !email.includes("@")) {
      setEmailError(true);
      return;
    }
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alert("이메일 보냄 확인요");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        // 회원가입 되어있는지 모르게 해야하므로
        alert("이메일 보냄 확인요");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>비밀번호 찾기</title>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.img} />
            <div className={styles.title}>AJOURA 비밀번호 찾기</div>
          </div>
          <div className={styles.mainContent}>
            <form onSubmit={onSubmit} className={styles.mainForm}>
              <div className={styles.requiredContent}>
                <label
                  className={`${styles.requiredLabel} ${
                    emailError ? styles.inputError : ""
                  }`}
                >
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="이메일"
                    required
                  />
                  <button className={styles.resetButton}>비밀번호 찾기</button>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
