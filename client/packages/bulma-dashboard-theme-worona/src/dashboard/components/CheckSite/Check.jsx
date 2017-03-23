import React from 'react';
import { connect } from 'react-redux';
import { translate, Interpolate } from 'react-i18next';
import { flow } from 'lodash/fp';
import { Link } from 'react-router';
import * as deps from '../../deps';
import Icon from '../../elements/Icon';
import Button from '../../elements/Button';

/* Error Message */
let Message = ({ checkType, color, t, site }) => {
  let ErrorMessageBody;
  let linkToHelp = 'https://docs.worona.org/dashboard/getting-started/troubleshooting.html';
  if (checkType === 'online') {
    linkToHelp += '#1-your-site-is-not-online-or-available';
    ErrorMessageBody = () => (
      <div className="content">
        {t('check-error-online-body')}
        <br />
        <ul>
          <li>
            {t('check-error-online-body-isup')}
          </li>
          <br />
          <li>
            <Interpolate
              i18nKey="check-error-online-body-iscorrect"
              value={<strong>{site.url}</strong>}
            />
          </li>
        </ul>
        <br />
        <div className="has-text-centered">
          <Link className="button is-danger is-medium" to={`/edit-site/${site.id}`}>
            <span className="icon is-small">
              <i className="fa fa-refresh" aria-hidden="true" />
            </span>
            <span>
              {t('check-edit-url-text')}
            </span>
          </Link>
          <br /><br />
          or
        </div>
      </div>
    );
  } else if (checkType === 'plugin') {
    let linkToDownLoadPlugin = site.url;
    linkToDownLoadPlugin += '/wp-admin/plugin-install.php?tab=plugin-information&plugin=worona';

    linkToHelp += '#2-woronas-plugin-is-missing';

    ErrorMessageBody = () => (
      <div className="content">
        <Interpolate i18nKey="check-error-plugin-body" useDangerouslySetInnerHTML />
        <br /><br />
        <div className="has-text-centered">
          <a
            className="button is-danger is-medium"
            href={linkToDownLoadPlugin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon is-small">
              <i className="fa fa-download" aria-hidden="true" />
            </span>
            <span>
              &nbsp;Install Worona Plugin
            </span>
          </a>
          <br /><br />
          or
        </div>
      </div>
    );
  } else if (checkType === 'wpapi') {
    let linkToDownLoadPlugin = site.url;
    linkToDownLoadPlugin += '/wp-admin/plugin-install.php?tab=plugin-information&plugin=rest-api';
    linkToHelp += '#3-wordpress-rest-api-plugin-missing';

    ErrorMessageBody = () => (
      <div className="content">
        <Interpolate i18nKey="check-error-wpapi-body" useDangerouslySetInnerHTML />
        <br /><br />
        <div className="has-text-centered">
          <a
            className="button is-danger is-medium"
            href={linkToDownLoadPlugin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon is-small">
              <i className="fa fa-download" aria-hidden="true" />
            </span>
            <span>
              &nbsp;Install WordPress REST API
            </span>
          </a>
          <br /><br />
          or
        </div>
      </div>
    );
  }
  return (
    <article className={`message is-${color}`}>
      <div className="message-header">
        <strong>{t(`check-error-${checkType}-header`)}</strong>
      </div>
      <div className="message-body">
        <ErrorMessageBody />
        <div className="has-text-centered">
          <a
            className="button is-danger is-outlined"
            href={linkToHelp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon is-small">
              <i className="fa fa-info" />
            </span>
            <span>Visit our Documentation for help</span>
          </a>
        </div>
      </div>
    </article>
  );
};

Message.propTypes = {
  checkType: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  site: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  }),
  t: React.PropTypes.func,
};

const mapStateToMessageProps = state => ({
  site: deps.selectors.getSelectedSite(state),
});

Message = flow(connect(mapStateToMessageProps), translate('theme'))(Message);

/* Retry Button in case of warning or error */
const UnConnectedRetryButton = ({ requestCheckSite }) => (
  <div className="column is-1">
    <div className="level is-mobile">
      <div className="level-left is-marginless">
        <div className="notification is-white has-text-centered">
          <Button size="large" onClick={requestCheckSite}>
            <Icon code="refresh" />
            <span>Retry</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

UnConnectedRetryButton.propTypes = {
  requestCheckSite: React.PropTypes.func.isRequired,
};
const mapDispatchToRetryButtonProps = dispatch => ({
  requestCheckSite: () => dispatch(deps.actions.checkSiteRequested()),
});

export const RetryButton = connect(null, mapDispatchToRetryButtonProps)(UnConnectedRetryButton);

/* Notification Check Item */
const Check = ({ text, status, checkType, t }) => {
  if (status === 'inactive') {
    return (
      <div id={checkType} className="columns">
        <div className="column is-4 is-offset-4">
          <div className="notification">
            <div className="level is-mobile">
              <div className="level-left">
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  let color;
  let icon;
  const conflict = status === 'warning' || status === 'error';
  if (status === 'loading') {
    color = 'primary';
    icon = null;
  } else if (status === 'warning') {
    icon = 'warning';
    color = 'warning';
  } else if (status === 'success') {
    icon = 'check';
    color = 'success';
  } else if (status === 'error') {
    icon = 'times';
    color = 'danger';
  }

  return (
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <div className={`notification is-${color}`}>
          <div className="level is-mobile">
            <div className="level-left">
              {t(`check-text-${checkType}`)}
            </div>
            {icon
              ? <div className="level-right is-marginless">
                  <button className={`button is-${color} is-disabled`} />
                  <Icon code={icon} />
                </div>
              : <div className="level-right is-marginless">
                  <button className="button is-primary is-loading" />
                </div>}
          </div>
        </div>
        {/* Error Message? */}
        {conflict ? <Message checkType={checkType} color={color} status={status} /> : null}
      </div>
      {/* Retry Button? */}
      {conflict ? <RetryButton /> : null}
    </div>
  );
};

Check.propTypes = {
  checkType: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  t: React.PropTypes.func,
};

const mapStateToCheckProps = (state, ownProps) => ({
  status: deps.selectorCreators.getCheckSite(ownProps.checkType)(state),
});
export default flow(connect(mapStateToCheckProps), translate('theme'))(Check);
