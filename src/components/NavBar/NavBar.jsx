import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <Link to={'/'} data-testid={'main-link'}>main</Link> -&nbsp;
            <Link to={'/payments'} data-testid={'payments-link'}>payments</Link> -&nbsp;
            <Link to={'/companies'} data-testid={'companies-link'}>companies</Link> -&nbsp;
            <Link to={'/users'} data-testid={'users-link'}>users</Link> -&nbsp;
            <Link to={'/about'} data-testid={'about-link'}>about</Link>
        </div>
    );
}
export default NavBar;
