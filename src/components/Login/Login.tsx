import React, {useState} from "react";
import {Button, Form, Input, message} from "antd";
import {
    Authentication_Contracts_LogInRequest,
    Authentication_Contracts_LogInResponse,
    AuthenticationsService
} from "../../services/openapi";
import { useNavigate } from "react-router-dom";


interface LoginProps {

}


async function test2()
{
    const rawResponse = await fetch('https://monitoring-sepa-k8s-staging.sepagateway.eu/v1/authentications/authenticator/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: 'adminas@bbservice.lt', code: 'Textual content'})
    });
    const content = await rawResponse.json();
    console.log( content );
}

export const Login: React.FC<LoginProps> = () => {

    enum States { INIT, CODE_IS_NOT_SET, CODE_IS_SET}
    const [state,setState] = useState<States>(States.INIT);
    const [qrCodeImageUrl,setQrCodeImageUrl] = useState<string>();
    let navigate = useNavigate();

    return (
        <Form
            data-testid='login-component'
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{email: 'adminas@bbservice.lt', code: '123456'}}
            onFinish={async (values: any) => {
                const hide = message.loading('Checking your email and code', 1000);
                try {
                    const requestBody:Authentication_Contracts_LogInRequest = values;
                    const response:Authentication_Contracts_LogInResponse = await AuthenticationsService.postV1AuthenticationsAuthenticatorLogin( requestBody );
                    if ( response.qrCodeImageUrl )
                    {
                        setQrCodeImageUrl( response.qrCodeImageUrl );
                        setState( States.CODE_IS_NOT_SET );
                        message.info('Please set up 2FA', 1000 );
                        return;
                    }

                    window.localStorage.setItem('token', String(response.token) );

                    navigate('/');
                    hide();

/*                    const result = await loginUser({...values});
                    const {qrCodeImageUrl, manualEntrySetupCode} = result;

                    setQrImage( qrCodeImageUrl );
                    setEmail( values.email );

                    hide();
                    // message.success('添加成功');
                    setState( STATE_NO_MFA_SET );*/
                    return true;
                } catch (error:any) {
                    hide();
                    // message.error('It seems that the password you entered was once used, please contact administrator！ ' + error);
                    message.error(error.message);
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
            { state === States.CODE_IS_NOT_SET && <img src={qrCodeImageUrl} alt="QR Code"/> }
            <Form.Item
                label="Code"
                name="code"
                rules={[{required: true, message: 'Please input code!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item style={{textAlign:'center'}}>
                <Button htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
}
