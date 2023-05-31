import style from './footer.module.css';

import { useFOFContext } from "../context/context";

const Footer = () => {

    const { currentPath } = useFOFContext();
    const validPaths = ['/', '/login', '/signup', '/allDetails', '/editAllDetails', 'searchFriends'];

    if (validPaths.includes(currentPath)) {

        return (

            <footer>

                <div className={style.div1}>
                    <div className={style.stats_card}>
                        <i className="fa-solid fa-user-large"></i>
                        <h1>525120+</h1>
                        <p>Total Visitors</p>
                    </div>

                    <div className={style.stats_card}>
                        <i className="fa-solid fa-users"></i>
                        <h1>6252+</h1>
                        <p>Registered Users</p>
                    </div>

                    <div className={style.stats_card}>
                        <i className="fa-solid fa-hand-holding-dollar"></i>
                        <h1>16+</h1>
                        <p>Donation Amount($)</p>
                    </div>
                </div>

                <hr className={style.hrline} />

                <div className={style.div2}>
                    <div className={style.follow_contact_us}>

                        <h1>Follow us</h1>

                        <div className={style.social_media}>
                            <a href=""> <i className="fa-brands fa-instagram"> </i> </a>
                            <a href=""> <i className="fa-brands fa-facebook"> </i> </a>
                            <a href=""> <i className="fa-brands fa-twitter"> </i> </a>
                            <a href=""> <i className="fa-brands fa-linkedin"> </i> </a>
                            <a href=""> <i className="fa-solid fa-envelope"> </i> </a>
                            <a href=""> <i className="fa-brands fa-youtube"> </i> </a>
                        </div>
                    </div>

                    <div className={style.follow_contact_us}>

                        <h1>Contact Us</h1>
                        <p>Phone no: 91+ 9646565565</p>
                        <p><a href="#">Email: fofwebsite@gmail.com</a></p>

                    </div>

                </div>
            </footer>
        )
    }

}

export default Footer