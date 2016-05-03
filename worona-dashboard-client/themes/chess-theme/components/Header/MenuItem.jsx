import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

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
  const anchorClass = cn(type === 'button' && 'button is-info is-outlined is-inverted',
    type === 'text' && (window.location.pathname === url ? 'header-item is-active' : 'header-item')
  );
  const component = (
    <Anchor className={anchorClass} href={url} to={link} target={target} onClick={onClick}>
      {type === 'button' && icon ? (
        <span className="icon">
          <i className={`fa fa-${icon}`}></i>
        </span>
      ) : null}
      {name}
    </Anchor>
  );
  if (type === 'button') {
    return (
      <span className="header-item">
        {component}
      </span>
    );
  }
  return component;
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
