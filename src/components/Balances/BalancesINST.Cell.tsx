import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    Balance_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import React, {useEffect} from "react";
import {balancesSliceAction, BalancesSliceQuery} from "./Balances.Slice";
import {UserInBrowser} from "../Login/User.Slice";
import {Button, DatePicker, Form, Input, Table} from "antd";
import {
    dateFormat_YYYY_MM_DD,
    getLastMonthFirstDay,
    TABLE_PAGE_SIZE_DEFAULT
} from "../../global";
import moment from "moment";

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

    useEffect( () => {
        if ( currentUser?.instIsSet )
        {
            const query:BalancesSliceQuery = { companyId: currentUser.userId, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT };
            dispatch( balancesSliceAction.getBalancesInst( query ) );
        }
    }, [currentUser?.instIsSet] );

    return <div>
        <Form
            data-testid='form-component'
            name="basic"
            layout={"inline"}
            initialValues={{date: [getLastMonthFirstDay(), moment()]}}
            onFinish={async (values: any) => {
                const dateFrom:string = values.date[0].format(dateFormat_YYYY_MM_DD);
                const dateTo:string = values.date[1].format(dateFormat_YYYY_MM_DD);
                delete values['date'];
                dispatch( balancesSliceAction.getBalancesInst( { companyId: currentUser?.userId, dateFrom: dateFrom, dateTo: dateTo,...values, businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea.SEPA_INSTANT } ) );
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
        <Table dataSource={balances?.items || []} columns={columns} pagination={{ pageSize: TABLE_PAGE_SIZE_DEFAULT }} rowKey={row=>`rowKey${rowCounter++}${row.account}`} loading={loading} bordered={true}/>
    </div>;
}
