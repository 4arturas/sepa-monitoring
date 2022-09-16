import React, {useState} from "react"
import {Button, Form, Input, message, Modal} from "antd";
import {
    Authentication_Contracts_LogInRequest,
    Authentication_Contracts_LogInResponse,
    AuthenticationsService, CompaniesService, Company_Contracts_CreateRequest, Company_Contracts_CreateResponse
} from "../../services/openapi";
import {useNavigate} from "react-router-dom";

export const CompanyNewEdit = () => {
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
    // https://monitoring-sepa-k8s-staging.sepagateway.eu/swagger/index.html
    return (
        <React.Fragment>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    data-testid='login-component'
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{}}
                    onFinish={async (values: any) => {
                        console.log( values );
                        const key = 'key';
                        message.loading({ content: 'Saving company...', key });
                        try {
                            const company:Company_Contracts_CreateRequest = {name: values.name, connections: [] };
                            const result:Company_Contracts_CreateResponse = await CompaniesService.postV1Companies( company );

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
