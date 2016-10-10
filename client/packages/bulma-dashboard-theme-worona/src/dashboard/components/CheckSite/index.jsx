import React from 'react';
import { connect } from 'react-redux';

import * as deps from '../../dependencies';

import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';
import Icon from '../elements/Icon';

export const Check = ({ text, status, key }) => {
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

Check.propTypes = {
  key: React.PropTypes.string,
  text: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
};

let CheckSiteHeader = ({ site }) => (
  <Hero title={site.name}>
    <small>{site.id}</small>
    <br />
    <small>{site.url}</small>
  </Hero>
);

const mapStateToProps = (state) => ({
  site: deps.selectors.getSelectedSite(state),
});

CheckSiteHeader.propTypes = {
  site: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }),
};

CheckSiteHeader = connect(mapStateToProps)(CheckSiteHeader);

const CheckSite = () => (
  <Body>
    <Header waitForSubscriptions={[deps.selectors.getIsReadySites]}>
      <CheckSiteHeader />
    </Header>
    <Main waitForSubscriptions={[deps.selectors.getIsReadySites]}>
      <div className="columns" >
        <div className="column is-4 is-offset-4">
          <Check text="Site online" status="inactive" key="online" />
          <Check text="Worona WordPress Plugin" status="inactive" key="wordpress-plugin" />
          <Check text="Checking Site ID" status="inactive" key="site-id" />
        </div>
      </div>
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default CheckSite;
