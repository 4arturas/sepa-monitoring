import { useLocation} from "react-router-dom";
import {routes} from "../routes/Routes";
import {PaymentsINSTCell} from "../components/Payments/PaymentsINST.Cell";
import {PaymentsSCTCell} from "../components/Payments/PaymentsSCT.Cell";
import {PaymentsSDDCell} from "../components/Payments/PaymentsSDD.Cell";
import React from "react";
import {UserInBrowser} from "../components/Login/User.Slice";
import {useAppSelector} from "../app/hooks";
import {NavBarSmall} from "../components/NavBar/NavBarSmall";
import {Alert} from "antd";
import {MSG_BUSINESS_AREA_IS_NOT_SET} from "../global";
import {ChangeCompany} from "../components/ChangeCompany/ChangeCompany";

export const PaymentsPage = () => {
    const location = useLocation();
    const currentUser:UserInBrowser | null  = useAppSelector( state => state.user.currentUser );

    if ( !currentUser?.instIsSet )
        return <Alert showIcon={true} type='info' message={MSG_BUSINESS_AREA_IS_NOT_SET} description={<ChangeCompany/>}/>;

    return (
        <div data-testid={'payments-page'}>
            <NavBarSmall instPath={routes.payments.children.inst.path} sctPath={routes.payments.children.sct.path} sddPath={routes.payments.children.sdd.path} />
            { location.pathname === routes.payments.path && <PaymentsINSTCell /> }
            { location.pathname === routes.payments.children.inst.fullPath && <PaymentsINSTCell /> }
            { location.pathname === routes.payments.children.sct.fullPath && <PaymentsSCTCell /> }
            { location.pathname === routes.payments.children.sdd.fullPath && <PaymentsSDDCell /> }
        </div>
    );
}
