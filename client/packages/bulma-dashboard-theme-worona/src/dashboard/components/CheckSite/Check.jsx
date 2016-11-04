import React from 'react';
import { connect } from 'react-redux';
import { translate, Interpolate } from 'react-i18next';
import { flow } from 'lodash/fp';
import { Link } from 'react-router';

import * as deps from '../../deps';
import Icon from '../elements/Icon';
import Button from '../elements/Button';

/* Error Message */
let Message = ({ header, body, color, status, t, site }) => {
  const LinkToEditURL = <Link to={`/edit-site/${site.id}`}>{t('check-edit-url-text')}</Link>;
  return (
    <article className={`message is-${color}`}>
      <div className="message-header">
        <strong>{t(header)}</strong>
      </div>
      <div className="message-body">
        <div className="content">
          <Interpolate
            i18nKey={body}
            useDangerouslySetInnerHTML
            dangerouslySetInnerHTMLPartElement={null}
            LinkToEditURLComponent={LinkToEditURL}
            value={<strong>{site.url}</strong>}
            regexp={/(.*)/}
          />
        </div>
        <div className="has-text-centered">
          <Button color={color} size="large">
            <Icon code="info-circle">
            <span>Help</span>
          </Button>
          &nbsp;
          { (status === 'warning') ?
            <Button size="large">
              Continue
            </Button>
          : null }
        </div>
      </div>
    </article>
  );
};

Message.propTypes = {
  header: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  site: React.PropTypes.object,
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
const Check = ({ text, status, id, t }) => {
  if (status === 'inactive') {
    return (
      <div id={id} className="columns" >
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
              {t(`check-text-${id}`)}
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
          <Message header={`check-error-${id}-header`} body={`check-error-${id}-body`} color={color} status={status} />
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
  id: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  t: React.PropTypes.func,
};

const mapStateToCheckProps = (state, ownProps) => ({
  status: deps.selectors.getCheckSite(state, ownProps.id),
});
export default flow(
  connect(mapStateToCheckProps),
  translate('theme')
)(Check);
