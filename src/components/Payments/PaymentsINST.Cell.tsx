import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {PaymentsINSTQuery, paymentsSliceActions} from "./Payments.Slice";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {UserInBrowser} from "../Login/User.Slice";
import {Alert} from "antd";
import {Spin} from "antd/es";

export const PaymentsINSTCell = () => {

    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse | null    = useAppSelector( state => state.payments.inst );
    const loading:boolean                                       = useAppSelector( state => state.payments.loadingInst );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );
    const [businessAreaIsSet]                                   = useState<boolean>(currentUser?.selectedCompany?.connections.find( connection => connection?.includes(PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT))!==undefined);

    useEffect( () => {
        if ( businessAreaIsSet )
        {
            const query:PaymentsINSTQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
            dispatch( paymentsSliceActions.getPaymentsInst( query ) );
        }
    }, [] );

    return <div>
        { !businessAreaIsSet && <Alert showIcon={true} type='info' message={'Business area is not set'} /> }
        { businessAreaIsSet && loading && <div><Spin/> Loading INST...</div> }
        { businessAreaIsSet && payments && <div>${JSON.stringify(payments)}</div> }
    </div>
}
