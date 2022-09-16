import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import UsersPage from "../pages/UsersPage";
import ErrorPage from "../pages/ErrorPage";
import AboutPage from "../pages/AboutPage";
import {CompaniesPage} from "../pages/CompaniesPage";
import {LoginPage} from "../pages/LoginPage";
import {PaymentsPage} from "../pages/PaymentsPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/payments'} element={<PaymentsPage/>}/>
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
