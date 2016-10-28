import React from 'react';
import { Link } from 'react-router';

const EditSiteLink = ({ id, color = 'white' }) => (
  <Link to={`/edit-site/${id}`}>
    <span style={{ fontSize: '12px', fontWeight: 400, color }}>
      edit
    </span>
  </Link>
);

EditSiteLink.propTypes = {
  id: React.PropTypes.string,
  color: React.PropTypes.string,
};

export default EditSiteLink;
