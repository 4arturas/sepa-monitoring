import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import UsersPage from "../pages/UsersPage";
import ErrorPage from "../pages/ErrorPage";
import {CompaniesPage} from "../pages/CompaniesPage";
import {LoginPage} from "../pages/LoginPage";
import {PaymentsPage} from "../pages/PaymentsPage";
import {routes} from "./Routes";
import {TurnoversPage} from "../pages/TurnoversPage";
import {TurnoversINSTCell} from "../components/Turnovers/TurnoversINST.Cell";
import {PaymentsINSTCell} from "../components/Payments/PaymentsINST.Cell";
import {PaymentsSCTCell} from "../components/Payments/PaymentsSCT.Cell";
import {PaymentsSDDCell} from "../components/Payments/PaymentsSDD.Cell";
import {TurnoversSCTCell} from "../components/Turnovers/TurnoversSCT.Cell";
import {TurnoversSDDCell} from "../components/Turnovers/TurnoversSDD.Cell";
import {BalancesPage} from "../pages/BalancesPage";
import {BalancesINSTCell} from "../components/Balances/BalancesINST.Cell";
import {BalancesSCTCell} from "../components/Balances/BalancesSCT.Cell";
import {BalancesSDDCell} from "../components/Balances/BalancesSDD.Cell";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={routes.home.path} element={<MainPage/>}/>
            <Route path={routes.payments.path} element={<PaymentsPage/>}>
                <Route path={routes.payments.children.inst.path} element={<PaymentsINSTCell/>}/>
                <Route path={routes.payments.children.sct.path} element={<PaymentsSCTCell/>}/>
                <Route path={routes.payments.children.sdd.path} element={<PaymentsSDDCell/>}/>
            </Route>
            <Route path={routes.turnovers.path} element={<TurnoversPage/>}>
                <Route path={routes.turnovers.children.inst.path} element={<TurnoversINSTCell/>}/>
                <Route path={routes.turnovers.children.sct.path} element={<TurnoversSCTCell/>}/>
                <Route path={routes.turnovers.children.sdd.path} element={<TurnoversSDDCell/>}/>
            </Route>
            <Route path={routes.balances.path} element={<BalancesPage/>}>
                <Route path={routes.balances.children.inst.path} element={<BalancesINSTCell/>}/>
                <Route path={routes.balances.children.sct.path} element={<BalancesSCTCell/>}/>
                <Route path={routes.balances.children.sdd.path} element={<BalancesSDDCell/>}/>
            </Route>
            <Route path={routes.companies.path} element={<CompaniesPage/>}/>
            <Route path={routes.users.path} element={<UsersPage/>}/>
            <Route path={routes.login.path} element={<LoginPage/>}/>
            {/*<Route path={'/users/:id'} element={<UserDetailsPage/>}/>*/}
            <Route path={'/*'} element={<ErrorPage/>}/>
        </Routes>
    );
}
export default AppRouter;
