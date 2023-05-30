import React from 'react';
import { Link } from 'react-router-dom';
import style from './navbar.module.css';

const Navbar = () => {

	return (
		<nav className={style.navbar}>
			<label className={style.label}>FOF </label>

			<input type="checkbox" className={style.click} />

			<label className={`${style.label} ${style.menu}`}>
				<i className="fa-solid fa-bars"></i>
			</label>

			<ul>
				<li> <Link to="/">        <i className="fa-solid fa-house-chimney"></i>          Home        </Link></li>
				<li> <Link to="/searchFriends">  <i className="fa-solid fa-magnifying-glass"></i>Search      </Link></li>
				<li> <Link to="/editAllDetails">    <i className="fa-solid fa-pen-to-square"></i>Edit Details</Link></li>
				<li> <Link to="/about">   <i className="fa-solid fa-address-card"></i>           About       </Link></li>
				<li> <Link to="#">        <i className="fa-solid fa-user-group"></i>                         </Link></li>
				{/* <li> <Link to="#">        <i className="fa-solid fa-bell"></i>                           </Link></li> */}
				<li> <Link to="#">         <i className="fa-solid fa-hand-holding-dollar"></i>                     </Link></li>
				{/* <li> <Link to="/suggestions"> <i className="fa-solid fa-comments"></i>          Suggestions </Link></li> */}
				<li> <Link to="/logout">      <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out  </Link></li>
			</ul>

		</nav>
	)

}

export default Navbar;