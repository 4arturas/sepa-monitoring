import {NavLink} from "react-router-dom";
import {routes} from "../../routes/Routes";
import {userSliceActions} from "../Login/User.Slice";
import {useAppSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import {ROLE_ADMIN} from "../../global";
import {ChangeCompany} from "../ChangeCompany/ChangeCompany";

const NavBar = () => {

    const user = useAppSelector( (state) => state.user.currentUser );
    const dispatch = useDispatch();

    let activeStyle = {
        textDecoration: 'underline',
        fontWeight: 'bold'
    };

    return (
        <span>
            <NavLink to={'/'} data-testid={'main-link'} style={({ isActive }) => isActive ? activeStyle : undefined}>Main</NavLink> -&nbsp;
            { user && <><NavLink to={routes.payments.path} data-testid={'payments-link'} style={({ isActive }) => isActive ? activeStyle : undefined}>Payments</NavLink> -&nbsp;</> }
            { user && <><NavLink to={routes.turnovers.path} data-testid={'turnovers-link'} style={({ isActive }) => isActive ? activeStyle : undefined}>Turnovers</NavLink> -&nbsp;</> }
            { user && <><NavLink to={routes.balances.path} data-testid={'balances-link'} style={({ isActive }) => isActive ? activeStyle : undefined}>Balances</NavLink> -&nbsp;</> }
            { (user && user.role === ROLE_ADMIN) && <><NavLink to={routes.companies.path} data-testid={'companies-link'} style={({ isActive }) => isActive ? activeStyle : undefined}>Companies</NavLink> -&nbsp;</> }
            { (user && user.role === ROLE_ADMIN) && <><NavLink to={'/users'} data-testid={'users-link'} style={({ isActive }) => isActive ? activeStyle : undefined}>Users</NavLink> -&nbsp;</> }
            <NavLink to={'/about'} data-testid={'about-link'} style={({ isActive }) => isActive ? activeStyle : undefined}>About</NavLink>

            { !user &&
                <Tooltip title={'Login'}>
                    <NavLink to={routes.login.path} data-testid={'logout-link'} style={{float:'right'}}>
                        <LoginOutlined />
                    </NavLink>
                </Tooltip> }
            { user &&
                <Tooltip title={'Logout'}>
                    <NavLink to={routes.login.path} data-testid={'login-link'} onClick={ () => dispatch(userSliceActions.logout()) } style={{float:'right'}}>
                        <LogoutOutlined style={{fontSize:'30px'}}/>
                    </NavLink>
                </Tooltip> }

            <span style={{float:'right', color:'white', marginRight:'20px'}}>
                <ChangeCompany/>&nbsp;&nbsp;&nbsp;&nbsp;
                {user?.email}
            </span>

        </span>
    );
}
export default NavBar;
