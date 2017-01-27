import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

const DeleteModal = ({ active, siteName, deleteSite, closeModal }) => (
  <div className={`modal ${active ? 'is-active' : ''}`} onClick={closeModal} >
    <div className="modal-background" />
    <div className="modal-content">
      <div className="columns is-mobile">
        <div className="column is-two-thirds is-offset-one-quarter">
          <div className="card is-fullwidth">
            <div className="card-content content ">
              <span className="has-text-centered">
                <h2>Delete <strong>{ siteName }</strong>?</h2>
                <hr />
                <h5>Your app will stop working and you will lose your preferences.</h5>
                <br />
              </span>
              <button className="button is-danger is-medium" onClick={deleteSite}>
                Delete
              </button>
              <button className="button is-medium is-pulled-right" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  active: React.PropTypes.bool,
  siteName: React.PropTypes.string,
  closeModal: React.PropTypes.func,
  deleteSite: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  closeModal: () => dispatch(actions.deleteModalClosed()),
});

const mapStateToProps = state => ({
  siteName: selectors.getSiteNameBeingDeleted(state),
  siteId: selectors.getSiteIdBeingDeleted(state),
  active: selectors.getDisplayingDeleteModal(state),
});

const mergeProps = ({ siteName, active, siteId }, { dispatch, closeModal }) => ({
  siteName,
  active,
  deleteSite: () => dispatch(deps.actions.deleteSiteRequested({ siteId })),
  closeModal,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DeleteModal);
