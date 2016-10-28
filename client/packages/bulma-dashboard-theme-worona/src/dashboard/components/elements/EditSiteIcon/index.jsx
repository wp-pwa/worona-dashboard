import React from 'react';
import { Link } from 'react-router';

import Icon from '../Icon';

const EditSiteIcon = ({ id }) => (
  <span>
    <Link to={`/edit-site/${id}`}>
      <Icon small code="cogs" />
    </Link>
  </span>
);

EditSiteIcon.propTypes = {
  id: React.PropTypes.string,
};

export default EditSiteIcon;
