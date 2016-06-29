import React from 'react';
import { connect } from 'react-redux';
import { isReady, isLoading } from '../../dependencies';
import style from './style.css';

export const Home = () => (
  <div>
      <div className={style.messages}>
        <div className={style.spinner}>
          <div className={style.bounce1}></div>
          <div className={style.bounce2}></div>
          <div className={style.bounce3}></div>
        </div>
    </div>
  </div>
);
Home.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  ready: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ready: isReady(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(Home);
