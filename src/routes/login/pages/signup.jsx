import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, createUserWithEmailAndPassword } from "../../../firebase";
import { TextInput } from "../../../components/input";
import { Button } from "../../../components/button";
import "../../../css/app.css";

export const Signup = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const onLogin = () => {
        navigate("/login");
    }

    const onSignup = async (e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const createdUser = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            console.log(createdUser);
            alert("회원가입 성공");
            window.location.href = "/login";
        } catch (err) {
            switch (err.code) {
                case 'auth/weak-password':
                    alert('비밀번호는 6자리 이상이어야 합니다');
                    break;
                case 'auth/invalid-email':
                    alert('잘못된 이메일 주소입니다');
                    break;
                case 'auth/email-already-in-use':
                    alert('이미 가입되어 있는 계정입니다');
                    break;
            }
        }
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
                    <TextInput
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        security="true"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <Button onClick={onSignup}>회원가입</Button>
                    <Button onClick={onLogin}>로그인 화면으로</Button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
