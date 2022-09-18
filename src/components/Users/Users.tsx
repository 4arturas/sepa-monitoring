import React, {useState} from "react";
import {User_Contracts_UserResponse} from "../../services/openapi";
import {Table} from "antd";
import {UserNewEdit} from "./UserNewEdit";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Active',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (first:any, record:User_Contracts_UserResponse) =>
            record.isActive ? 'active' : 'not active'
    },
    {
        title: 'Admin',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render: (first:any, record:User_Contracts_UserResponse) =>
            record.isAdmin ? 'admin' : 'not admin'
    },
    {
        title: 'Authenticated',
        dataIndex: 'isAuthenticated',
        key: 'isAuthenticated',
        render: (first:any, record:User_Contracts_UserResponse) =>
            record.isAuthenticated ? 'authenticated' : 'not authenticated'
    },
    {
        title: 'Deleted',
        dataIndex: 'isDeleted',
        key: 'isDeleted',
        render: (first:any, record:User_Contracts_UserResponse) =>
            record.isDeleted ? 'deleted' : 'not deleted'
    },
    {
        title: 'Action',
        render: (first:any, record:User_Contracts_UserResponse) =>
            <span><UserNewEdit user={record}/> Delete</span>
    },
];

interface UsersProps {
    users: Array<any>
}
export const Users : React.FC<UsersProps> = ({users}) => {
    const [loading, setLoading] = useState(false);
    const defaultPageSize: number = 5;
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [total, setTotal] = useState<number>(0)
console.log( users );
    return (
        <div>
            <div style={{float:'right'}}><UserNewEdit user={null}/></div>
            <Table
                dataSource={users}
                columns={columns}
                pagination={{
                    pageSize: pageSize, total: total,
                    showSizeChanger: true,
                    position: ["bottomLeft"]
                }}
                onChange={ async (e) => {

                    // setOrganizations( companies.companies );
                    // await loadData(null, e.current, e.pageSize );
                    setPageSize( e.pageSize || defaultPageSize );
                }}
                bordered
                loading={loading}
                rowKey={'id'}/>
        </div>
    )
}
