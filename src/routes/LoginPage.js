import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { authService } from "../lib/fbase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <div>
          <div />
          <div>AJOURA 로그인</div>
        </div>
        <form onSubmit={onSubmit}>
          <input name="email" type="email" onChange={onChange} value={email} />
          <input
            name="password"
            type="password"
            onChange={onChange}
            value={password}
          />
          <button>로그인</button>
        </form>
        <button>Login with Google Account</button>
        <form>
          <span>이메일 찾기</span>
          <span>회원 가입</span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;