import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const NavFoot = props => (
  <div>
    <NavBar />
    {props.children}
    <Footer />
  </div>
);

export default NavFoot;
