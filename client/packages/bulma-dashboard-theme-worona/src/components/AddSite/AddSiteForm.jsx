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

const submit = (values, dispatch) => {
  dispatch(deps.actions.createSiteRequested(values.title, values.url));
};

const AddSiteForm = ({ handleSubmit, waiting, statusMessage, errorMessage, reset }) => (
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

            <div className="level is-mobile">
              <div className="level-left center">

                <Button
                  color="primary"
                  size="medium"
                  loading={waiting}
                  disabled={waiting}
                  type="submit"
                >
                  <Icon iconFaCode="plus-circle" />
                  <span><strong>Add Site</strong></span>
                </Button>

                <Button className="button is-link" onClick={reset}>Reset</Button>
              </div>

              <div className="level-right">
                <Link className="button" to="/">Cancel</Link>
              </div>
            </div>

            <div className="help">
              {statusMessage}
            </div>

            <div className={cn('help', 'is-danger')}>
              {errorMessage.error}
              {errorMessage.reason}
            </div>

          </div>
        </div>
      </form>

    </div>
  </section>
);
AddSiteForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  failed: React.PropTypes.bool,
  statusMessage: React.PropTypes.any,
  errorMessage: React.PropTypes.any,
  reset: React.PropTypes.any,
};

const AddSiteWithForm = reduxForm({
  form: 'AddSiteForm',
  fields: ['title', 'url'],
  validate,
  getFormState: state => state.theme.reduxForm,
})(AddSiteForm);

export default connect(state => ({
  waiting: deps.selectors.getIsCreatingSite(state),
  statusMessage: deps.selectors.getCreateSiteStatus(state),
  errorMessage: deps.selectors.getCreateSiteError(state),
}))(AddSiteWithForm);
