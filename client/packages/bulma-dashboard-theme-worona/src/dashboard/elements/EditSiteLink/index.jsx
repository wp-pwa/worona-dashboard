import React from 'react';
import { Link } from 'react-router';
import styles from './style.css';

const EditSiteLink = ({ id, color }) => (
  <Link to={`/edit-site/${id}`} className={styles.editSite}>
    <span style={{ color }}>
      edit
    </span>
  </Link>
);

EditSiteLink.propTypes = {
  id: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
};

export default EditSiteLink;
