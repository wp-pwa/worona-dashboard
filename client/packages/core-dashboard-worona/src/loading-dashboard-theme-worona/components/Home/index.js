import React from 'react';
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

export default Home;
