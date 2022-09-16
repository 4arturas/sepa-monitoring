import React, {useEffect, useState} from "react"
import {Button, Form, Input, message, Modal} from "antd";
import {
    CompaniesService, Company_Contracts_CompanyResponse,
    Company_Contracts_ConnectionCreateRequest, Company_Contracts_ConnectionResponse,
    Company_Contracts_CreateRequest,
    Company_Contracts_CreateResponse, PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useNavigate} from "react-router-dom";
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";

interface CompanyNewEditProp {
    company?: Company_Contracts_CompanyResponse
}

interface Model {
    name: string | null | undefined,

    hostSCT: string | null | undefined
    databaseSCT: string | null | undefined
    usernameSCT: string | null | undefined

    hostINST: string | null | undefined
    databaseINST: string | null | undefined
    usernameINST: string | null | undefined

    hostSDD: string | null | undefined
    databaseSDD: string | null | undefined
    usernameSDD: string | null | undefined
}

export const CompanyNewEdit : React.FC<CompanyNewEditProp> = ( {company} ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [model, setModel] = useState<Model>()
    useEffect( () => {
        if ( company )
        {
            let hostSCT:string|null|undefined;
            let databaseSCT:string|null|undefined;
            let usernameSCT:string|null|undefined;

            let hostINST: string | null | undefined
            let databaseINST: string | null | undefined
            let usernameINST: string | null | undefined

            let hostSDD: string | null | undefined
            let databaseSDD: string | null | undefined
            let usernameSDD: string | null | undefined

            company.connections?.map( ( connection:Company_Contracts_ConnectionResponse ) => {
                switch ( connection.businessArea )
                {
                    case PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT:
                        hostSCT = connection.host;
                        databaseSCT = connection.database;
                        usernameSCT = connection.username;
                        break;
                    case PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT:
                        hostINST = connection.host;
                        databaseINST = connection.database;
                        usernameINST = connection.username;
                        break;
                    case PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SDD:
                        hostSDD = connection.host;
                        databaseSDD = connection.database;
                        usernameSDD = connection.username;
                        break;
                }
                console.log( connection );
            });

            const tempModel:Model = {
                name: company.name,

                hostSCT: hostSCT,
                databaseSCT: databaseSCT,
                usernameSCT: usernameSCT,

                hostINST: hostINST,
                databaseINST: databaseINST,
                usernameINST: usernameINST,

                hostSDD: hostSDD,
                databaseSDD: databaseSDD,
                usernameSDD: usernameSDD
            };
            setModel( tempModel );
        }
    }, [] );
    // console.log( company );

    // https://monitoring-sepa-k8s-staging.sepagateway.eu/swagger/index.html
    return (
        <React.Fragment>

            { company ? <EditOutlined onClick={showModal} style={{fontSize:'18px'}}/> : <PlusCircleOutlined onClick={showModal} style={{fontSize:'18px'}}/> }

            <Modal title={`${company ? 'Edit' : 'Add'} organization`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    data-testid='login-component'
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={model}
                    onFinish={async (values: any) => {
                        console.log( values );
                        const key = 'key';
                        message.loading({ content: 'Saving company...', key });
                        try {
                            const businessArea:string = PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT;
                            const connections: Array<Company_Contracts_ConnectionCreateRequest> = [
                                {
                                    businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT,
                                    host: '172.23.1.250',
                                    database: 'PBX.Sepa.SCT.Kreda',
                                    username: 'monitoring',
                                    password: ''
                                }
                            ];

                            const company:Company_Contracts_CreateRequest = {name: values.name, connections: connections };
                            const result:Company_Contracts_CreateResponse = await CompaniesService.postV1Companies( company );
                            console.log( result );

                            navigate('/companies');
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
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input name!'}]}
                    >
                        <Input/>
                    </Form.Item>
<hr/>
<b>SCT</b>
                    <Form.Item
                        label="Host"
                        name="hostSCT"
                        rules={[{required: true, message: 'Please input host!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Database"
                        name="databaseSCT"
                        rules={[{required: true, message: 'Please input database!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="usernameSCT"
                        rules={[{required: true, message: 'Please input username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="passwordSCT"
                        rules={[{required: true, message: 'Please input password!'}]}
                    >
                        <Input/>
                    </Form.Item>


<b>INST</b>
                    <Form.Item
                        label="Host"
                        name="hostINST"
                        rules={[{required: true, message: 'Please input host!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Database"
                        name="databaseINST"
                        rules={[{required: true, message: 'Please input database!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="usernameINST"
                        rules={[{required: true, message: 'Please input username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="passwordINST"
                        rules={[{required: true, message: 'Please input password!'}]}
                    >
                        <Input/>
                    </Form.Item>


<b>SDD</b>
                    <Form.Item
                        label="Host"
                        name="hostSDD"
                        rules={[{required: true, message: 'Please input host!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Database"
                        name="databaseSDD"
                        rules={[{required: true, message: 'Please input database!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="usernameSDD"
                        rules={[{required: true, message: 'Please input username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="passwordSDD"
                        rules={[{required: true, message: 'Please input password!'}]}
                    >
                        <Input/>
                    </Form.Item>



                    <Form.Item style={{textAlign:'center'}}>
                        <Button htmlType="submit">
                            {`${company ? 'Edit' : 'Add'}`}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    )
}
