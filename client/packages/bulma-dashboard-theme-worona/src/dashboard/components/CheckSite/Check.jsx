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
  const LinkToEditURL = <Link to={`/edit-site/${site.id}`}>{t('check-edit-url-text')}</Link>;
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
            <Interpolate
              i18nKey="check-error-online-body-iscorrect"
              LinkToEditURLComponent={LinkToEditURL}
              value={<strong>{site.url}</strong>}
            />
          </li>
          <br />
          <li>{t('check-error-online-body-isup')}</li>
        </ul>
      </div>
    );
  } else if (checkType === 'plugin') {
    linkToHelp += '#2-woronas-plugin-is-missing';
    ErrorMessageBody = () => (
      <div className="content">
        <Interpolate
          i18nKey="check-error-plugin-body"
          LinkToDownLoadPlugin={`${site.url}/wp-admin/plugin-install.php?tab=plugin-information&plugin=worona`}
          useDangerouslySetInnerHTML
        />
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
          <a className="button is-danger is-outlined" href={linkToHelp}>
            <span className="icon">
              <i className="fa fa-info" />
            </span>
            <span>Visit our Documentation for help</span>
          </a>
          <Button color={color} size="large">
            <Icon code="info-circle" />
            <span>Help</span>
          </Button>
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

Message = flow(
  connect(mapStateToMessageProps),
  translate('theme')
)(Message);

/* Retry Button in case of warning or error */
const UnConnectedRetryButton = ({ requestCheckSite }) => (
  <div className="column is-1">
    <div className="level is-mobile">
      <div className="level-left is-marginless">
        <div className="notification is-white has-text-centered">
          <Button
            size="large"
            onClick={requestCheckSite}
          >
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
const mapDispatchToRetryButtonProps = (dispatch) => ({
  requestCheckSite: () => dispatch(deps.actions.checkSiteRequested()),
});

export const RetryButton = connect(null, mapDispatchToRetryButtonProps)(UnConnectedRetryButton);

/* Notification Check Item */
const Check = ({ text, status, checkType, t }) => {
  if (status === 'inactive') {
    return (
      <div id={checkType} className="columns" >
        <div className="column is-4 is-offset-4">
          <div className="notification">
            <div className="level is-mobile">
              <div className="level-left">
                { text }
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
    <div className="columns" >
      <div className="column is-4 is-offset-4">
        <div className={`notification is-${color}`}>
          <div className="level is-mobile">
            <div className="level-left">
              {t(`check-text-${checkType}`)}
            </div>
            {icon ?
              <div className="level-right is-marginless">
                <a className={`button is-${color} is-disabled`} />
                <Icon code={icon} />
              </div>
              :
              <div className="level-right is-marginless">
                <a className="button is-primary is-loading" />
              </div>
            }
          </div>
        </div>
        {/* Error Message? */}
        { conflict ?
          <Message checkType={checkType} color={color} status={status} />
        : null}
      </div>
      {/* Retry Button? */}
      { conflict ?
        <RetryButton />
      : null}
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
  status: deps.selectors.getCheckSite(state, ownProps.checkType),
});
export default flow(
  connect(mapStateToCheckProps),
  translate('theme')
)(Check);
