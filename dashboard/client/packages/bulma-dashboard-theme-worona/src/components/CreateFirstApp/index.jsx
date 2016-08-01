import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import Hero from '../../elements/Hero';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import * as deps from '../../dependencies';
import { validate } from './validate';
import styles from './style.css';

const submit = (values, dispatch) => {
  dispatch(deps.actions.createSiteRequested(values.title, values.url));
};

const CreateFirstApp = ({ handleSubmit, waiting, statusMessage, errorMessage }) =>
  <div>
    <Hero title="Now, create your first app" color="info"
      subtitle="Just enter the title and your WordPress url and we will do the rest."
    />

    <section className="hero-body">
      <div className="container has-text-centered">

        <form onSubmit={handleSubmit(submit)} className={styles.box}>

          <Field
            name="title"
            component={Input}
            type="text"
            placeholder="App Title"
            icon="info-circle"
          />

          <Field
            name="url"
            component={Input}
            type="text"
            placeholder="Your WordPress URL"
            icon="wordpress"
          />

          <Button
            color="success"
            center
            size="medium"
            loading={waiting}
            disabled={waiting}
            className={styles.button}
          >
            Create the app
          </Button>

          <div className={cn('help', styles.status)}>
            {statusMessage}
          </div>

          <div className={cn('help', 'is-danger', styles.status)}>
            {errorMessage.reason}
          </div>
        </form>

        <div className={styles.link}>
          <Link to="/">
              I'll do it later
          </Link>
        </div>

      </div>
    </section>
  </div>;

CreateFirstApp.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  failed: React.PropTypes.bool,
  statusMessage: React.PropTypes.any,
  errorMessage: React.PropTypes.any,
};

const CreateFirstAppWithForm = reduxForm({
  form: 'createFirstApp',
  fields: ['title', 'url'],
  validate,
  getFormState: state => state.bulma.reduxForm,
})(CreateFirstApp);

export default connect(state => ({
  waiting: deps.selectors.isCreatingSite(state),
  statusMessage: deps.selectors.createSiteStatus(state),
  errorMessage: deps.selectors.createSiteError(state),
}))(CreateFirstAppWithForm);
