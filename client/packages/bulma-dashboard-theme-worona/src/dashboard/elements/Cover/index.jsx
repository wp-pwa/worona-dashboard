import React from 'react';

const Cover = ({ onClick, hide, className }) => {
  const coverStyle = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    zIndex: -1,
  };
  if (hide) return (<div></div>);
  return (
    <div style={coverStyle} onClick={onClick} className={className} />
  );
};

Cover.propTypes = {
  onClick: React.PropTypes.func,
  hide: React.PropTypes.bool,
  className: React.PropTypes.string,
};

export default Cover;
