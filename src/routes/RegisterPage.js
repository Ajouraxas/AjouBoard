import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../lib/fbase";
import styles from "../style/registerPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  /* 
    TODO
    필수 사항 조건부 CSS
  */

  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [nickName, setNickName] = useState(""); // 닉네임
  const [name, setName] = useState(""); // 이름
  const [department, setDepartment] = useState(""); // 학과
  const [studentNumber, setStudentNumber] = useState(""); // 학번
  const [gender, setGender] = useState(""); // 성별
  const [univEmail, setUnivEmail] = useState(""); // 학교 이메일

  const [isChecked, setIsChecked] = useState(false); // 이메일 중복 검사 여부
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [nickNameError, setNickNameError] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        if (value !== confirmPassword) {
          setPasswordConfirmError(true);
        }
        if (value === confirmPassword) {
          setPasswordConfirmError(false);
        }
        break;
      case "confirmPassword":
        setPasswordConfirmError(true);
        setConfirmPassword(value);
        if (password === value) {
          setPasswordConfirmError(false);
        }
        break;
      case "nickName":
        setNickName(value);
        break;
      case "name":
        setName(value);
        break;
      case "department":
        setDepartment(value);
        break;
      case "studentNumber":
        if (isNaN(+value)) return;
        setStudentNumber(value);
        break;
      case "univEmail":
        setUnivEmail(value);
        break;
      default:
        break;
    }
  };

  const onSelectGender = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setGender(value);
  };

  const isOverlap = async (event) => {
    event.preventDefault();
    if (email === "" || !email.includes("@")) {
      setEmailError(true);
      return;
    }
    try {
      const docRef = doc(dbService, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEmailError(true);
        setIsChecked(false);
      } else {
        setEmailError(false);
        setIsChecked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAuthWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(authService, googleProvider);
      const docSnap = await getDoc(doc(dbService, "users", user.email));
      console.log(docSnap);
      await setDoc(doc(dbService, "users", user.email), {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        nickName: user.email.split("@")[0],
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        authService,
        email,
        password,
      );
      await updateProfile(user, {
        displayName: nickName,
      });
      await setDoc(doc(dbService, "users", email), {
        id: user.uid,
        name,
        email,
        nickName,
        department,
        studentNumber,
        gender,
        univEmail,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.img} />
          <div className={styles.title}>AJOURA 회원가입</div>
        </div>
        <div className={styles.mainContent}>
          <form onSubmit={onSubmit} className={styles.mainForm}>
            <div className={styles.requiredContent}>
              <span className={styles.requiredContent_title}>필수사항</span>
              <label className={styles.requiredLabel}>
                <span>이름</span>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="이름"
                  required
                />
              </label>
              <label
                className={`${styles.requiredLabel} ${
                  isChecked ? styles.inputActivity : ""
                } ${emailError ? styles.inputError : ""}`}
              >
                <span>이메일</span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="이메일"
                  required
                />
                <button
                  type="button"
                  onClick={isOverlap}
                  className={styles.overlapButton}
                >
                  중복 확인
                </button>
              </label>
              <label className={styles.requiredLabel}>
                <span>비밀번호</span>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="비밀번호 486"
                  required
                />
              </label>
              <label
                className={`${styles.requiredLabel} ${
                  passwordConfirmError ? styles.inputError : ""
                }`}
              >
                <span>비밀번호 확인</span>
                <input
                  className={styles.input}
                  onChange={onChange}
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="비밀기호1번 이재명"
                  required
                />
              </label>
              <label className={styles.requiredLabel}>
                <span>닉네임</span>
                <input
                  className={styles.input}
                  type="text"
                  name="nickName"
                  value={nickName}
                  onChange={onChange}
                  placeholder="닉네임에 섹스가 들어갈 순 없습니다"
                  required
                />
              </label>
            </div>
            <div className={styles.requiredContent}>
              <div className={styles.titleBlock}>
                <span className={styles.requiredContent_title}>
                  필수가 아닌 사항
                </span>
                <span className={styles.requiredContent_des}>
                  동아리 가입할 때 사용할 수 있습니다.
                </span>
              </div>
              <label className={styles.requiredLabel}>
                <span>학과</span>
                <input
                  type="text"
                  name="department"
                  value={department}
                  onChange={onChange}
                  placeholder="Ex) 소프트웨어학과"
                  className={styles.input}
                />
              </label>
              <label className={styles.requiredLabel}>
                <span>학번</span>
                <input
                  type="text"
                  name="studentNumber"
                  value={studentNumber}
                  onChange={onChange}
                  placeholder="Ex) 201820736"
                  className={styles.input}
                />
              </label>
              <div className={styles.genderBlock}>
                <span className={styles.gender_title}>성별</span>
                <div className={styles.buttonBox}>
                  <button
                    type="button"
                    value="male"
                    className={`${styles.genderButton} ${
                      gender === "male" ? styles.genderActivity : ""
                    }`}
                    onClick={onSelectGender}
                  >
                    남성
                  </button>
                  <button
                    type="button"
                    value="female"
                    className={`${styles.genderButton} ${
                      gender === "female" ? styles.genderActivity : ""
                    }`}
                    onClick={onSelectGender}
                  >
                    여성
                  </button>
                  <button
                    type="button"
                    value="guitar"
                    className={`${styles.genderButton} ${
                      gender === "guitar" ? styles.genderActivity : ""
                    }`}
                    onClick={onSelectGender}
                  >
                    기타
                  </button>
                </div>
              </div>
              <label className={styles.requiredLabel}>
                <span>아주대학교 이메일</span>
                <input
                  type="email"
                  name="univEmail"
                  value={univEmail}
                  onChange={onChange}
                  placeholder="Ex) green3438@ajou.ac.kr"
                  className={styles.input}
                />
              </label>
              <button className={styles.registerButton}>회원가입</button>
            </div>
          </form>
          <div className={styles.withGoogleBox}>
            <span>또는 구글 이메일로 가입하기</span>
            <button onClick={onAuthWithGoogle}>
              Login with Google Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
