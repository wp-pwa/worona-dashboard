import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';

import Header from '../Header';
import TopNav from '../Header/TopNav';
import Body from '../Body';
import Main from '../Main';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import TermsAndConditions from './TermsAndConditions';

import Hero from '../elements/Hero';
import Input from '../elements/Input';
import Checkbox from '../elements/Checkbox';
import Button from '../elements/Button';
import * as deps from '../../dependencies';
import { validate } from './validate';

import { toggleTermsAndConditions } from '../../actions';

import styles from './style.css';

const submit = (values, dispatch) => {
  dispatch(deps.actions.createAccountRequested(values.name, values.email, values.password));
};

const Register = ({ handleSubmit, waiting, statusMessage, errorMessage, toggleTerms }) => (
  <Body>
    <Header>
      <TopNav />
      <Hero title="Register">
      Welcome to Worona! Make your <strong>WordPress mobile-ready</strong> with a few clicks.
      </Hero>
    </Header>

    <Main>
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <form onSubmit={handleSubmit(submit)}>

              <Field
                name="name"
                label="Name"
                component={Input}
                type="text"
                placeholder="Alan"
                icon="user"
                size="large"
              />

              <Field
                name="email"
                label="Email"
                component={Input}
                type="email"
                placeholder="alan@email.com"
                icon="envelope"
                size="large"
              />

              <Field
                name="password"
                label="Password"
                component={Input}
                type="password"
                placeholder="●●●●●●●●"
                icon="lock"
                size="large"
              />

            <br />
              <Field
                name="EULA"
                component={Checkbox}
                type="checkbox"
              >
              I have read and agree to the{' '}
              <button className={styles.button} type="button" onClick={toggleTerms}>
                terms and conditions
              </button>
              {' '}of Worona.
            </Field>

            <br />
            <p className="control" />

            <div className="level is-mobile">
              <div className="level-left">
                <Button
                  color="primary"
                  size="large"
                  loading={waiting}
                  disabled={waiting}
                  type="submit"
                >
                  Register
                </Button>

                <div className="help" >
                  {statusMessage}
                </div>

                <div className={cn('help', 'is-danger')}>
                  {errorMessage.reason}
                </div>
              </div>

              <div className="level-right">
                <Link to="/login">
                  Already have an account? Login
                </Link>
              </div>
            </div>

            </form>
          </div>
        </div>
      </div>
  </Main>

  <Footer>
    <FooterLinks />
  </Footer>

  <TermsAndConditions />

</Body>
);

Register.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  statusMessage: React.PropTypes.any,
  errorMessage: React.PropTypes.any,
  toggleTerms: React.PropTypes.func,
};

const RegisterWithForm = reduxForm({
  form: 'register',
  validate,
  getFormState: state => state.theme.reduxForm,
})(Register);

export default connect(state => ({
  waiting: deps.selectors.isCreatingAccount(state),
  statusMessage: deps.selectors.createAccountStatus(state),
  errorMessage: deps.selectors.createAccountError(state),
}), (dispatch) => ({ toggleTerms: () => dispatch(toggleTermsAndConditions()) }))(RegisterWithForm);
