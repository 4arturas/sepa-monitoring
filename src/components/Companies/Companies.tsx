import {Table} from "antd";
import {useEffect, useState} from "react";
import {CompaniesService, Company_Contracts_CompaniesResponse} from "../../services/openapi";
import {CompanyNewEdit} from "./CompanyNewEdit";

const columns = [
    {
        title: 'Id',
        dataIndex: 'transactionId',
        key: 'transactionId'
    },
];

export const Companies = () => {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const defaultPageSize: number = 5;
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [total, setTotal] = useState<number>(0)

    const loadData = async ( values:any, current:number|undefined, pageSize:number|undefined ) => {
        setLoading( true );
        const companiesResponse:Company_Contracts_CompaniesResponse = await CompaniesService.getV1Companies();
        console.log( companiesResponse );
        setLoading(false);
    }

    useEffect( () => {
        loadData( null, 1, pageSize );
    }, [] );

    return (
        <div>
            <span style={{float:'right'}}><CompanyNewEdit/></span>
            <Table
                dataSource={companies}
                columns={columns}
                pagination={{
                    pageSize: pageSize, total: total,
                    showSizeChanger: true,
                    position: ["bottomLeft"]
                }}
                onChange={ async (e) => {

                    // setOrganizations( companies.companies );
                    await loadData(null, e.current, e.pageSize );
                    setPageSize( e.pageSize || defaultPageSize );
                }}
                bordered
                loading={loading}
                rowKey={'id'}/>
        </div>
    );
}
