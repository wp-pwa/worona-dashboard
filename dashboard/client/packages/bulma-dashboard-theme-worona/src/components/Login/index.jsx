import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import cn from 'classnames';
import Hero from '../../elements/Hero';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import * as deps from '../../dependencies';
import { validate } from './validate';
import styles from './styles.css';

const submit = (values, dispatch) => {
  dispatch(deps.actions.loginRequested(values.email, values.password));
};

const Login = ({ handleSubmit, waiting, statusMessage, errorMessage, t }) => (
  <div>
    <Hero title={t('Login')} color="info"
      subtitle="Welcome to Worona. You are only one step away to start making apps."
    />

    <section className="hero-body">
      <div className="container has-text-centered">

        <form onSubmit={handleSubmit(submit)} className={styles.box}>

          <Field
            name="email"
            component={Input}
            type="text"
            placeholder="Email"
            icon="envelope"
          />

          <Field
            name="password"
            component={Input}
            type="password"
            placeholder="Password"
            icon="lock"
          />

          <Button
            color="success"
            center
            className={styles.button}
            size="medium"
            loading={waiting}
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
            I don't have an account yet
          </Link>
        </div>

      </div>
    </section>
  </div>
);
Login.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool.isRequired,
  statusMessage: React.PropTypes.any.isRequired,
  errorMessage: React.PropTypes.any.isRequired,
  t: React.PropTypes.func.isRequired,
};

const LoginTranslated = translate('bulma')(Login);

const LoginWithForm = reduxForm({
  form: 'login',
  validate,
  getFormState: state => state.theme.reduxForm,
})(LoginTranslated);

export default connect(state => ({
  waiting: deps.selectors.isLoggingIn(state),
  statusMessage: deps.selectors.loginStatus(state),
  errorMessage: deps.selectors.loginError(state),
}))(LoginWithForm);
