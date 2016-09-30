import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import TopNav from '../Header/TopNav';
import Hero from '../elements/Hero';
import Body from '../Body';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Main from '../Main';
import AddSiteForm from './AddSiteForm';
import * as deps from '../../dependencies';

const AddSite = ({ isFirstLogin }) => {
  let header = '';
  if (isFirstLogin) {
    header = (
      <Header>
        <TopNav />
        <Hero title = "Now, create your first site"
          subtitle="Your are one step away from making your site work great on mobile."
        />
      </Header>
    );
  } else {
    header = (
      <Header>
        <TopNav />
        <Hero title = "Add Site"
          subtitle="Your are one step away from making your site work great on mobile."
        />
      </Header>
    );
  }

  return (
    <Body>
      {header}

      <Main>
        <AddSiteForm />
      </Main>

      <Footer>
        <FooterLinks />
      </Footer>
    </Body>
  );
};

AddSite.propTypes = {
  isFirstLogin: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  isFirstLogin: deps.selectors.getIsFirstLogin(state),
});

export default connect(mapStateToProps)(AddSite);
