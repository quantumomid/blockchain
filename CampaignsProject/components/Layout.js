import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Container } from 'semantic-ui-react'
import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <Container >
            <Head>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
            </Head>
            <Header />
            { children }
            <Footer />
        </ Container>
    )
}

export default Layout;