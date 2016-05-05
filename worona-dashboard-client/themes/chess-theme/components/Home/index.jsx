import React from 'react';
import cn from 'classnames';
import Button from '../elements/Button';
import styles from './style.css';

const Home = () => (
  <div>
    <section className="hero is-info">
      <div className="hero-content">
        <div className="container is-text-left">
              <p className="title">
                My sites
                <Button color="success" className={styles.addSite}>
                  Create new site
                </Button>
              </p>
            </div>

      </div>
    </section>
    <section className="container">
      <div className={styles.marginTop}>
          <div className="columns is-multiline">
            <div className="column">
              <div className="card">
                <header className="card-header is-centered">
                <a href="#" className="card-header-title is-info">
                  Worona Blog
                </a>
              </header>
              <div className="card-content">
                <div className="content">
                  http://blog.worona.org/
                  <br />
                  <small>Modified: 3 days ago</small>
                </div>
              </div>
              <footer className="card-footer">
                <a className="card-footer-item">
                  <span className={cn('icon', 'is-small', styles.icons)}>
                    <i className="fa fa-sliders"></i>
                  </span>
                  Configure
                </a>
                <a className="card-footer-item">
                  <span className={cn('icon', 'is-small', styles.icons)}>
                    <i className="fa fa-trash-o"></i>
                  </span>
                  Delete
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
