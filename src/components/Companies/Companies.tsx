import {Table} from "antd";
import React, {useEffect, useState} from "react";
import { Company_Contracts_CompanyResponse} from "../../services/openapi";
import {CompanyNewEdit} from "./CompanyNewEdit";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {CompanyQuery, companySliceActions} from "./Companies.Slice";

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

interface CompaniesProps {
    companies:Array<Company_Contracts_CompanyResponse>,
    loading: boolean
}

export const Companies: React.FC<CompaniesProps> = ({companies, loading}) => {



    const defaultPageSize: number = 5;
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [total, setTotal] = useState<number>(0)


    useEffect( () => {
        setTotal( companies.length );
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
                    setPageSize( e.pageSize || defaultPageSize );
                }}
                bordered
                loading={loading}
                rowKey={'id'}/>
        </div>
    );
}
