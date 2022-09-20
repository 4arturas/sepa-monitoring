import {NavLink, useLocation} from "react-router-dom";
import {routes} from "../routes/Routes";
import React from "react";
import {BalancesINSTCell} from "../components/Balances/BalancesINST.Cell";
import {BalancesSCTCell} from "../components/Balances/BalancesSCT.Cell";
import {BalancesSDDCell} from "../components/Balances/BalancesSDD.Cell";

export const BalancesPage = () => {
    const location = useLocation();

    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div data-testid={'turnovers-page'}>
            <div>
                <NavLink to={routes.balances.children.inst.path} style={({ isActive }) => isActive ? activeStyle : undefined}>INST</NavLink>&nbsp;/&nbsp;
                <NavLink to={routes.balances.children.sct.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SCT</NavLink>&nbsp;/&nbsp;
                <NavLink to={routes.balances.children.sdd.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SDD</NavLink>
            </div>
            { location.pathname === routes.balances.path && <BalancesINSTCell /> }
            { location.pathname === routes.balances.children.inst.fullPath && <BalancesINSTCell /> }
            { location.pathname === routes.balances.children.sct.fullPath && <BalancesSCTCell /> }
            { location.pathname === routes.balances.children.sdd.fullPath && <BalancesSDDCell /> }
        </div>
    );
}
