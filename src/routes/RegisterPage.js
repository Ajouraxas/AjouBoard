import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { authService, dbService } from "../lib/fbase";

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
    <div>
      <div>
        <div>
          <div />
          <div>AJOURA 회원가입</div>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <span>필수사항</span>
              <label>
                이름
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </label>
              <label>
                이메일
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <button>중복 확인</button>
              </label>
              <label>
                비밀번호
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </label>
              <label>
                비밀번호 확인
                <input
                  onChange={onChange}
                  type="text"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                />
              </label>
              <label>
                닉네임
                <input
                  type="text"
                  name="nickName"
                  value={nickName}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div>
              <div>
                <span>선택 사항</span>
                <span>동아리 가입할 때 사용할 수 있습니다.</span>
              </div>
              <label>
                학과
                <input
                  type="text"
                  name="department"
                  value={department}
                  onChange={onChange}
                />
              </label>
              <label>
                학번
                <input
                  type="text"
                  name="studentNumber"
                  value={studentNumber}
                  onChange={onChange}
                />
              </label>
              <label>
                성별
                <button>남성</button>
                <button>여성</button>
                <button>기타</button>
              </label>
              <label>
                아주대학교 이메일
                <input
                  type="text"
                  name="univEmail"
                  value={univEmail}
                  onChange={onChange}
                />
              </label>
              <button>회원가입</button>
            </div>
          </form>
          <div>
            <span>또는 구글 이메일로 가입하기</span>
            <button>Login with Google Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
