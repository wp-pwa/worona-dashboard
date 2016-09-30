import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import cn from 'classnames';
import Input from '../elements/Input';
import Button from '../elements/Button';
import * as deps from '../../dependencies';
import { validate } from './validate';

const submit = (values, dispatch) => {
  dispatch(deps.actions.loginRequested(values.email, values.password));
};

const LoginForm = ({ handleSubmit, waiting, statusMessage, errorMessage }) => (

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

                <div className="help">
                  {statusMessage}
                </div>
                <div className={cn('help', 'is-danger')}>
                  {errorMessage}
                </div>

                <div className="level is-mobile">
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
                      Don't have an account? Register
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
  statusMessage: React.PropTypes.any.isRequired,
  errorMessage: React.PropTypes.any.isRequired,
  t: React.PropTypes.func.isRequired,
};

const LoginTranslated = translate('bulma')(LoginForm);

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
