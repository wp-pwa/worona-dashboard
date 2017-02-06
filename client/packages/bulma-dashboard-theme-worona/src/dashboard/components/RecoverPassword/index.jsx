import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../../elements/Hero';

import RecoverPasswordForm from './RecoverPasswordForm';

const Login = () => (
  <Body>
    <Header>
      <Hero
        title="Enter your new password"
        subtitle="We will save your new password in the database."
      />
    </Header>

    <Main>
      <RecoverPasswordForm />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Login;
