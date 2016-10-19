import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import * as deps from '../../deps';
import { validate } from './validate';

const submit = siteId => (values, dispatch) => {
  dispatch(deps.actions.createSiteRequested(values.siteName, values.siteURL, siteId));
};

const AddSiteForm =
({ handleSubmit, waiting, statusMessage, errorMessage, reset, initialValues: { siteId } }) => (
  <section className="section">
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
              size="is-large"
            />

            <Field
              name="siteName"
              label="Site name"
              component={Input}
              type="text"
              placeholder="Site"
              icon="info-circle"
              size="is-large"
            />

            {statusMessage ? (
              <article className="message">
                <div className="message-body has-text-centered">
                  <strong>{statusMessage}</strong>
                </div>
              </article>)
              : null
            }

            {errorMessage ? (
              <article className="message is-danger">
                <div className="message-body has-text-centered">
                  <strong>{errorMessage}</strong>
                </div>
              </article>)
              : null
            }

            <div className="level is-mobile">
              <div className="level-left center">

                <Button
                  color="primary"
                  size="medium"
                  loading={waiting}
                  disabled={waiting}
                  type="submit"
                >
                  <Icon code="plus-circle" />
                  <span><strong>Add Site</strong></span>
                </Button>

                <Button className="button is-link" onClick={reset}>Reset</Button>
              </div>

              <div className="level-right">
                <Link className="button" to="/">Cancel</Link>
              </div>
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
  statusMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  errorMessage: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  reset: React.PropTypes.func,
  initialValues: React.PropTypes.shape({
    siteId: React.PropTypes.string,
    siteName: React.PropTypes.string,
    siteURL: React.PropTypes.string,
  }),
};

const AddSiteWithForm = reduxForm({
  form: 'AddSiteForm',
  fields: ['siteName', 'siteURL'],
  validate,
  getFormState: state => state.theme.reduxForm,
})(AddSiteForm);

const mapStateToProps = state => ({
  waiting: deps.selectors.getIsCreatingSite(state),
  statusMessage: deps.selectors.getCreateSiteStatus(state),
  errorMessage: deps.selectors.getCreateSiteError(state),
  initialValues: deps.selectors.getNewSiteInfo(state),
});

export default connect(mapStateToProps)(AddSiteWithForm);
