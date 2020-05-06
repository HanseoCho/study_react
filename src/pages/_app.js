import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import AppLayout from "../components/appLayout";
import { Provider } from "react-redux";
import  withRedux from "next-redux-wrapper";
import rootReducer from "../reducers";
import {applyMiddleware, compose, createStore} from "redux";

const CommonHead = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
                {"Hello, React"}
                <Component/>
            </AppLayout>
        </Provider>
    );
};

CommonHead.prototype = {
    // jsx 에 들어갈수 있는 모두를 node라고 칭한다.
    Compoent : PropTypes.elementType,
    store : PropTypes.object,
};

export default withRedux((initalState, options) => {
    // 1. Redux 기본사용시 설정
    // const store = createStore(rootReducer, initalState);
    // 2. store 커스텀마이징
    // redux 디버그 사용시 설정을 해줘야한다.
    const middlewares = [];
    const enhancer = compose(
        applyMiddleware(...middlewares),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        // typeof window !== 'undefined' => next에서 제공하는 !options.isServer 로 대체 가능하다
    );
    const store = createStore(rootReducer, initalState, enhancer);
    return store;
})(CommonHead);
