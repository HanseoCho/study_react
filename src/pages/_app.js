import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import AppLayout from "../components/appLayout";

const CommonHead = ({ Component }) => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
                {"Hello, React"}
                <Component/>
            </AppLayout>
        </>
    );
};

CommonHead.prototype = {
    Compoent : PropTypes.elementType,
};
// jsx 에 들어갈수 있는 모두를 node라고 칭한다.

export default CommonHead;