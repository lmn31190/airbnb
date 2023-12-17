import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const AccountPage = () => {
    const {ready , user} = useContext(UserContext)

    if(!ready) {
        return 'Chargement...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            account {user.name} 
        </div>
    );
};

export default AccountPage;