import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {
    Balance_Contracts_GenerateResponse,
    PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea
} from "../../services/openapi";
import {useEffect} from "react";
import {balancesSliceAction, BalancesSliceQuery} from "./Balances.Slice";
import {UserInBrowser} from "../Login/User.Slice";
import {Alert, Table} from "antd";
import {MSG_BUSINESS_AREA_IS_NOT_SET, TABLE_PAGE_SIZE_DEFAULT} from "../../global";
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
        { !currentUser?.instIsSet && <Alert showIcon={true} type='info' message={MSG_BUSINESS_AREA_IS_NOT_SET} /> }
        { balances && <Table dataSource={balances.items || []} columns={columns} pagination={{ pageSize: TABLE_PAGE_SIZE_DEFAULT }} rowKey={row=>`rowKey${rowCounter++}${row.account}`} loading={loading} bordered={true}/> }
    </div>;
}
