import React from 'react';

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
export const RetryButton = () => (
  <div className="column is-1">
    <div className="level is-mobile">
      <div className="level-left is-marginless">
        <div className="notification is-white has-text-centered">
          <Button
            size="large"
          >
            <Icon code="refresh" />
            <span>Retry</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

/* Notification Check Item */
export const Check = ({ text, status, key }) => {
  if (status === 'inactive') {
    return (
      <div id={key} className="columns" >
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
  const conflict = status === 'warning' || status === 'danger';
  if (status === 'loading') {
    color = 'primary';
  } else {
    color = status;
    if (status === 'warning') {
      icon = 'warning';
    } else if (status === 'success') {
      icon = 'check';
    } else if (status === 'danger') {
      icon = 'times';
    }
  }

  return (
    <div className="columns" >
      <div className="column is-4 is-offset-4">
        <div className={`notification is-${color}`}>
          <div className="level is-mobile">
            <div className="level-left">
              {text}
            </div>
            {status !== 'loading' ?
              <div className="level-right is-marginless">
                <a className={`button is-${status} is-disabled`} />
                <Icon code={icon} small />
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
  key: React.PropTypes.string,
  text: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
};
