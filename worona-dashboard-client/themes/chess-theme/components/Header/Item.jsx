import React from 'react';

const Text = ({ name, url, target }) => {
  const style = window.location.pathname === url ?
    'header-item is-active' : 'header-item';
  return (
    <a className={style} href={url} target={target}>
      {name}
    </a>
  );
};
Text.propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  target: React.PropTypes.string,
};

const Button = ({ name, icon, url }) => (
  <span className="header-item">
    <a className="button is-info is-outlined is-inverted" href={url}>
      {icon ? (
        <span className="icon">
          <i className={`fa fa-${icon}`}></i>
        </span>
      ) : null}
      {name}
    </a>
  </span>
);
Button.propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
};

export const Item = props => {
  if (props.type === 'text') {
    return <Text {...props} />;
  } else if (props.type === 'button') {
    return <Button {...props} />;
  }
  return null;
};
Item.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  target: React.PropTypes.string,
};
