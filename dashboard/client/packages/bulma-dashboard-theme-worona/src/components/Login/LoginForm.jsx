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

    <section className="hero-body">
      <div className="container has-text-centered">

        <form onSubmit={handleSubmit(submit)}>

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
            size="medium"
            loading={waiting}
            disabled={waiting}
            type="submit"
          >
            Let me in!
          </Button>

          <div className="help">
            {statusMessage}
          </div>

          <div className={cn('help', 'is-danger')}>
            {errorMessage.reason}
          </div>
        </form>

        <div>
          <Link to="/register">
            I don't have an account yet
          </Link>
        </div>

      </div>
    </section>

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
