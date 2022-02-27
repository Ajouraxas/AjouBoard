import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/fbase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(authService, email, password);
      navigate('/');
    } catch (error) {
      setEmail('');
      setPassword('');
      console.log(error);
    }
  };

  const onClick = () => {
    navigate('/register');
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
          <span onClick={onClick}>회원 가입</span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
