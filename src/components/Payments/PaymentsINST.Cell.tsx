import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {PaymentsINSTQuery, paymentsSliceActions} from "./Payments.Slice";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
    PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus
} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {UserInBrowser} from "../Login/User.Slice";
import {Button, DatePicker, Form, Input, Select, Table} from "antd";
import {
    dateFormat_YYYY_MM_DD,
    getLastMonthFirstDay,
    TABLE_PAGE_SIZE_DEFAULT
} from "../../global";
import moment from "moment";
import {EuroOutlined} from "@ant-design/icons";
import {AutoRefresh} from "../../utils/AutoRefresh";

const columns = [
    {
        title: 'Date Time',
        dataIndex: 'dateTime',
        key: 'dateTime',
        render: (text:any, record:any, index:any) => <span style={{whiteSpace:'nowrap'}}>{text}</span>
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
        ellipsis: true
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
    const [form] = Form.useForm();

    const { RangePicker } = DatePicker;
    const { Option } = Select;

    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse | null    = useAppSelector( state => state.payments.inst );
    const loading:boolean                                       = useAppSelector( state => state.payments.loadingInst );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );

    const [page, setPage]               = useState<number>(1);
    const [pageSize, setPageSize]       = useState<number>(TABLE_PAGE_SIZE_DEFAULT);
    const [formValues, setFormValues]   = useState<any>({});

    const disableAutorefreshComponent = () => {
        const b:boolean = !form.getFieldValue('dateTime') ? true : (form.getFieldValue('dateTime')[1].format(dateFormat_YYYY_MM_DD) !== moment().format(dateFormat_YYYY_MM_DD));
        console.log( b );
        return b;
    };
    const [disabledAutorefresh, setDisabledAutorefresh] = useState<boolean>(true);

    useEffect( () => {
        if ( currentUser?.instIsSet )
        {
            setDisabledAutorefresh( disableAutorefreshComponent() );

            const dateFrom:string   = getLastMonthFirstDay().format(dateFormat_YYYY_MM_DD);
            const dateTo:string     = moment().format(dateFormat_YYYY_MM_DD);
            const query:PaymentsINSTQuery = { companyId: currentUser.userId, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT, dateFrom: dateFrom, dateTo: dateTo, page: 1, pageSize: pageSize };
            setFormValues( query );
            dispatch( paymentsSliceActions.getPaymentsInst( query ) );
        }
    }, [currentUser?.instIsSet] );

    return <>
        <Form
            form={form}
            data-testid='form-component'
            name="basic"
            layout={"inline"}
            initialValues={{dateTime: [getLastMonthFirstDay(), moment()]}}
            onFinish={async (values: any) => {
                setDisabledAutorefresh( disableAutorefreshComponent() );

                const dateFrom:string = values.dateTime[0].format(dateFormat_YYYY_MM_DD);
                const dateTo:string = values.dateTime[1].format(dateFormat_YYYY_MM_DD);
                delete values['dateTime'];

                setPage( 1 );
                const query = { companyId: currentUser?.userId, dateFrom: dateFrom, dateTo: dateTo,...values, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT, page: 1, pageSize: pageSize };
                setFormValues( query );
                dispatch( paymentsSliceActions.getPaymentsInst( query ) );
            }}>
            <Form.Item name="dateTime">
                <RangePicker format={dateFormat_YYYY_MM_DD} style={{width:'250px'}} onChange={() => { setDisabledAutorefresh( disableAutorefreshComponent() ); }} />
            </Form.Item>
            <Form.Item name="direction">
                <Select placeholder={'Direction'} style={{width:'115px'}}>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.IN}>{PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.IN}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.OUT}>{PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.OUT}</Option>
                </Select>
            </Form.Item>
            <Form.Item name="paymentId">
                <Input placeholder="Payment ID" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="transactionId">
                <Input placeholder="TxID(CBL)" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="probanxId">
                <Input placeholder="ID(PBX)" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="statuses">
                <Select mode={"multiple"} placeholder={'Statuses'} style={{width:'200px'}}>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.CREATED}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.CREATED}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.PROCESSING}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.PROCESSING}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.SENT}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.SENT}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.SETTLED}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.SETTLED}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.RECEIVED}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.RECEIVED}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.REJECTED}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.REJECTED}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.INVALID}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.INVALID}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.FAILED}>{PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus.FAILED}</Option>
                </Select>
            </Form.Item>
            <Form.Item name="rejectReasons">
                <Input placeholder="Rejected Reason" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="debtorAccount">
                <Input placeholder="Debtor Account" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="creditorAccount">
                <Input placeholder="Creditor Account" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="amountFrom">
                <Input placeholder="From Amount" prefix={<EuroOutlined />}  style={{width:'115px'}}/>
            </Form.Item>
            <Form.Item name="amountTo">
                <Input placeholder="To Amount" prefix={<EuroOutlined />}  style={{width:'115px'}}/>
            </Form.Item>
            <AutoRefresh
                disabled={ disabledAutorefresh }
                autoRefreshFunction={ () => dispatch( paymentsSliceActions.getPaymentsInst( formValues ) )}/>
            <Form.Item style={{textAlign:'center'}}>
                <Button htmlType="submit" type={"primary"}>Search</Button>&nbsp;
                <Button htmlType="reset">Clear</Button>&nbsp;
                <Button htmlType="submit" type={"primary"} onClick={() => alert('Not Implemented yet')}>Export</Button>
            </Form.Item>
        </Form>
        <br/>
        <Table
            dataSource={payments?.items || []}
            columns={columns}
            pagination={{
                current: page,
                pageSize: payments?.paging?.pageSize || TABLE_PAGE_SIZE_DEFAULT, total: payments?.paging?.totalItems,
                showSizeChanger: true
            }}
            onChange={(e) => {
                const query = { ...formValues, page: e.current, pageSize: e.pageSize };
                setFormValues( query );
                dispatch( paymentsSliceActions.getPaymentsInst( query ) );
                setPage( e.current || 1 );
                setPageSize( e.pageSize || TABLE_PAGE_SIZE_DEFAULT );
            }}
            rowKey={'paymentId'}
            loading={loading}
            bordered={true}/>
    </>
}
