import React from 'react';

import Welcome from '../../components/Welcome/welcome.jsx';
import Account from '../../components/Account/account.jsx';
import './profile.css';

function Profile() {

    return (
        <>
            
            <main className="main bg-dark div">
                <Welcome />
                <h2 className="sr-only">Accounts</h2>
                <Account origin="profile" title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance"/>
                <Account origin="profile" title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance"/>
                <Account origin="profile" title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance"/>
            </main>
        </>
    );
}

export default Profile;