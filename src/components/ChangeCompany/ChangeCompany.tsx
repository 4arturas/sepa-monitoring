import {useAppSelector} from "../../app/hooks";
import {UserInBrowser, UserInBrowserOrganization, userSliceActions} from "../Login/User.Slice";
import {RedoOutlined} from "@ant-design/icons";
import {Alert, Tooltip} from "antd";
import Modal from "antd/lib/modal/Modal";
import {useState} from "react";
import {useDispatch} from "react-redux";

export const ChangeCompany = () => {

    const dispatch = useDispatch();
    const user:UserInBrowser | null = useAppSelector( state => state.user.currentUser );

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            { user &&
                <>
                    { user.selectedCompany && <span style={{marginRight:'10px'}}>{user.selectedCompany.name}</span> }
                    <Tooltip title={'Change company'}>
                        <RedoOutlined style={{fontSize:'30px', cursor:'pointer'}} onClick={()=>setIsModalOpen(true)}/>
                    </Tooltip>
                    <Modal title={'Change company'} open={isModalOpen} onOk={() => setIsModalOpen(true)} onCancel={() => setIsModalOpen(false)}>

                        { isModalOpen && user.companies.length === 0 && <Alert showIcon={true} type='warning' message='You have not assigned companies, ask administrator to assign'/> }

                        {isModalOpen && user.companies.map( (organization: UserInBrowserOrganization, idx:number ) => {
                            return (
                                <div
                                    key={`selectOrganization${idx}`}
                                    style={{cursor:'pointer'}}
                                    onClick={ () =>
                                    {
                                        dispatch(
                                            userSliceActions.setUserInBrowser(
                                                { userId: user?.userId, email: user?.email, role:user?.role, companies: user?.companies, jwt:user?.jwt, selectedCompany: organization, sctIsSet: false, instIsSet: false, sddIsSet: false }
                                            )
                                        );
                                        setIsModalOpen( false );
                                    }}>
                                    {organization.name}
                                </div>
                            )
                        } ) }

                    </Modal>
                </>
            }
        </>
    )
}
