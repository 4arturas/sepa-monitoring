import {Button, Form, Input, message, Modal, Transfer} from "antd";
import {
    Company_Contracts_CompanyResponse,
    Company_Contracts_CreateResponse, User_Contracts_CompaniesRequest,
    User_Contracts_CreateRequest, User_Contracts_UpdateRequest, User_Contracts_UserCompanies,
    User_Contracts_UserCompanyResponse,
    User_Contracts_UserResponse,
    UsersService
} from "../../services/openapi";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {UsersQuery, usersSliceActions} from "./Users.Slice";
import {CompanyQuery, companySliceActions} from "../Companies/Companies.Slice";
import {TransferDirection, TransferItem} from "antd/lib/transfer";

export interface UserNewEditProps {
    user: User_Contracts_UserResponse | null | undefined
}

export const UserNewEdit : React.FC<UserNewEditProps> = ( { user } ) => {

    const dispatch = useDispatch();
    const companiesList:Array<Company_Contracts_CompanyResponse> = useAppSelector( state => state.company.companiesList );
    const companiesListLoading:boolean = useAppSelector( state => state.company.loading );
    const userCompanies: Array<User_Contracts_UserCompanyResponse> = useAppSelector( state => state.users.companies );
    const useCompaniesLoading: boolean = useAppSelector( state => state.users.loading );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    interface Model {
        email: string|null|undefined;
        allowIp: string|null|undefined;
        isAdmin: boolean|null|undefined;
        companiesList:Array<Company_Contracts_CompanyResponse>;
        userCompanies: Array<User_Contracts_UserCompanyResponse>
    }
    const [model, setModel] = useState<Model>({ email: user?.email, allowIp: user?.allowIp, isAdmin: user?.isAdmin, companiesList: companiesList, userCompanies: userCompanies });
    const [transfer, setTransfer] = useState<TransferItem[]>();
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const showModal = () => {


        const usersQuery:UsersQuery = {id:1};
        dispatch( usersSliceActions.getUserCompanies( usersQuery ) );

        const companiesQuery:CompanyQuery = {name:''};
        dispatch( companySliceActions.getCompanies( companiesQuery ) );

        const tmpModel:Model = { email: user?.email, allowIp: user?.allowIp, isAdmin: user?.isAdmin, companiesList: companiesList, userCompanies: userCompanies };
        setModel( tmpModel );

        setTargetKeys( userCompanies.map( (company:User_Contracts_UserCompanyResponse) => String(company.companyId)) );

        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <React.Fragment>

            { user ? <EditOutlined onClick={showModal} style={{fontSize:'18px'}}/> : <PlusCircleOutlined onClick={showModal} style={{fontSize:'18px'}}/> }

            <Modal title={`${user?'Edit':'Add'} user`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    data-testid='user-edit-component'
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={model || {}}
                    onFinish={async (values: any) => {
                        console.log( values );
                        const key = 'key';
                        message.loading({ content: 'Saving user...', key });
                        try {
                            // const user:User_Contracts_CreateRequest = {email: values.email, allowIp: values.allowIp, isAdmin: values.isAdmin };
                            if ( user )
                            {
                                const userUpdateRequest:User_Contracts_UpdateRequest = {email: values.email, allowIp: values.allowIp, isAdmin: values.isAdmin };
                                // dispatch( usersSliceActions.updateUserRequest({ id: user.id || -1/*here we always have id, the case -1 is impossible*/, request: userUpdateRequest } ) );

                                const assignedCompanies:Array<User_Contracts_UserCompanies> = values.company.map( (c:string) => { return { companyId:Number(c) } } );
                                const requestCompanies:User_Contracts_CompaniesRequest = { companies: assignedCompanies };
                                dispatch( usersSliceActions.attachCompanyForTheUserRequest( {userId: user.id || -1, request: requestCompanies } ) );
                            }
                            else
                            {
                                const userUpdateRequest:User_Contracts_CreateRequest = {email: values.email, allowIp: values.allowIp, isAdmin: values.isAdmin };
                                // const result:Company_Contracts_CreateResponse = await UsersService.postV1Users( user );
                            }


                            navigate('/users');
                            message.success({ content: 'Saved!', key, duration: 2 });
                            setIsModalOpen( false );
                            return true;
                        } catch (error:any) {
                            message.error({ content: error.message, key, duration: 2 });
                            setIsModalOpen( false );
                            return false;
                        }
                    }}
                    onFinishFailed={(errorInfo: any) => {
                        console.log('Failed:', errorInfo);
                    }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Please input email!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Allow IP"
                        name="allowIp"
                        rules={[{required: true, message: 'Please input IP!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Is Admin"
                        name="isAdmin"
                        rules={[{required: true, message: 'Please input!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="User companies"
                        name="company"
                        rules={[{required: true, message: 'Please select at least one company!'}]}
                    >
                        <Transfer
                            dataSource={ companiesList.map( (company:Company_Contracts_CompanyResponse) => {
                                const transferItem:TransferItem = { key: String(company.id), title: String(company.name) };
                                return transferItem;
                            } )}
                            titles={['Source', 'Target']}
                            targetKeys={targetKeys}
                            // selectedKeys={selectedKeys}
                            onChange={(nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
                                /*console.log('targetKeys:', nextTargetKeys);
                                console.log('direction:', direction);
                                console.log('moveKeys:', moveKeys);*/
                                setTargetKeys(nextTargetKeys);
                            }}
                            // onSelectChange={onSelectChange}
                            // onScroll={onScroll}
                            render={item => item.title || 'undefined'}
                        />
                    </Form.Item>


                    <Form.Item style={{textAlign:'center'}}>
                        <Button htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>


            </Modal>
        </React.Fragment>
    )
}
