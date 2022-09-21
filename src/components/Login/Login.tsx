import React, {useState} from "react";
import {Alert, Button, Form, Input, message} from "antd";
import {
    Authentication_Contracts_LogInRequest,
    Authentication_Contracts_LogInResponse,
    AuthenticationsService,
    CompaniesService,
    Company_Contracts_CompanyResponse, PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    User_Contracts_CompaniesResponse,
    UsersService
} from "../../services/openapi";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {UserInBrowser, UserInBrowserOrganization, userSliceActions} from "./User.Slice";
import jwtDecode from "jwt-decode";


interface LoginProps {

}

export const Login: React.FC<LoginProps> = () => {

    const loggedInUser:UserInBrowser|null    = useAppSelector( (state) => state.user.currentUser );
    const loginState                = useAppSelector( state => state.user.login );

    const dispatch = useAppDispatch();

    enum States { INIT, CODE_IS_NOT_SET, CODE_IS_SET}
    const [state,setState] = useState<States>(States.INIT);
    const [qrCodeImageUrl,setQrCodeImageUrl] = useState<string>();
    const navigate = useNavigate();

    return (
        <React.Fragment>

            { loggedInUser && <><Alert message={'You are already logged in, but feel free to login one more time'}/><br/></> }

            <Form
                data-testid='login-component'
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{email: 'adminas@bbservice.lt', code: '123456'}}
                onFinish={async (values: any) => {

                    const loginKey = 'loginKey';
                    message.loading({ content: 'Checking your email and code...', key: loginKey });

                    try
                    {
                        const requestBody:Authentication_Contracts_LogInRequest = values;
                        const response:Authentication_Contracts_LogInResponse = await AuthenticationsService.postV1AuthenticationsAuthenticatorLogin( requestBody );
                        if ( response.qrCodeImageUrl )
                        {
                            setQrCodeImageUrl( response.qrCodeImageUrl );
                            setState( States.CODE_IS_NOT_SET );
                            message.info('Please set up 2FA', 3 );
                            return;
                        }

                        const localToken:string = String(response.token);

                        const jwtDecoded:any = jwtDecode(localToken);
                        const userId:number = jwtDecoded.sub;
                        const role:string = jwtDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                        const userInBrowserWithoutOrganizations:UserInBrowser = { userId:userId, email:values.email, role:role, organizations: [], jwt:localToken };
                        dispatch( userSliceActions.setUserInBrowser( userInBrowserWithoutOrganizations ) );

                        const userCompanies:User_Contracts_CompaniesResponse = await UsersService.getV1UsersCompanies(userId);
                        const companies:Array<UserInBrowserOrganization> = [];
                        if ( userCompanies.company )
                            for ( let i = 0; i < userCompanies.company.length; i++ )
                            {
                                const c = userCompanies.company[i];
                                const res:Company_Contracts_CompanyResponse = await CompaniesService.getV1Companies1(c.companyId || -1);
                                const connections: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea | undefined> = res?.connections?.map( conn => (conn.businessArea) ) || [];
                                const company:UserInBrowserOrganization = { name: c.companyName, connections: connections };
                                companies.push( company );
                            }
                        
                        const userInBrowserWithOrganizations:UserInBrowser = { userId:userId, email:values.email, role:role, organizations: companies, jwt:localToken };
                        dispatch( userSliceActions.setUserInBrowser( userInBrowserWithOrganizations ) );

                        message.success({ content: 'Welcome!', key: loginKey, duration: 2 });
                        navigate('/');

                        return true;
                    } catch (error:any) {
                        message.error({ content: error.message, key: loginKey, duration: 5 });
                        return false;
                    }
                }}
                onFinishFailed={(errorInfo: any) => {
                    console.log('Failed:', errorInfo);
                    message.error({ content: 'Failed:' + errorInfo, duration: 5 });
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
