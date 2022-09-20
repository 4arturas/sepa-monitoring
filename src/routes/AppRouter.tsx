import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import UsersPage from "../pages/UsersPage";
import ErrorPage from "../pages/ErrorPage";
import AboutPage from "../pages/AboutPage";
import {CompaniesPage} from "../pages/CompaniesPage";
import {LoginPage} from "../pages/LoginPage";
import {PaymentsPage} from "../pages/PaymentsPage";
import {routes} from "./Routes";
import {PaymentsINSTCell} from "../components/Payments/INST/PaymentsINST.Cell";
import {PaymentsSCTCell} from "../components/Payments/SCT/PaymentsSCT.Cell";
import {PaymentsSDDCell} from "../components/Payments/SDD/PaymentsSDD.Cell";
import {TurnoversPage} from "../pages/TurnoversPage";
import {Turnovers} from "../components/Turnovers/Turnovers";
import {TurnoversINSTCell} from "../components/Turnovers/TurnoversINST.Cell";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={routes.payments.path} element={<PaymentsPage/>}>
                <Route path={routes.payments.children.inst.path} element={<PaymentsINSTCell/>}/>
                <Route path={routes.payments.children.sct.path} element={<PaymentsSCTCell/>}/>
                <Route path={routes.payments.children.sdd.path} element={<PaymentsSDDCell/>}/>
            </Route>
            <Route path={routes.turnovers.path} element={<TurnoversPage/>}>
                <Route path={routes.turnovers.children.inst.path} element={<TurnoversINSTCell/>}/>
                <Route path={routes.turnovers.children.sct.path} element={<PaymentsSCTCell/>}/>
                <Route path={routes.turnovers.children.sdd.path} element={<PaymentsSDDCell/>}/>
            </Route>
            <Route path={'/companies'} element={<CompaniesPage/>}/>
            <Route path={'/users'} element={<UsersPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/about'} element={<AboutPage/>}/>
            {/*<Route path={'/users/:id'} element={<UserDetailsPage/>}/>*/}
            <Route path={'/*'} element={<ErrorPage/>}/>
        </Routes>
    );
}
export default AppRouter;
