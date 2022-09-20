import {PaymentsCell} from "../components/Payments/PaymentsCell";
import {useLocation} from "react-router-dom";
import {routes} from "../routes/Routes";
import {PaymentsINSTCell} from "../components/Payments/PaymentsINST.Cell";
import {PaymentsSCTCell} from "../components/Payments/PaymentsSCT.Cell";
import {PaymentsSDDCell} from "../components/Payments/PaymentsSDD.Cell";

export const PaymentsPage = () => {
    const location = useLocation();

    return (
        <div data-testid={'payments-page'}>
            <PaymentsCell/>
            { location.pathname === routes.payments.path && <PaymentsINSTCell /> }
            { location.pathname === routes.payments.children.inst.fullPath && <PaymentsINSTCell /> }
            { location.pathname === routes.payments.children.sct.fullPath && <PaymentsSCTCell /> }
            { location.pathname === routes.payments.children.sdd.fullPath && <PaymentsSDDCell /> }
        </div>
    );
}
