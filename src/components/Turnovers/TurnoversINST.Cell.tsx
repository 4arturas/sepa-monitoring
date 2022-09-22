import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    Turnover_Contracts_GenerateResponse
} from "../../services/openapi";
import {useEffect} from "react";
import {turnoversActions, TurnoversQuery} from "./Turnovers.Slice";
import {UserInBrowser} from "../Login/User.Slice";
import {Alert, Table} from "antd";
import {MSG_BUSINESS_AREA_IS_NOT_SET} from "../../global";

const columns = [
    {
        title: 'Settl. Date',
        dataIndex: 'settlementDate',
        key: 'settlementDate',
    },
    {
        title: 'Dir',
        dataIndex: 'direction',
        key: 'direction',

    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',

    },
    {
        title: 'TxnId',
        dataIndex: 'transactionId',
        key: 'transactionId',
    },
    {
        title: 'Debtor BIC',
        dataIndex: 'debtorCode',
        key: 'debtorCode',

    },
    {
        title: 'Creditor BIC',
        dataIndex: 'creditorCode',
        key: 'creditorCode',

    },
    {
        title: 'Transaction Date Time',
        dataIndex: 'transactionDateTime',
        key: 'transactionDateTime',

    },
    {
        title: 'Debtor Account',
        dataIndex: 'debtorAccount',
        key: 'debtorAccount',
    },
    {
        title: 'Creditor Account',
        dataIndex: 'creditorAccount',
        key: 'creditorAccount',
    },
];

export const TurnoversINSTCell = () => {
    const dispatch = useDispatch();
    const turnovers:Turnover_Contracts_GenerateResponse | null  = useAppSelector( state => state.turnovers.inst );
    const loading:boolean                                       = useAppSelector( state => state.turnovers.loadingInst );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );

    useEffect( () => {
        if ( currentUser?.instIsSet )
        {
            const query:TurnoversQuery = { companyId: currentUser.userId, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
            dispatch( turnoversActions.getTurnoversINST( query ) );
        }
    }, [currentUser?.instIsSet] );

    return <div>
        { !currentUser?.instIsSet && <Alert showIcon={true} type='info' message={MSG_BUSINESS_AREA_IS_NOT_SET} /> }
        { turnovers && <Table dataSource={turnovers.items || []} columns={columns} pagination={{ pageSize: 5 }} rowKey={'transactionId'} loading={loading} bordered={true}/> }
    </div>
}
