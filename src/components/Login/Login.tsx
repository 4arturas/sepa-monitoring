import React, {useState} from "react";
import {Alert, Button, Form, Input, message} from "antd";
import {
    Authentication_Contracts_LogInRequest,
    Authentication_Contracts_LogInResponse,
    AuthenticationsService
} from "../../services/openapi";
import { useNavigate } from "react-router-dom";
import {selectToken, setToken} from "./loginSlice";
import {useDispatch} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCount} from "../../features/counter/counterSlice";
import {userSliceActions} from "./User.Slice";


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

    const loginState = useAppSelector( state => state.user.login );
    const dispatch = useAppDispatch();

    enum States { INIT, CODE_IS_NOT_SET, CODE_IS_SET}
    const [state,setState] = useState<States>(States.INIT);
    const [qrCodeImageUrl,setQrCodeImageUrl] = useState<string>();
    let navigate = useNavigate();

    const token = useAppSelector(selectToken);

    return (
        <React.Fragment>
            { token && <><Alert message={'You are already logged in, but feel free to login one more time'}/><br/></> }

        <Form
            data-testid='login-component'
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{email: 'adminas@bbservice.lt', code: '123456'}}
            onFinish={async (values: any) => {
                const hide = message.loading('Checking your email and code', 1000);

                console.log( 'login module', token );

                dispatch( userSliceActions.login( { email: values.email, code: values.code } ) );

                dispatch( setToken( 'baba' ) );

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

                    const localToken:string = String(response.token);
                    dispatch( setToken( localToken ) );
                    window.localStorage.setItem('token', localToken );

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
                <Button htmlType="submit" disabled={loginState.loading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
        </React.Fragment>
    );
}
