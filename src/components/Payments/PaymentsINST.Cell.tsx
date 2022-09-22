import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {PaymentsINSTQuery, paymentsSliceActions} from "./Payments.Slice";
import {
    Payment_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
    PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus
} from "../../services/openapi";
import {useAppSelector} from "../../app/hooks";
import {UserInBrowser} from "../Login/User.Slice";
import {Alert, Button, DatePicker, Form, Input, Select, Table} from "antd";
import {getLastMonthFirstDay, MSG_BUSINESS_AREA_IS_NOT_SET, TABLE_PAGE_SIZE_DEFAULT} from "../../global";
import moment, {Moment} from "moment";
import {EuroOutlined} from "@ant-design/icons";

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

interface Test {
    items:Array<any>,
    loading:boolean
}
const FilterAndTable : React.FC<Test> = ( { items, loading } ) => {
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const dateFormat = 'YYYY-MM-DD';

    return <>
        <div>
            <Form
                data-testid='form-component'
                name="basic"
                layout={"inline"}
                initialValues={{email: 'adminas@bbservice.lt', code: '123456'}}
                onFinish={async (values: any) => {

                }}>
                <Form.Item name="dateTime">
                    <RangePicker
                        defaultValue={[getLastMonthFirstDay(), moment()]}
                        format={dateFormat}
                        style={{width:'250px'}}
                    />
                </Form.Item>
                <Form.Item name="direction">
                    <Select mode={"multiple"} placeholder={'Direction'} style={{width:'115px'}}>
                        <Option value="0">{PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.IN}</Option>
                        <Option value="1">{PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.OUT}</Option>
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
                <Form.Item style={{textAlign:'center'}}>
                    <Button htmlType="submit" type={"primary"}>Search</Button>&nbsp;
                    <Button htmlType="submit">Clear</Button>&nbsp;
                    <Button htmlType="submit" type={"primary"}>Export</Button>
                </Form.Item>
            </Form>
        </div>
        <br/>
        <div><Table dataSource={items || []} columns={columns} pagination={{ pageSize: TABLE_PAGE_SIZE_DEFAULT }} rowKey={'paymentId'} loading={loading} bordered={true}/></div>
    </>
}

export const PaymentsINSTCell = () => {

    const dispatch = useDispatch();
    const payments:Payment_Contracts_GenerateResponse | null    = useAppSelector( state => state.payments.inst );
    const loading:boolean                                       = useAppSelector( state => state.payments.loadingInst );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );

    useEffect( () => {
        if ( currentUser?.instIsSet )
        {
            const query:PaymentsINSTQuery = { companyId: currentUser.userId, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
            dispatch( paymentsSliceActions.getPaymentsInst( query ) );
        }
    }, [currentUser?.instIsSet] );

    return <div>
        { !currentUser?.instIsSet && <Alert showIcon={true} type='info' message={MSG_BUSINESS_AREA_IS_NOT_SET} /> }
        { payments && <FilterAndTable items={payments.items || []} loading={loading} /> }
    </div>
}
