import {useLocation} from "react-router-dom";
import {routes} from "../routes/Routes";
import {TurnoversINSTCell} from "../components/Turnovers/TurnoversINST.Cell";
import {TurnoversSCTCell} from "../components/Turnovers/TurnoversSCT.Cell";
import {TurnoversSDDCell} from "../components/Turnovers/TurnoversSDD.Cell";
import React from "react";
import {NavBarSmall} from "../components/NavBar/NavBarSmall";
import {Alert} from "antd";
import {MSG_BUSINESS_AREA_IS_NOT_SET} from "../global";
import {UserInBrowser} from "../components/Login/User.Slice";
import {useAppSelector} from "../app/hooks";
import {ChangeCompany} from "../components/ChangeCompany/ChangeCompany";

export const TurnoversPage = () => {
    const location                          = useLocation();
    const currentUser:UserInBrowser | null  = useAppSelector( state => state.user.currentUser );

    if ( !currentUser?.instIsSet )
        return <Alert showIcon={true} type='info' message={MSG_BUSINESS_AREA_IS_NOT_SET} description={<ChangeCompany/>}/>;

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
