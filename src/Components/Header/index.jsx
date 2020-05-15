import React from 'react';
import { Link } from "react-router-dom";

import './Header.scss';

class Header extends React.Component {
    render() {
      return (
      	<div className="header">
	        <h1 className="title"><Link to={'/'}>My GitHub</Link></h1>
	        <small className="sub-heading">{"Explore all your repositories and its commits under your organization."}</small>
     	</div>
      );
    }
}

export default Header;