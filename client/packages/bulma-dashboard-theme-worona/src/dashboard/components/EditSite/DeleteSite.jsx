import React from 'react';
import { connect } from 'react-redux';
import Button from '../../elements/Button';
import * as actions from '../../actions';

const DeleteSite = ({ deleteModal, siteId }) => (
  <div className="columns">
    <div className="column is-half is-offset-one-quarter">
      <hr />
      <div className="is-pulled-right">
        <Button
          size="small"
          outlined
          color="danger"
          onClick={deleteModal}
        >
          <span>Delete { siteId }</span>
        </Button>
      </div>
    </div>
  </div>
);

DeleteSite.propTypes = {
  deleteModal: React.PropTypes.func.isRequired,
  siteId: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  siteId: deps.selectors.getSelectedSiteId(state),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteModal: () => dispatch(actions.deleteModalOpened({ id: ownProps.siteId, name: ownProps.name })),
});

export default connect(null, mapDispatchToProps)(DeleteSite);
