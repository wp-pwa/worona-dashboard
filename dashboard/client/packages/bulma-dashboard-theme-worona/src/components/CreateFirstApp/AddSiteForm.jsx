import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import cn from 'classnames';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import * as deps from '../../dependencies';
import { validate } from './validate';
import styles from './styles.css';

const submit = (values, dispatch) => {
  dispatch(deps.actions.createSiteRequested(values.title, values.url));
};

const AddSiteForm = ({ handleSubmit, waiting, statusMessage, errorMessage }) => (
  <section className="section">
    <div className="container">

      <form onSubmit={handleSubmit(submit)} >
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">

            <Field
              name="url"
              label="Wordpress URL"
              component={Input}
              type="text"
              placeholder="http://www.site.com"
              icon="wordpress"
              size="is-large"
            />

            <Field
              name="title"
              label="Site name"
              component={Input}
              type="text"
              placeholder="Site"
              icon="info-circle"
              size="is-large"
            />

            <Button
              color="primary"
              size="medium"
              loading={waiting}
              disabled={waiting}
              className={styles.button}
            >
              <Icon iconFaCode="plus-circle" />
              <span><strong>Add Site</strong></span>
            </Button>

            <div className={cn('help', styles.status)}>
              {statusMessage}
            </div>

            <div className={cn('help', 'is-danger', styles.status)}>
              {errorMessage.reason}
            </div>

          </div>
        </div>
      </form>

      <div className={styles.link}>
        <Link to="/">
          I'll do it later
        </Link>
      </div>

    </div>
  </section>
);
AddSiteForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  failed: React.PropTypes.bool,
  statusMessage: React.PropTypes.any,
  errorMessage: React.PropTypes.any,
};

const AddSiteWithForm = reduxForm({
  form: 'AddSiteForm',
  fields: ['title', 'url'],
  validate,
  getFormState: state => state.bulma.reduxForm,
})(AddSiteForm);

export default connect(state => ({
  waiting: deps.selectors.isLoggingIn(state),
  statusMessage: deps.selectors.loginStatus(state),
  errorMessage: deps.selectors.loginError(state),
}))(AddSiteWithForm);
