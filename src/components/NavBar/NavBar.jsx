import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <Link to={'/'} data-testid={'main-link'}>main</Link> -&nbsp;
            <Link to={'/organizations'} data-testid={'organizations-link'}>organizations</Link> -&nbsp;
            <Link to={'/users'} data-testid={'users-link'}>users</Link> -&nbsp;
            <Link to={'/about'} data-testid={'about-link'}>about</Link>
        </div>
    );
}
export default NavBar;
