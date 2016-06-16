import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import cn from 'classnames';
import Hero from '../../elements/Hero';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import { loginRequested, isLoggingIn, loginStatus, loginError } from '../../dependencies';
import { validate } from './validate';
import styles from './styles.css';

const submit = (values, dispatch) => {
  dispatch(loginRequested(values.email, values.password));
};

const Login = ({ fields: { email, password }, handleSubmit, waiting, statusMessage,
  errorMessage }) => (
  <div>

    <Hero title="Login" color="info"
      subtitle="Welcome to Worona. You are only one step away to start making apps."
    />

    <section className="hero-content">
      <div className="container is-text-centered">

        <form onSubmit={handleSubmit(submit)} className={styles.box}>
          <Input type="email" placeholder="Email" icon="envelope" {...email}
            help={cn(email.touched && email.error)}
            color={cn(email.touched && email.error && 'danger')}
          />
          <Input type="password" placeholder="Password" icon="lock" {...password}
            help={cn(password.touched && password.error)}
            color={cn(password.touched && password.error && 'danger')}
          />
          <Button color="success" center className={styles.button} size="medium" loading={waiting}
            disabled={waiting}
          >
            Let me in!
          </Button>

          <div className={cn('help', styles.status)}>
            {statusMessage}
          </div>

          <div className={cn('help', 'is-danger', styles.status)}>
            {errorMessage.reason}
          </div>
        </form>

        <div className={styles.link}>
          <Link to="/register">
            I don't you have an account yet
          </Link>
        </div>

      </div>
    </section>
  </div>
);
Login.propTypes = {
  fields: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool.isRequired,
  statusMessage: React.PropTypes.any.isRequired,
  errorMessage: React.PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  waiting: isLoggingIn(state),
  statusMessage: loginStatus(state),
  errorMessage: loginError(state),
});

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate,
}, mapStateToProps)(Login);
