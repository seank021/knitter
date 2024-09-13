import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, signInWithEmailAndPassword } from "../../../firebase";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

export const Login = () => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]");
    useEffect(() => {
        if (isLoggedIn) {
            alert("이미 로그인되어 있습니다.");
            window.location.href = "/";
        }
    }, [isLoggedIn]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const userInfo = await signInWithEmailAndPassword(firebaseAuth, email, password);
            console.log(userInfo);
            alert("로그인 성공");

            await setPersistence(firebaseAuth, browserSessionPersistence);
            navigate("/");
        } catch (error) {
            alert("로그인 실패");
        }
    }

    const onSignup = () => {
        navigate("/signup");
    }

    return (
        <div>
            <input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                security="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onLogin}>로그인</button>

            <button onClick={onSignup}>회원가입</button>
        </div>
    );
};

export default Login;
