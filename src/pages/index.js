import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {LOG_IN} from "../reducers/user";

const dummy = {
    isLoggedIn: true,
}

const Home = () => {
    // 화면에서 Redux 디스패치를 사용할 시
    const dispatch = useDispatch();
    // Redux State를 가져오고 싶은경우 useSelector를 사용한다.
    const { isLoggedIn, user } = useSelector(state => state.user);
    console.log(user);
    useEffect(()=>{
        dispatch({
            type: LOG_IN,
            data: {
                nickname: 'dispatch_test'
            },
        });
    }, []);

    return (
        <div>
            {user ? <div>로그인 했습니다: { user.nickname }</div> : <div>로그아웃 했습니다.</div>}
            <Form>
                <Input.TextArea maxLength={140} placeholder={"어떤 신기한 일이 있었나요?"} />
                <div>
                    <input type={"file"} multiple={true} hidden={true}/>
                    <button>이미지 업로드</button>
                    <button type={"primary"} style={{float:'right'}} htmlType={"submit"} >짹짹</button>
                </div>
            </Form>
        </div>
    );
};

export default Home;