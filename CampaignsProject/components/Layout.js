import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Container } from 'semantic-ui-react'

const Layout = ({ children }) => {
    return (
        <Container>
            <Header />
            { children }
            <Footer />
        </ Container>
    )
}

export default Layout;