import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    Turnover_Contracts_GenerateResponse
} from "../../services/openapi";
import {useEffect} from "react";
import {turnoversActions, TurnoversQuery} from "./Turnovers.Slice";
import {PaymentsINSTQuery} from "../Payments/INST/PaymentsINST.Slice";

export const TurnoversINSTCell = () => {
    const dispatch = useDispatch();
    const inst:Turnover_Contracts_GenerateResponse | null = useAppSelector( state => state.turnovers.inst );
    const loadingInst:boolean = useAppSelector( state => state.turnovers.loadingInst );

    useEffect(() => {
        const query:TurnoversQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
        dispatch( turnoversActions.getTurnoversINST( query ) );
    }, []);

    return <div>
        TurnoversINSTCell
        <div>{loadingInst && <>Loading INST...</>}</div>
        <div>{inst && JSON.stringify(inst)}</div>
    </div>
}
