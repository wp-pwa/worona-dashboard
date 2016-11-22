import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { flow } from 'lodash/fp';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import Icon from '../../elements/Icon';
import * as deps from '../../deps';
import { validate } from './validate';

const submit = siteId => (values, dispatch) => {
  dispatch(deps.actions.editSiteRequested(values.name, values.url, siteId));
};

const EditSiteForm =
({ t, handleSubmit, waiting, statusMessage, errorMessage, pristine, anyTouched, invalid,
   initialValues: { id } }) =>
(
  <div className="container">
    <form
      onSubmit={handleSubmit(submit(id))}
    >
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">

          <Field
            name="url"
            label="Wordpress URL"
            component={Input}
            type="text"
            size="large"
          />

          <Field
            name="name"
            label="Site name"
            component={Input}
            type="text"
            size="large"
          />

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

          <div className="level is-mobile">
            <div className="level-left center">

              <Button
                color="primary"
                size="large"
                loading={waiting}
                disabled={waiting || pristine || (invalid && anyTouched)}
                type="submit"
              >
                <Icon code="refresh" />
                <span><strong>Edit</strong></span>
              </Button>
            </div>

            <div className="level-right" style={{ marginTop: 0 }}>
              <Link className="button is-medium" to="/">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);
EditSiteForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  pristine: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  anyTouched: React.PropTypes.bool,
  statusMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  errorMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  initialValues: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    url: React.PropTypes.string,
  }),
  t: React.PropTypes.func,
};

const mapStateToProps = state => ({
  waiting: deps.selectors.getIsEditingSite(state),
  statusMessage: deps.selectors.getEditSiteStatus(state),
  errorMessage: deps.selectors.getEditSiteError(state),
  initialValues: deps.selectors.getSelectedSite(state),
});

export default flow(
  reduxForm({
    form: 'EditSiteForm',
    fields: ['name', 'url'],
    validate,
    getFormState: state => state.theme.reduxForm,
  }),
  connect(mapStateToProps),
  translate('sites')
)(EditSiteForm);
