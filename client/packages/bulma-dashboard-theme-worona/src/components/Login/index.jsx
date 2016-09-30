import React from 'react';

import Header from '../Header';
import TopNav from '../Header/TopNav';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';

import LoginForm from './LoginForm';

const Login = () => (
  <Body>
    <Header>
      <TopNav />
      <Hero title="Login">
        Welcome back! Create a fast, smooth mobile experience.
      </Hero>
    </Header>

    <Main>
      <LoginForm />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Login;
