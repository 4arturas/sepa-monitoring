import {Table} from "antd";
import React, {useEffect, useState} from "react";
import {
    CompaniesService,
    Company_Contracts_CompaniesResponse, Company_Contracts_CompanyResponse,
    User_Contracts_UserResponse
} from "../../services/openapi";
import {CompanyNewEdit} from "./CompanyNewEdit";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'isActive',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (first:any, record:Company_Contracts_CompanyResponse) =>
            record.isActive ? 'active' : 'not active'
    },
    {
        title: 'isDeleted',
        dataIndex: 'isDeleted',
        key: 'isDeleted',
        render: (first:any, record:Company_Contracts_CompanyResponse) =>
            record.isDeleted ? 'deleted' : 'not deleted'
    },
    {
        title: 'Business Area',
        dataIndex: 'connections',
        key: 'connections',
        render: (first:any, record:Company_Contracts_CompanyResponse) =>
            record?.connections?.map( c => <div key={`${record.id}${c.businessArea}`}>{c.businessArea}</div>)
    },
    {
        title: 'Action',
        render: (first:any, record:Company_Contracts_CompanyResponse) =>
            <span><CompanyNewEdit company={record}/>&nbsp;&nbsp;&nbsp;<DeleteOutlined style={{fontSize:'18px'}} /></span>
    },
];

export const Companies = () => {

    const [companies, setCompanies] = useState<Array<Company_Contracts_CompanyResponse>>();
    const [loading, setLoading] = useState(false);
    const defaultPageSize: number = 5;
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [total, setTotal] = useState<number>(0)

    const loadData = async ( values:any, current:number|undefined, pageSize:number|undefined ) => {
        setLoading( true );
        const companiesResponse:Company_Contracts_CompaniesResponse = await CompaniesService.getV1Companies();
        setCompanies( companiesResponse.companies || [] );
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
