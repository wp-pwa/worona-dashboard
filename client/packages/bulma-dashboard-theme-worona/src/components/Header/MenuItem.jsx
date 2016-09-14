import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { connect } from 'react-redux';

import Icon from '../elements/Icon';

export const ExtLink = props => (
  <a {...props}>
    {props.children}
  </a>
);
ExtLink.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export const MenuItem = ({ type, name, url, target, link, action, icon, location, tabindex }) => {
  const Anchor = !link ? ExtLink : Link;
  const anchorClass = cn({
    'button is-primary': type === 'button',
    'is-active': location === url,
  });
  return (
    <span className="nav-item">
      <Anchor className={anchorClass}
        href={url} to={link} target={target} onClick={action}
        role="button" tabIndex={tabindex}
      >
        {type === 'button' && icon ? (
          <Icon iconFaCode={icon} small />
        ) : null}
        <span>{name}</span>
      </Anchor>
    </span>
  );
};
MenuItem.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string,
  link: React.PropTypes.string,
  action: React.PropTypes.func,
  target: React.PropTypes.string,
  icon: React.PropTypes.string,
  location: React.PropTypes.string,
  tabindex: React.PropTypes.number,
};

const mapStateToProps = state => ({ location: state.routing.locationBeforeTransitions.pathname });

export default connect(mapStateToProps)(MenuItem);
