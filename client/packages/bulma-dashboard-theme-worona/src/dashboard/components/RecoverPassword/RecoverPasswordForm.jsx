import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import * as deps from '../../deps';
import { validate } from './validate';

const submit = token => ({ password }, dispatch) => {
  dispatch(deps.actions.recoverPasswordRequested({ password, token }));
};

const RecoverPasswordForm = ({ handleSubmit, waiting, statusMessage, errorMessage, t, token }) => (

  <div className="container">
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="control">
          <form onSubmit={handleSubmit(submit(token))}>
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
                  <strong>Save my new password</strong>
                </Button>


              </div>
              <div className="level-right">
                <Link to="/login">
                  Go to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
RecoverPasswordForm.propTypes = {
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
  token: React.PropTypes.string,
};

const RecoverPasswordTranslated = translate('accounts')(RecoverPasswordForm);

const RecoverPasswordWithForm = reduxForm({
  form: 'recover-password',
  validate,
  getFormState: state => state.theme.reduxForm,
})(RecoverPasswordTranslated);

export default connect(state => ({
  waiting: deps.selectors.getIsRecoverPasswordRequested(state),
  statusMessage: deps.selectors.getRecoverPasswordStatus(state),
  errorMessage: deps.selectors.getRecoverPasswordError(state),
  token: deps.selectorCreators.getUrlQuery('token')(state),
}))(RecoverPasswordWithForm);
