import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact active>Burger Builder</NavigationItem>
        {props.isAuthenticated?<NavigationItem link='/orders'>Orders</NavigationItem>:null}
        {!props.isAuthenticated
            ?<NavigationItem link='/login'>LogIn/SignUp</NavigationItem>
            :<NavigationItem link='/logout'>LogOut</NavigationItem>}
    </ul>
);

export default navigationItems;