import React, { useState,useCallback } from "react";
import AppLayout from "../components/appLayout";
import Head from "next/head";
import {Button, Checkbox, Form} from 'antd';

// ant design 과도한 최적화
// 일반 컴포넌트를 강제로 memo를 사용해서 퓨어컴포넌트처럼 사용가능하다.
const TextInput = ( {value, onChange} ) => {
    return  (
        <input name={"user-id"} required={true} value={value} onChange={onChange}/>
    );
};

/* 커스텀훅 사용
     * useState는 커스텀훅이 아닌 일반 반복문에서 사용을 하면 안된다.
     */
export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);
    return [value, handler];
};

const Signup = () => {
    // const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const onSubmit = useCallback((e) => {

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log({id, nick, password, passwordCheck, term});

    }, [password, passwordCheck, term]);

    // const onChangeId = (e) => {
    //     setId(e.target.value);
    // };

    const onChangeNick = (e) => {
        setNick(e.target.value);
    };

    const onChangePass = (e) => {
        setPassword(e.target.value);
    };

    const onChangePassCheck = useCallback((e) =>{
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback( (e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);


    const [id, onChangeId] = useInput(''); // 커스텀훅을 사용함으로서 중복을 줄일수 있다.

    return (
        <>
            <Form onFinish={onSubmit} style={{padding:10}}>
                <div>
                    <label htmlFor={"user-id"}>아이디</label>
                    <br />
                    <TextInput value={id} onChange={onChangeId}/>
                </div>
                <div>
                    <label htmlFor={"user-nick"}>닉네임</label>
                    <br />
                    <TextInput value={nick} onChange={onChangeNick}/>
                </div>
                <div>
                    <label htmlFor={"user-password"}>비밀번호</label>
                    <br />
                    <input name={"user-password"} type={"password"} value={password} required={true} onChange={onChangePass}/>
                </div>
                <div>
                    <label htmlFor={"user-password-check"}>비밀번호체크</label>
                    <br />
                    <input name={"user-password-check"} type={"password"} required={true} value={passwordCheck} onChange={onChangePassCheck}/>
                    {passwordError && <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name={"user-term"} checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
                    {termError && <div style={{color: 'red'}}>약관에 동의해주세요.</div>}
                </div>
                <div style={{marginTop: 10}}>
                    <Button type={"primary"} htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </>
    );
};

export default Signup;