import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import cn from 'classnames';
import Hero from '../elements/Hero';
import Input from '../elements/Input';
import Button from '../elements/Button';
import styles from './styles.css';

let Login = ({ handleSubmit }) => (
  <div>

    <Hero title="Login" color="info"
      subtitle="Welcome to Worona. You are only one step away to start making apps."
    />

    <section className="hero-content">
      <div className={cn('container', styles.login)}>

        <form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email" icon="envelope" />
          <Input type="password" placeholder="Password" icon="lock" />
          <Button input color="success" center size="medium">
            Let me in!
          </Button>
        </form>

        <div className={styles.account}>
          <Link to="/register">
            <Button color="info" outlined center>
              Wait... I don't you have an account yet!
            </Button>
          </Link>
        </div>

      </div>
    </section>
  </div>
);
Login.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
};

Login = reduxForm({
  form: 'login',
  fields: ['email', 'password'],
})(Login);

export default Login;
