import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    Balance_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useEffect} from "react";
import {balancesSliceAction, BalancesSliceQuery} from "./Balances.Slice";

export const BalancesINSTCell = () => {
    const dispatch = useDispatch();
    const balances:Balance_Contracts_GenerateResponse|null = useAppSelector(state => state.balances.inst );
    const loading:boolean = useAppSelector(state => state.balances.loadingInst );

    useEffect( () => {
        const query:BalancesSliceQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
        dispatch( balancesSliceAction.getBalancesInst( query ) );
    }, [] );

    return (
        <div>
            BalancesINSTCell

            <div>{loading && <>Loading Balances INST...</>}</div>
            <div>{balances && JSON.stringify(balances)}</div>

        </div>
    );
}
