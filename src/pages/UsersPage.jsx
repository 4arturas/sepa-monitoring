import {useEffect, useState, useSyncExternalStore} from "react";
// import axios from "axios";
import {Link} from "react-router-dom";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    const getData = async () => {
        /*try
        {
            const response = await axios.get( 'https://jsonplaceholder.typicode.com/users' );
            setUsers( response.data );
        }
        catch ( e )
        {

        }*/

    }

    useEffect( () => {
        getData();
    }, [] );

    return (
        <div data-testid='users-page'>
            USERS
            {/*{ users.map( user => <div key={user.id} data-testid='user-item'>{user.name}</div> ) }*/}
            { users.map( user =>
                <Link
                    to={`/users/${user.id}`}
                    key={user.id}
                    data-testid='user-item'>
                    {user.name}
                </Link> ) }
        </div>
    );
}
export default UsersPage;
