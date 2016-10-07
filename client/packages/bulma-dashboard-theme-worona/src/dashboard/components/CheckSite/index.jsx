import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import TopNav from '../Header/TopNav';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';
import Icon from '../elements/Icon';
import * as deps from '../../dependencies';

const Check = ({ text, status }) => {
  if (status === 'inactive') {
    return (
      <div className="notification">
        <div className="level is-mobile">
          <div className="level-left">
            { text }
          </div>
        </div>
      </div>
    );
  }
  let color;
  let icon;
  if (status === 'loading') {
    color = 'primary';
  } else {
    color = status;
    if (status === 'warning') {
      icon = 'warning';
    } else if (status === 'success') {
      icon = 'check';
    } else if (status === 'danger') {
      icon = 'times';
    }
  }

  return (
    <div className={`notification is-${color}`}>
      <div className="level is-mobile">
        <div className="level-left">
          {text}
        </div>
        {status !== 'loading' ?
          <div className="level-right is-marginless">
            <a className={`button is-${status} is-disabled`} />
            <Icon iconFaCode={icon} />
          </div>
          :
          <div className="level-right is-marginless">
            <a className="button is-primary is-loading" />
          </div>
        }
      </div>
    </div>
  );
};

const CheckSite = ({ site }) => (
  <Body>
    <Header>
      <TopNav />
      <Hero title={site.name}>
        <small>{site.id}</small>
        <br />
        <small>{site.url}</small>
      </Hero>
    </Header>

    <Main>
      <div className="columns" >
        <div className="column is-4 is-offset-4">
          <Check text="Site online" status="success" />
        </div>
      </div>
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);


const mapStateToProps = (state) => ({
  site: deps.selectors.getSelectedSite(state),
});

CheckSite.propTypes = {
  site: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(CheckSite);
