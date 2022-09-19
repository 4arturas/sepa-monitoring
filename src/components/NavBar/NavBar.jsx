import {Link} from "react-router-dom";
import {routes} from "../../routes/Routes";
import {userSliceActions} from "../Login/User.Slice";
import {useAppSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";

const NavBar = () => {

    const user = useAppSelector( (state) => state.user.currentUser );
    const dispatch = useDispatch();

    return (
        <span>
            <Link to={'/'} data-testid={'main-link'}>main</Link> -&nbsp;
            { user && <><Link to={'/payments'} data-testid={'payments-link'}>payments</Link> -&nbsp;</> }
            { user && <><Link to={'/companies'} data-testid={'companies-link'}>companies</Link> -&nbsp;</> }
            { user && <><Link to={'/users'} data-testid={'users-link'}>users</Link> -&nbsp;</> }
            <Link to={'/about'} data-testid={'about-link'}>about</Link>

            { !user &&
                <Tooltip title={'Login'}>
                    <Link to={routes.login.path} data-testid={'logout-link'} style={{float:'right'}}>
                        <LoginOutlined />
                    </Link>
                </Tooltip> }
            { user &&
                <Tooltip title={'Logout'}>
                    <Link to={routes.login.path} data-testid={'login-link'} style={{float:'right'}} onClick={ () => dispatch(userSliceActions.logout()) }>
                        <LogoutOutlined />
                    </Link>
                </Tooltip> }

            <span style={{float:'right', color:'white', marginRight:'20px'}}>{user?.email}</span>

        </span>
    );
}
export default NavBar;
