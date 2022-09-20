import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/hooks";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../../services/openapi";
import {useEffect} from "react";
import {PaymentsINSTQuery, paymentsSliceActions} from "./PaymentsINST.Slice";

export const PaymentsINSTCell = () => {
    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse|null  = useAppSelector( state => state.paymentsINST.inst );
    const loading:boolean                                   = useAppSelector( state => state.paymentsINST.loadingInst );

    useEffect( () => {
        const query:PaymentsINSTQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
        dispatch( paymentsSliceActions.getPaymentsInst( query ) );
    }, [] );

    return <div>
        Payments INST
        { loading && <div>Loading INST...</div> }
        { payments && <div>${JSON.stringify(payments)}</div> }
    </div>
}
