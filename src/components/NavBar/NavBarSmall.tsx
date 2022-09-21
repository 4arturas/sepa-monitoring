import {NavLink} from "react-router-dom";
import {routes} from "../../routes/Routes";
import React from "react";
import {UserInBrowser} from "../Login/User.Slice";
import {useAppSelector} from "../../app/hooks";

interface NavBarSmallInterface {
    instPath: string,
    sctPath: string,
    sddPath: string
}

export const NavBarSmall : React.FC<NavBarSmallInterface> = ( { sctPath, instPath, sddPath } ) => {
    const user:UserInBrowser | null = useAppSelector(state => state.user.currentUser );

    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div>
            { user &&
                <>
                    { user?.instIsSet && <><NavLink to={instPath} style={({ isActive }) => isActive ? activeStyle : undefined}>INST</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> }
                    { user?.sctIsSet && <><NavLink to={sctPath} style={({ isActive }) => isActive ? activeStyle : undefined}>SCT</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> }
                    { user?.sddIsSet && <><NavLink to={sddPath} style={({ isActive }) => isActive ? activeStyle : undefined}>SDD</NavLink></> }
                </>
            }
        </div>
    );
}
