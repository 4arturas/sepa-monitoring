import {useDispatch} from "react-redux";

import {useEffect} from "react";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {PaymentsINSTQuery, paymentsSliceActions} from "./Payments.Slice";
import {UserInBrowser} from "../Login/User.Slice";
import {Alert, Table} from "antd";
import {MSG_BUSINESS_AREA_IS_NOT_SET} from "../../global";

const columns = [
    {
        title: 'Date Time',
        dataIndex: 'dateTime',
        key: 'dateTime',
    },
    {
        title: 'Payment ID',
        dataIndex: 'paymentId',
        key: 'paymentId',

    },
    {
        title: 'TxID (CBL)',
        dataIndex: 'transactionId',
        key: 'transactionId',

    },
    {
        title: 'ID (PBX)',
        dataIndex: 'probanxId',
        key: 'probanxId',

    },
    {
        title: 'Dir',
        dataIndex: 'direction',
        key: 'direction',

    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',

    },
    {
        title: 'Reject Reason',
        dataIndex: 'rejectReasonDescription',
        key: 'rejectReasonDescription',

    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',

    },
    {
        title: 'Ret. Amount',
        dataIndex: 'returnedAmount',
        key: 'returnedAmount',
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


export const PaymentsSCTCell = () => {
    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse | null    = useAppSelector( state => state.payments.sct );
    const loading:boolean                                       = useAppSelector( state => state.payments.loadingSct );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );

    useEffect( () => {
        if ( currentUser?.sctIsSet )
        {
            const query:PaymentsINSTQuery = { companyId: currentUser.userId, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_SCT };
            dispatch( paymentsSliceActions.getPaymentsInst( query ) );
        }
    }, [currentUser?.sctIsSet] );

    return <div>
        { !currentUser?.sctIsSet && <Alert showIcon={true} type='info' message={MSG_BUSINESS_AREA_IS_NOT_SET} /> }
        { payments && <div>${JSON.stringify(payments)}</div> }
        {/*{ payments && <Table dataSource={payments.items || []} columns={columns} pagination={{ pageSize: 5 }} rowKey={'paymentId'} loading={loading} bordered={true}/> }*/}
    </div>
}
