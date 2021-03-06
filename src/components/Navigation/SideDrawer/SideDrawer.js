import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux'

const sideDrawer = (props) => {
    return(
        <Aux>
            <Backdrop />
  <div className={styles.SideDrawer}>
      <div className={styles.Logo}>
      <Logo />
      </div>
      
      <nav>
          <NavigationItems />
      </nav>
  </div>
  </Aux>
    );

}

export default sideDrawer;