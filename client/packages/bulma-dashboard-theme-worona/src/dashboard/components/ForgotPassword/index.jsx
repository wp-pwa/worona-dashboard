import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../../elements/Hero';

import ForgotPasswordForm from './ForgotPasswordForm';

const Login = () => (
  <Body>
    <Header>
      <Hero
        title="Recover your Password"
        subtitle="Did you forgot your password? Don't worry, enter you email and we will send you a recovery link."
      />
    </Header>

    <Main>
      <ForgotPasswordForm />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Login;
