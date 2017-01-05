import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as deps from '../../deps';
import styles from './style.css';

let MenuEntry = ({ niceName, name, selectedSiteId, selectedService, selectedPackageName }) => (
  <li className={selectedPackageName === name ? 'is-active' : null}>
    <Link
      to={`/site/${selectedSiteId}/${selectedService}/${name}`}
      role="button" activeClassName="is-active"
    >
      {niceName}
    </Link>
  </li>
);
MenuEntry.propTypes = {
  niceName: React.PropTypes.string,
  name: React.PropTypes.string,
  selectedSiteId: React.PropTypes.string.isRequired,
  selectedService: React.PropTypes.string.isRequired,
  selectedPackageName: React.PropTypes.string.isRequired,
};

const mapStateToMenuEntryProps = (state) => ({
  selectedSiteId: deps.selectors.getSelectedSiteId(state),
  selectedService: deps.selectors.getSelectedService(state),
  selectedPackageName: deps.selectors.getSelectedPackageName(state),
});

MenuEntry = connect(mapStateToMenuEntryProps)(MenuEntry);

export const MenuCategory = ({ name, items }) => (
  <div className={styles.menuCategory}>
    <p className="menu-label">
      {name}
    </p>
    <ul className="menu-list">
      {items.map(item =>
        (<MenuEntry key={item.name} name={item.name} niceName={item.menu.niceName} />)
      )}
    </ul>
  </div>
);

MenuCategory.propTypes = {
  name: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const AsideMenu = ({ categories }) => (
  <div className="column is-hidden-mobile is-2">
    <aside className="menu">
      {categories.map(category =>
        <MenuCategory key={category.name} name={category.name} items={category.items} />
      )}
    </aside>
  </div>
);
AsideMenu.propTypes = {
  categories: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const mapStateToMenuProps = (state) => ({
  categories: deps.selectors.getCategories(state),
});

export default connect(mapStateToMenuProps)(AsideMenu);
