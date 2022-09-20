import {useLocation} from "react-router-dom";
import {PaymentsCell} from "../components/Payments/PaymentsCell";
import {routes} from "../routes/Routes";
import {TurnoversINSTCell} from "../components/Turnovers/TurnoversINST.Cell";
import {TurnoversSCTCell} from "../components/Turnovers/TurnoversSCT.Cell";
import {TurnoversSDDCell} from "../components/Turnovers/TurnoversSDD.Cell";

export const TurnoversPage = () => {
    const location = useLocation();

    return (
        <div data-testid={'turnovers-page'}>
            <PaymentsCell/>
            { location.pathname === routes.turnovers.path && <TurnoversINSTCell /> }
            { location.pathname === routes.turnovers.children.inst.fullPath && <TurnoversINSTCell /> }
            { location.pathname === routes.turnovers.children.sct.fullPath && <TurnoversSCTCell /> }
            { location.pathname === routes.turnovers.children.sdd.fullPath && <TurnoversSDDCell /> }
        </div>
    );
}
