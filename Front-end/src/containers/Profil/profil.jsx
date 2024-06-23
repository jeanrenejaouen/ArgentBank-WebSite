import React from 'react';

import Welcome from '../../components/Welcome/welcome.jsx';
/* import './profile.css'; */

function Profile() {

    return (
        <>
            
            <main className="main bg-dark div">
                <Welcome />                
                <h2 className="sr-only">Accounts</h2>
                
            </main>
        </>
    );
}

export default Profile;