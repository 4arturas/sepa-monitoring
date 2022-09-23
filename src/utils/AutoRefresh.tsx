import {Select} from "antd";
import React, {useState} from "react";

interface AutoRefreshInt {
    autoRefreshFunction: any,
    disabled: boolean
}

export const AutoRefresh : React.FC<AutoRefreshInt> = ( { autoRefreshFunction, disabled } ) => {
    const { Option } = Select;

    const _5min:number  = 1000*60*5;
    const _10min:number = 1000*60*10;
    const _15min:number = 1000*60*15;

    const [autoInterval, setAutoInterval] = useState<any>(null);
    let i:number = 0;
    return <>
        <Select
            disabled={disabled}
            defaultValue={-1}
            style={{width:'200px'}}
            onChange={(value: number, option: any) => {
                autoInterval && clearInterval( autoInterval );
                const interval = setInterval( () => {
                    autoRefreshFunction();
                }, value );
                setAutoInterval( interval );
            }}
        >
            <Option key={'autoRefresh-1'} value={-1}>Auto Refresh Disabled</Option>
            <Option key={'autoRefresh10s'} value={1*1000}>Auto Refresh 3s</Option>
            <Option key={'autoRefresh5min'} value={_5min}>Auto Refresh 5min</Option>
            <Option key={'autoRefresh10min'} value={_10min}>Auto Refresh 10min</Option>
            <Option key={'autoRefresh15min'} value={_15min}>Auto Refresh 15min</Option>
        </Select>
    </>
}
