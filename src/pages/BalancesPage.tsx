import {useLocation} from "react-router-dom";
import {routes} from "../routes/Routes";
import React from "react";
import {BalancesINSTCell} from "../components/Balances/BalancesINST.Cell";
import {BalancesSCTCell} from "../components/Balances/BalancesSCT.Cell";
import {BalancesSDDCell} from "../components/Balances/BalancesSDD.Cell";
import {NavBarSmall} from "../components/NavBar/NavBarSmall";

export const BalancesPage = () => {
    const location = useLocation();

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
