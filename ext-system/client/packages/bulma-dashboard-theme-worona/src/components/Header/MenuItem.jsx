import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import styles from './style.css';

const ExtLink = props => (
  <a {...props}>
    {props.children}
  </a>
);
ExtLink.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export const MenuItem = ({ type, name, url, target, link, action, icon }) => {
  const Anchor = !link ? ExtLink : Link;
  const onClick = !!action ? e => { e.preventDefault(); action(); } : null;
  const anchorClass = cn(
    type === 'button' && 'button is-info is-outlined is-inverted',
    type === 'text' && window.location.pathname === url && styles.active,
    styles.item
  );
  return (
    <span className="nav-item is-info">
      <Anchor className={anchorClass} href={url} to={link} target={target} onClick={onClick}>
        {type === 'button' && icon ? (
          <span className="icon">
            <i className={`fa fa-${icon}`}></i>
          </span>
        ) : null}
        {name}
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
};

export default MenuItem;
