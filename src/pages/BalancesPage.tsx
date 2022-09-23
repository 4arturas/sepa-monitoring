import {useLocation} from "react-router-dom";
import {routes} from "../routes/Routes";
import React from "react";
import {BalancesINSTCell} from "../components/Balances/BalancesINST.Cell";
import {BalancesSCTCell} from "../components/Balances/BalancesSCT.Cell";
import {BalancesSDDCell} from "../components/Balances/BalancesSDD.Cell";
import {NavBarSmall} from "../components/NavBar/NavBarSmall";
import {UserInBrowser} from "../components/Login/User.Slice";
import {useAppSelector} from "../app/hooks";
import {Alert} from "antd";
import {MSG_BUSINESS_AREA_IS_NOT_SET} from "../global";
import {ChangeCompany} from "../components/ChangeCompany/ChangeCompany";

export const BalancesPage = () => {
    const location = useLocation();
    const currentUser:UserInBrowser | null  = useAppSelector( state => state.user.currentUser );

    if ( !currentUser?.instIsSet )
        return <Alert showIcon={true} type='info' message={MSG_BUSINESS_AREA_IS_NOT_SET} description={<ChangeCompany/>}/>;

    return (
        <div data-testid={'turnovers-page'}>
            <NavBarSmall instPath={routes.balances.children.inst.path} sctPath={routes.balances.children.sct.path} sddPath={routes.balances.children.sdd.path} />
            { location.pathname === routes.balances.path && <BalancesINSTCell /> }
            { location.pathname === routes.balances.children.inst.fullPath && <BalancesINSTCell /> }
            { location.pathname === routes.balances.children.sct.fullPath && <BalancesSCTCell /> }
            { location.pathname === routes.balances.children.sdd.fullPath && <BalancesSDDCell /> }
        </div>
    );
}
