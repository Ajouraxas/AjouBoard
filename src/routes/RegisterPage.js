import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { authService, dbService } from "../lib/fbase";
import styles from "../style/registerPage.module.css";

const RegisterPage = () => {
  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [nickName, setNickName] = useState(""); // 닉네임
  const [name, setName] = useState(""); // 이름
  const [department, setDepartment] = useState(""); // 학과
  const [studentNumber, setStudentNumber] = useState(""); // 학번
  const [gender, setGender] = useState(""); // 성별
  const [univEmail, setUnivEmail] = useState(""); // 학교 이메일

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
        break;
      case "confirmPassword":
        setConfirmPassword(value);
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
        setStudentNumber(value);
        break;
      case "univEmail":
        setUnivEmail(value);
        break;
      default:
        break;
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
              <label className={styles.requiredLabel}>
                <span>이메일</span>
                <input
                  className={styles.input}
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="이메일"
                  required
                />
                <button className={styles.overlapButton}>중복 확인</button>
              </label>
              <label className={styles.requiredLabel}>
                <span>비밀번호</span>
                <input
                  className={styles.input}
                  type="text"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="비밀번호 486"
                  required
                />
              </label>
              <label className={styles.requiredLabel}>
                <span>비밀번호 확인</span>
                <input
                  className={styles.input}
                  onChange={onChange}
                  type="text"
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
                  <span className={styles.genderButton}>남성</span>
                  <span className={styles.genderButton}>여성</span>
                  <span className={styles.genderButton}>기타</span>
                </div>
              </div>
              <label className={styles.requiredLabel}>
                <span>아주대학교 이메일</span>
                <input
                  type="text"
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
            <button>Login with Google Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
