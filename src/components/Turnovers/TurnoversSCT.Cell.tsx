import {useDispatch} from "react-redux";
import {
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    Turnover_Contracts_GenerateResponse
} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {turnoversActions, TurnoversQuery} from "./Turnovers.Slice";

export const TurnoversSCTCell = () => {
    const dispatch = useDispatch();
    const sct:Turnover_Contracts_GenerateResponse | null    = useAppSelector( state => state.turnovers.sct );
    const loadingSct:boolean                                = useAppSelector( state => state.turnovers.loadingSct );

    useEffect(() => {
        const query:TurnoversQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT };
        dispatch( turnoversActions.getTurnoversSCT( query ) );
    }, []);

    return <div>
        TurnoversSCTCell
        <div>{loadingSct && <>Loading SCT...</>}</div>
        <div>{sct && JSON.stringify(sct)}</div>
    </div>
}
