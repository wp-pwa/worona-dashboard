import React from 'react';
import { connect } from 'react-redux';

import * as deps from '../../dependencies';
import Icon from '../elements/Icon';
import Button from '../elements/Button';

/* Error Message */
export const Message = ({ header, body, color, status }) => (
  <article className={`message is-${color}`}>
    <div className="message-header">
      {header}
    </div>
    <div className="message-body">
      {body}
      <div className="has-text-centered">
        <Button color={color} size="large">
          <Icon code="info-circle" />
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

Message.propTypes = {
  header: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
};

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
const Check = ({ text, status, id }) => {
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
              {text}
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
          <Message header="lorem" body="ipsum" color={color} status={status} />
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
};

const mapStateToCheckProps = (state, ownProps) => ({
  status: deps.selectors.getCheckSite(state, ownProps.id),
});

export default connect(mapStateToCheckProps)(Check);
