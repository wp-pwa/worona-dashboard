import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { flow } from 'lodash/fp';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import * as deps from '../../deps';
import { validate } from './validate';

const submit = siteId => (values, dispatch) => {
  dispatch(deps.actions.createSiteRequested(values.siteName, values.siteURL, siteId));
};

const AddSiteForm =
({ t, handleSubmit, waiting, statusMessage, errorMessage, submitFailed, invalid,
   initialValues: { siteId } }) =>
(
  <div className="container">
    <form onSubmit={handleSubmit(submit(siteId))} >
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">

          <Field
            name="siteURL"
            label="Wordpress URL"
            component={Input}
            type="text"
            placeholder="http://www.site.com"
            icon="wordpress"
            size="large"
          />

          <Field
            name="siteName"
            label="Site name"
            component={Input}
            type="text"
            placeholder="Site"
            icon="info-circle"
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
                disabled={waiting || (invalid && submitFailed)}
                type="submit"
              >
                <Icon code="plus-circle" />
                <span><strong>Add Site</strong></span>
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
AddSiteForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  statusMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  errorMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  initialValues: React.PropTypes.shape({
    siteId: React.PropTypes.string,
    siteName: React.PropTypes.string,
    siteURL: React.PropTypes.string,
  }),
  t: React.PropTypes.func,
};

const mapStateToProps = state => ({
  waiting: deps.selectors.getIsCreatingSite(state),
  statusMessage: deps.selectors.getCreateSiteStatus(state),
  errorMessage: deps.selectors.getCreateSiteError(state),
  initialValues: deps.selectors.getNewSiteInfo(state),
});

export default flow(
  reduxForm({
    form: 'AddSiteForm',
    fields: ['siteName', 'siteURL'],
    validate,
    getFormState: state => state.theme.reduxForm,
  }),
  connect(mapStateToProps),
  translate('sites')
)(AddSiteForm);
