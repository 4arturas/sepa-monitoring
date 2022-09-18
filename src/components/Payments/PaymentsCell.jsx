import React, {useEffect} from "react";
import {
    PaymentsService,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction
} from "../../services/openapi";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import {routes} from "../../routes/Routes";

export const PaymentsCell = () => {

    useEffect( () => {
        const businessArea = PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT;
        // const direction = PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.IN;
        // PaymentsService.getV1Payments(1, )
    }, [] );

    return (
        <div>
            <Breadcrumb style={{ margin: '0  0' }}>
                <Breadcrumb.Item><Link to={routes.payments.children.inst.path}>INST</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to={routes.payments.children.sct.path}>SCT</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to={routes.payments.children.sdd.path}>SDD</Link></Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}
