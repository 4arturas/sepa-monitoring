import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    Balance_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useEffect} from "react";
import {balancesSliceAction, BalancesSliceQuery} from "./Balances.Slice";

export const BalancesSCTCell = () => {
    const dispatch = useDispatch();
    const balances:Balance_Contracts_GenerateResponse|null = useAppSelector(state => state.balances.sct );
    const loading:boolean = useAppSelector(state => state.balances.loadingSct );

    useEffect( () => {
        const query:BalancesSliceQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT };
        dispatch( balancesSliceAction.getBalancesSct( query ) );
    }, [] );

    return (
        <div>
            BalancesINSTCell

            <div>{loading && <>Loading Balances SCT...</>}</div>
            <div>{balances && JSON.stringify(balances)}</div>

        </div>
    );
}
