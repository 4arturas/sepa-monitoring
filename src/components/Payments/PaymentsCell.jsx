import React from "react";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes/Routes";

export const PaymentsCell = () => {

    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div>
            <NavLink to={routes.payments.children.inst.path} style={({ isActive }) => isActive ? activeStyle : undefined}>INST</NavLink>&nbsp;/&nbsp;
            <NavLink to={routes.payments.children.sct.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SCT</NavLink>&nbsp;/&nbsp;
            <NavLink to={routes.payments.children.sdd.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SDD</NavLink>
        </div>
    );
}
