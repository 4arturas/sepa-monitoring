import {useDispatch} from "react-redux";

import {useEffect} from "react";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {PaymentsINSTQuery, paymentsSliceActions} from "./Payments.Slice";


export const PaymentsSCTCell = () => {
    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse|null  = useAppSelector( state => state.payments.sct );
    const loading:boolean                                   = useAppSelector( state => state.payments.loadingSct );

    useEffect( () => {
        const query:PaymentsINSTQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT };
        dispatch( paymentsSliceActions.getPaymentsSct( query ) );
    }, [] );

    return <div>
        Payments SCT
        { loading && <div>Loading SCT ...</div> }
        { payments && <div>${JSON.stringify(payments)}</div> }
    </div>
}
