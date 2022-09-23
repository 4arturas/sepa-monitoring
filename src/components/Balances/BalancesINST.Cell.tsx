import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    Balance_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import React, {useEffect, useState} from "react";
import {balancesSliceAction, BalancesSliceQuery} from "./Balances.Slice";
import {UserInBrowser} from "../Login/User.Slice";
import {Button, DatePicker, Form, Input, Table} from "antd";
import {
    dateFormat_YYYY_MM_DD,
    getLastMonthFirstDay,
    TABLE_PAGE_SIZE_DEFAULT
} from "../../global";
import moment from "moment";
import {paymentsSliceActions} from "../Payments/Payments.Slice";

const columns = [
    {
        title: 'Date Time',
        dataIndex: 'date',
        key: 'date',
        render: (text:any, record:any, index:any) => <>{moment(text).format('YYYY-MM-DD')}</>
    },
    {
        title: 'Openings',
        children: [
            {
                title: 'Total',
                dataIndex: 'opening',
                key: 'opening'
            },
            {
                title: 'Available',
                dataIndex: 'availableOpening',
                key: 'availableOpening',

            }
        ]

    },
    {
        title: 'Closings',
        children: [
            {
                title: 'Total',
                dataIndex: 'closing',
                key: 'closing',
            },
            {
                title: 'Available',
                dataIndex: 'availableClosing',
                key: 'availableClosing',
            }
        ]
    },
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',

    }
];

export const BalancesINSTCell = () => {

    const { RangePicker } = DatePicker;

    const dispatch = useDispatch();
    const balances:Balance_Contracts_GenerateResponse | null    = useAppSelector( state => state.balances.inst );
    const loading:boolean                                       = useAppSelector( state => state.balances.loadingInst );
    const currentUser:UserInBrowser | null                      = useAppSelector( state => state.user.currentUser );
    let rowCounter = 0;

    const [page, setPage]               = useState<number>(1);
    const [pageSize, setPageSize]       = useState<number>(TABLE_PAGE_SIZE_DEFAULT);
    const [formValues, setFormValues]   = useState<any>({});

    useEffect( () => {
        if ( currentUser?.instIsSet )
        {
            const dateFrom:string   = getLastMonthFirstDay().format(dateFormat_YYYY_MM_DD);
            const dateTo:string     = moment().format(dateFormat_YYYY_MM_DD);
            const query:BalancesSliceQuery = { companyId: currentUser.userId, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT, dateFrom: dateFrom, dateTo: dateTo, page: 1, pageSize: pageSize };
            setFormValues( query );
            dispatch( balancesSliceAction.getBalancesInst( query ) );
        }
    }, [currentUser?.instIsSet] );

    return <>
        <Form
            data-testid='form-component'
            name="basic"
            layout={"inline"}
            initialValues={{date: [getLastMonthFirstDay(), moment()]}}
            onFinish={async (values: any) => {
                const dateFrom:string = values.date[0].format(dateFormat_YYYY_MM_DD);
                const dateTo:string = values.date[1].format(dateFormat_YYYY_MM_DD);
                delete values['date'];

                setPage( 1 );
                const query = { companyId: currentUser?.userId, dateFrom: dateFrom, dateTo: dateTo,...values, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT, page: 1, pageSize: pageSize };
                setFormValues( query );
                dispatch( balancesSliceAction.getBalancesInst( query ) );
            }}>
            <Form.Item name="date">
                <RangePicker format={dateFormat_YYYY_MM_DD} style={{width:'250px'}} />
            </Form.Item>
            <Form.Item name="account">
                <Input placeholder="Account" style={{width:'200px'}}/>
            </Form.Item>
            <Form.Item style={{textAlign:'center'}}>
                <Button htmlType="submit" type={"primary"}>Search</Button>&nbsp;
                <Button htmlType="reset">Clear</Button>&nbsp;
                <Button htmlType="submit" type={"primary"} onClick={() => alert('Not Implemented yet')}>Export</Button>
            </Form.Item>
        </Form>
        <br/>
        <Table
            dataSource={balances?.items || []}
            columns={columns}
            pagination={{
                current: page,
                pageSize: balances?.paging?.pageSize || TABLE_PAGE_SIZE_DEFAULT, total: balances?.paging?.totalItems,
                showSizeChanger: true
            }}
            onChange={(e) => {
                const query = { ...formValues, page: e.current, pageSize: e.pageSize };
                setFormValues( query );
                dispatch( balancesSliceAction.getBalancesInst( query ) );
                setPage( e.current || 1 );
                setPageSize( e.pageSize || TABLE_PAGE_SIZE_DEFAULT );
            }}
            rowKey={row=>`rowKey${rowCounter++}${row.account}`}
            loading={loading} bordered={true}/>
    </>;
}
