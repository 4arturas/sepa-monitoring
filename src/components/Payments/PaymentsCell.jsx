import {useEffect} from "react";
import {
    PaymentsService,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction
} from "../../services/openapi";

export const PaymentsCell = () => {

    useEffect( () => {
        const businessArea = PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT;
        // const direction = PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.IN;
        // PaymentsService.getV1Payments(1, )
    }, [] );

    return (
        <div>PPP</div>
    );
}
