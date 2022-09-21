import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {PaymentsINSTQuery, paymentsSliceActions} from "./Payments.Slice";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {UserInBrowser} from "../Login/User.Slice";
import {Alert, Table} from "antd";
import {Spin} from "antd/es";

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

export const PaymentsINSTCell = () => {

    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse | null    = useAppSelector( state => state.payments.inst );
    const loading:boolean                                       = useAppSelector( state => state.payments.loadingInst );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );

    useEffect( () => {
        if ( currentUser?.instIsSet )
        {
            const query:PaymentsINSTQuery = { companyId: 1, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
            dispatch( paymentsSliceActions.getPaymentsInst( query ) );
        }
    }, [] );

    return <div>
        { !currentUser?.instIsSet && <Alert showIcon={true} type='info' message={'Business area is not set'} /> }
        {/*{ currentUser?.instIsSet && loading && <div><Spin/> Loading INST...</div> }*/}
        {/*{ currentUser?.instIsSet && payments && <div>${JSON.stringify(payments.items)}</div> }*/}
        { currentUser?.instIsSet && payments && <Table dataSource={payments.items || []} columns={columns} pagination={{ pageSize: 5 }} rowKey={'paymentId'} loading={loading} bordered={true}/> }
    </div>
}
