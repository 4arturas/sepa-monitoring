import {Users} from "./Users";
import {useEffect, useState} from "react";
import {User_Contracts_UserResponse, User_Contracts_UsersResponse, UsersService} from "../../services/openapi";

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

// export const Failure = ( { error }) => (
//     <div style={{ color: 'red' }}>Error: {error.message}</div>
// )

export const UsersCell = () => {
    const [users,setUsers] = useState<Array<User_Contracts_UserResponse>>();
    useEffect( () => {
        UsersService.getV1Users()
            .then( ( response:User_Contracts_UsersResponse ) => {
                setUsers( response.users || [] );
            })
    }, [] );

    if ( !users ) return <Loading/>

    if ( users?.length === 0 ) return <Empty/>

    return <Users users={users} />
}
