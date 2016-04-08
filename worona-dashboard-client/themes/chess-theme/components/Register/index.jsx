import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import Hero from '../elements/Hero';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { createAccountRequest } from 'accounts/actions';
import { validate } from './validate';
import styles from './style.css';

const submit = (values, dispatch) => {
  dispatch(createAccountRequest(values.name, values.email, values.password));
};

let Register = ({ fields: { name, email, password }, handleSubmit, waiting, failed }) => (
  <div>
    <Hero title="Create an account" color="info"
      subtitle="Welcome to Worona. You are only one step away to start making apps."
    />

    <section className="hero-content">
      <div className={cn('container', styles.login)}>

        <form onSubmit={handleSubmit(submit)}>
          <Input type="text" placeholder="My name is..." icon="user" {...name}
            help={cn(name.touched && name.error)}
            color={cn(name.touched && name.error && 'danger')}
          />
          <Input type="email" placeholder="Email" icon="envelope" {...email}
            help={cn(email.touched && email.error)}
            color={cn(email.touched && email.error && 'danger')}
          />
          <Input type="password" placeholder="Password" icon="lock" {...password}
            help={cn(password.touched && password.error)}
            color={cn(password.touched && password.error && 'danger')}
          />

        <Button animate={cn(failed && 'shake')} color="success" center
          size="medium" loading={waiting} disabled={waiting}
        >
            Create my account!
          </Button>
        </form>

        <div className={styles.account}>
          <Link to="/login">
            <Button color="info" outlined center>
              Wait... I already have an account!
            </Button>
          </Link>
        </div>

      </div>
    </section>
  </div>
);

Register.propTypes = {
  fields: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  failed: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  waiting: state.accounts.isCreatingAccount,
  failed: state.theme.forms.register.failed,
});

Register = reduxForm({
  form: 'register',
  fields: ['name', 'email', 'password'],
  validate,
}, mapStateToProps)(Register);

export default Register;
