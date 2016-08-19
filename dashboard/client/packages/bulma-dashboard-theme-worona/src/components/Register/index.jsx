import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import Hero from '../../elements/Hero';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import * as deps from '../../dependencies';
import * as selectors from '../../selectors';
import { validate } from './validate';
import styles from './style.css';

const submit = (values, dispatch) => {
  dispatch(deps.actions.createAccountRequested(values.name, values.email, values.password));
};

const Register = ({ handleSubmit, waiting, failed, statusMessage, errorMessage }) => (
  <div>
    <Hero title="Create an account" color="info"
      subtitle="Welcome to Worona. You are only one step away to start making apps."
    />

    <section className="hero-body">
      <div className="container has-text-centered">

        <form onSubmit={handleSubmit(submit)} className={styles.box}>

          <Field
            name="name"
            component={Input}
            type="text"
            placeholder="My name is..."
            icon="user"
          />

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
            animate={cn(failed && 'shake')}
            color="success"
            center
            size="medium"
            loading={waiting}
            disabled={waiting}
            className={styles.button}
          >
            Create my account
          </Button>

          <div className={cn('help', styles.status)}>
            {statusMessage}
          </div>

          <div className={cn('help', 'is-danger', styles.status)}>
            {errorMessage.reason}
          </div>
        </form>

        <div className={styles.link}>
          <Link to="/login">
            I do have an account
          </Link>
        </div>

      </div>
    </section>
  </div>
);

Register.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  failed: React.PropTypes.bool,
  statusMessage: React.PropTypes.any,
  errorMessage: React.PropTypes.any,
};

const RegisterWithForm = reduxForm({
  form: 'register',
  validate,
  getFormState: state => state.bulma.reduxForm,
})(Register);

export default connect(state => ({
  waiting: deps.selectors.isCreatingAccount(state),
  statusMessage: deps.selectors.createAccountStatus(state),
  errorMessage: deps.selectors.createAccountError(state),
  failed: selectors.forms.register.validationFailed(state),
}))(RegisterWithForm);
