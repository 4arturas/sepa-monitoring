import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes/Routes";
import {UserInBrowser} from "../Login/User.Slice";
import {useAppSelector} from "../../app/hooks";
import {PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea} from "../../services/openapi";

export const PaymentsCell = () => {

    const user:UserInBrowser | null = useAppSelector(state => state.user.currentUser );

    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div>
            { user &&
                <>
                    { user?.instIsSet && <><NavLink to={routes.payments.children.inst.path} style={({ isActive }) => isActive ? activeStyle : undefined}>INST</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> }
                    { user?.sctIsSet && <><NavLink to={routes.payments.children.sct.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SCT</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> }
                    { user?.sddIsSet && <><NavLink to={routes.payments.children.sdd.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SDD</NavLink></> }
                </>
            }
        </div>
    );
}
