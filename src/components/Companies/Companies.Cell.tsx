import {useDispatch} from "react-redux";
import {Company_Contracts_CompanyResponse} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {Companies} from "./Companies";
import {useEffect} from "react";
import {CompanyQuery, companySliceActions} from "./Companies.Slice";

export const CompaniesCell = () => {
    const dispatch = useDispatch();

    const companies:Array<Company_Contracts_CompanyResponse>|null|undefined = useAppSelector(( state) => state.company.companiesList );
    const loading = useAppSelector( ( state ) => state.company.loading );

    useEffect( () => {
        const payload: CompanyQuery = {name:'test'};
        dispatch( companySliceActions.getCompanies( payload ) );
    }, [] );

    return <Companies companies={companies} loading={loading}/>
}
