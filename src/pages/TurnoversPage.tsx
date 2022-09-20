import {NavLink, useLocation} from "react-router-dom";
import {PaymentsCell} from "../components/Payments/PaymentsCell";
import {routes} from "../routes/Routes";
import {TurnoversINSTCell} from "../components/Turnovers/TurnoversINST.Cell";
import {TurnoversSCTCell} from "../components/Turnovers/TurnoversSCT.Cell";
import {TurnoversSDDCell} from "../components/Turnovers/TurnoversSDD.Cell";
import React from "react";

export const TurnoversPage = () => {
    const location = useLocation();

    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div data-testid={'turnovers-page'}>
            <div>
                <NavLink to={routes.turnovers.children.inst.path} style={({ isActive }) => isActive ? activeStyle : undefined}>INST</NavLink>&nbsp;/&nbsp;
                <NavLink to={routes.turnovers.children.sct.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SCT</NavLink>&nbsp;/&nbsp;
                <NavLink to={routes.turnovers.children.sdd.path} style={({ isActive }) => isActive ? activeStyle : undefined}>SDD</NavLink>
            </div>
            { location.pathname === routes.turnovers.path && <TurnoversINSTCell /> }
            { location.pathname === routes.turnovers.children.inst.fullPath && <TurnoversINSTCell /> }
            { location.pathname === routes.turnovers.children.sct.fullPath && <TurnoversSCTCell /> }
            { location.pathname === routes.turnovers.children.sdd.fullPath && <TurnoversSDDCell /> }
        </div>
    );
}
