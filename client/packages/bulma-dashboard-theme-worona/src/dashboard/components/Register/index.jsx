/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';

import * as deps from '../../dependencies';
import { toggleTermsAndConditions } from '../../actions';
import { validate } from './validate';

import Header from '../Header';
import TopNav from '../Header/TopNav';
import Body from '../Body';
import Main from '../Main';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import TermsAndConditions from './TermsAndConditions';
import Hero from '../elements/Hero';
import Input from '../elements/Input';
import Button from '../elements/Button';

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

              <p>
                By creating an account you agree to our{' '}
                <button className={styles.button} type="button" onClick={toggleTerms}>
                  Terms and Conditions.
                </button>
              </p>

              <br />
              <p className="control" />

              <div className="help" >
                {statusMessage}
              </div>

              <div className={cn('help', 'is-danger')}>
                {errorMessage}
              </div>

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
  waiting: deps.selectors.getIsCreatingAccount(state),
  statusMessage: deps.selectors.getCreateAccountStatus(state),
  errorMessage: deps.selectors.getCreateAccountError(state),
}), dispatch => ({
  toggleTerms: () => dispatch(toggleTermsAndConditions()),
}))(RegisterWithForm);
