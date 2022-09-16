import {Button, Form, Input, message, Modal} from "antd";
import {
    CompaniesService,
    Company_Contracts_CreateRequest,
    Company_Contracts_CreateResponse, User_Contracts_CreateRequest, UsersService
} from "../../services/openapi";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const UserNewEdit = () => {
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

    return (
        <React.Fragment>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    data-testid='user-edit-component'
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{}}
                    onFinish={async (values: any) => {
                        console.log( values );
                        const key = 'key';
                        message.loading({ content: 'Saving user...', key });
                        try {
                            const user:User_Contracts_CreateRequest = {email: values.email, allowIp: values.allowIp, isAdmin: values.isAdmin };
                            const result:Company_Contracts_CreateResponse = await UsersService.postV1Users( user );

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
