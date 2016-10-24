import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import Input from '../elements/Input';
import Button from '../elements/Button';
import * as deps from '../../deps';
import { validate } from './validate';

const submit = (values, dispatch) => {
  dispatch(deps.actions.loginRequested(values.email, values.password));
};

const LoginForm = ({ handleSubmit, waiting, statusMessage, errorMessage, t }) => (

  <div className="container">
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="control">
          <form onSubmit={handleSubmit(submit)}>
            <Field
              name="email"
              label="Email"
              component={Input}
              type="text"
              placeholder="account@email.com"
              icon="envelope"
              size="large"
            />
            <Field
              name="password"
              label="Password"
              component={Input}
              type="password"
              placeholder="●●●●●●●"
              icon="lock"
              size="large"
            />

            <br />
            <p className="control" />

            {statusMessage ? (
              <article className="message">
                <div className="message-body has-text-centered">
                  <strong>{t(statusMessage)}</strong>
                </div>
              </article>)
               : null
             }

            {errorMessage ? (
              <article className="message is-danger">
                <div className="message-body has-text-centered">
                  <strong>{t(errorMessage)}</strong>
                </div>
              </article>)
               : null
             }

            <div className="level">
              <div className="level-left">
                <Button
                  color="primary"
                  center
                  size="large"
                  loading={waiting}
                  disabled={waiting}
                  type="submit"
                >
                  <strong>Login</strong>
                </Button>


              </div>
              <div className="level-right">
                <Link to="/register">
                  Don&apos;t have an account? Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool.isRequired,
  statusMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  errorMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  t: React.PropTypes.func,
};

const LoginTranslated = translate('accounts')(LoginForm);

const LoginWithForm = reduxForm({
  form: 'login',
  validate,
  getFormState: state => state.theme.reduxForm,
})(LoginTranslated);

export default connect(state => ({
  waiting: deps.selectors.getIsLoggingIn(state),
  statusMessage: deps.selectors.getLoginStatus(state),
  errorMessage: deps.selectors.getLoginError(state),
}))(LoginWithForm);
