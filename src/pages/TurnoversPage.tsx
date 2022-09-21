import {useLocation} from "react-router-dom";
import {routes} from "../routes/Routes";
import {TurnoversINSTCell} from "../components/Turnovers/TurnoversINST.Cell";
import {TurnoversSCTCell} from "../components/Turnovers/TurnoversSCT.Cell";
import {TurnoversSDDCell} from "../components/Turnovers/TurnoversSDD.Cell";
import React from "react";
import {NavBarSmall} from "../components/NavBar/NavBarSmall";

export const TurnoversPage = () => {
    const location = useLocation();
    return (
        <div data-testid={'turnovers-page'}>
            <NavBarSmall instPath={routes.turnovers.children.inst.path} sctPath={routes.turnovers.children.sct.path} sddPath={routes.turnovers.children.sdd.path} />
            { location.pathname === routes.turnovers.path && <TurnoversINSTCell /> }
            { location.pathname === routes.turnovers.children.inst.fullPath && <TurnoversINSTCell /> }
            { location.pathname === routes.turnovers.children.sct.fullPath && <TurnoversSCTCell /> }
            { location.pathname === routes.turnovers.children.sdd.fullPath && <TurnoversSDDCell /> }
        </div>
    );
}
