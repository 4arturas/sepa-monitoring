import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
    PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus,
    Turnover_Contracts_GenerateResponse
} from "../../services/openapi";
import React, {useEffect, useState} from "react";
import {turnoversActions, TurnoversQuery} from "./Turnovers.Slice";
import {UserInBrowser} from "../Login/User.Slice";
import {Alert, Button, DatePicker, Form, Input, Pagination, Select, Table} from "antd";
import {
    dateFormat_YYYY_MM_DD,
    getLastMonthFirstDay,
    MSG_BUSINESS_AREA_IS_NOT_SET,
    TABLE_PAGE_SIZE_DEFAULT
} from "../../global";
import moment from "moment/moment";
import {paymentsSliceActions} from "../Payments/Payments.Slice";
import {EuroOutlined} from "@ant-design/icons";

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

    const { RangePicker } = DatePicker;
    const { Option } = Select;

    const dispatch = useDispatch();
    const turnovers:Turnover_Contracts_GenerateResponse | null  = useAppSelector( state => state.turnovers.inst );
    const loading:boolean                                       = useAppSelector( state => state.turnovers.loadingInst );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );

    const [page, setPage]               = useState<number>(1);
    const [pageSize, setPageSize]       = useState<number>(TABLE_PAGE_SIZE_DEFAULT);
    const [formValues, setFormValues]   = useState<any>({});

    useEffect( () => {
        if ( currentUser?.instIsSet )
        {
            const dateFrom:string   = getLastMonthFirstDay().format(dateFormat_YYYY_MM_DD);
            const dateTo:string     = moment().format(dateFormat_YYYY_MM_DD);
            const query = { companyId: currentUser.userId, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT, dateFrom: dateFrom, dateTo: dateTo, page: 1, pageSize: pageSize };
            setFormValues( query );
            dispatch( turnoversActions.getTurnoversINST( query ) );
        }
    }, [currentUser?.instIsSet] );


    return <>
        <Form
            data-testid='form-component'
            name="basic"
            layout={"inline"}
            initialValues={{settlementDate: [getLastMonthFirstDay(), moment()]}}
            onFinish={async (values: any) => {
                const dateFrom:string = values.settlementDate[0].format(dateFormat_YYYY_MM_DD);
                const dateTo:string = values.settlementDate[1].format(dateFormat_YYYY_MM_DD);
                delete values['settlementDate'];

                setPage(1);
                const query = { companyId: currentUser?.userId, dateFrom: dateFrom, dateTo: dateTo,...values, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT, page: 1, pageSize: pageSize };
                setFormValues( query );
                dispatch( turnoversActions.getTurnoversINST( query ) );
            }}>
            <Form.Item name="settlementDate">
                <RangePicker format={dateFormat_YYYY_MM_DD} style={{width:'250px'}} />
            </Form.Item>
            <Form.Item name="direction">
                <Select placeholder={'Direction'} style={{width:'115px'}}>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.IN}>{PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.IN}</Option>
                    <Option value={PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.OUT}>{PBX_Monitoring_SEPA_Infrastructure_Enum_Direction.OUT}</Option>
                </Select>
            </Form.Item>
            <Form.Item name="transactionId">
                <Input placeholder="Txn id" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="debtorCode">
                <Input placeholder="Debtor BIC" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item name="creditorCode">
                <Input placeholder="Creditor BIC" style={{width:'200px'}}/>
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
                <Button htmlType="reset">Clear</Button>&nbsp;
                <Button htmlType="submit" type={"primary"} onClick={() => alert('Not Implemented yet')}>Export</Button>
            </Form.Item>
        </Form>
        <br/>
        <Table
            dataSource={turnovers?.items || []}
            columns={columns}

            pagination={{
                current: page,
                pageSize: turnovers?.paging?.pageSize || TABLE_PAGE_SIZE_DEFAULT, total: turnovers?.paging?.totalItems,
                showSizeChanger: true
            }}
            onChange={(e) => {
                const query = { ...formValues, page: e.current, pageSize: e.pageSize };
                setFormValues( query );
                dispatch( turnoversActions.getTurnoversINST( query ) );
                setPage( e.current || 1 );
                setPageSize( e.pageSize || TABLE_PAGE_SIZE_DEFAULT );
            }}
            rowKey={'transactionId'}
            loading={loading}
            bordered={true}/>
    </>
}
