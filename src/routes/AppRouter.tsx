import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import UsersPage from "../pages/UsersPage";
import ErrorPage from "../pages/ErrorPage";
import AboutPage from "../pages/AboutPage";
import {OrganizationsPage} from "../pages/OrganizationsPage";
import {LoginPage} from "../pages/LoginPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/about'} element={<AboutPage/>}/>
            <Route path={'/organizations'} element={<OrganizationsPage/>}/>
            <Route path={'/users'} element={<UsersPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            {/*<Route path={'/users/:id'} element={<UserDetailsPage/>}/>*/}
            <Route path={'/*'} element={<ErrorPage/>}/>
        </Routes>
    );
}
export default AppRouter;
