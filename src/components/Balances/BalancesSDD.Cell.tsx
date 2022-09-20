import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    Balance_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useEffect} from "react";
import {balancesSliceAction, BalancesSliceQuery} from "./Balances.Slice";

export const BalancesSDDCell = () => {

    return (
        <div>
            BalancesSDDCell
        </div>
    );
}
