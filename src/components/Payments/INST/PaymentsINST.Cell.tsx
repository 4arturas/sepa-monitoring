import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/hooks";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../../services/openapi";
import {useEffect} from "react";
import {PaymentsINSTQuery, paymentsINSTSliceActions} from "./PaymentsINST.Slice";

export const PaymentsINSTCell = () => {
    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse|null  = useAppSelector( state => state.paymentsINST.payments );
    const loading:boolean                                   = useAppSelector( state => state.paymentsINST.loading );

    useEffect( () => {
        const q:PaymentsINSTQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
        dispatch( paymentsINSTSliceActions.getPayments( q ) );
    }, [] );

    return <div>
        Payments INST
        { payments && <div>${JSON.stringify(payments)}</div> }
    </div>
}
