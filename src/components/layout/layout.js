import React from 'react';
import Aux from '../../hoc/Aux'
import styles from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
const layout= (props)=>
(
    <Aux>
        <Toolbar/>
        <SideDrawer />
    <main className={styles.content}>
        {props.children}
    </main>
    </Aux>
)
export default layout;