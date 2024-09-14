import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, signInWithEmailAndPassword } from "../../../firebase";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { TextInput } from "../../../components/input";
import { Button } from "../../../components/button";
import "../../../css/app.css";

export const Login = () => {
    const navigate = useNavigate();
    
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
        <div className="center-screen-80">
            <h1 className="text-4xl font-bold mb-5">🄻🄴🅃'🅂 ​ 🄺🄽🄸🅃!</h1>
            <div className="flex flex-row justify-center items-center gap-7">
                <div className="flex flex-col justify-center items-center gap-3">
                    <TextInput
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        security="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <Button onClick={onLogin}>로그인</Button>
                    <Button onClick={onSignup}>회원가입 화면으로</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
