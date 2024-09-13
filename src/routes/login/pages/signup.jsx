import React, { useState, useEffect } from "react";
import { firebaseAuth, createUserWithEmailAndPassword } from "../../../firebase";

export const Signup = () => {
    const isLoggedIn = sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]");
    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = "/";
        }
    }, [isLoggedIn]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const onSubmit = async (e) => {
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
        <div>
            <input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                security="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                security="true"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
            />

            <button onClick={onSubmit}>회원가입</button>
        </div>
    );
};

export default Signup;
