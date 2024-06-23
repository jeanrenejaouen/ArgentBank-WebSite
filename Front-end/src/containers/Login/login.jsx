import React, {useState} from 'react';

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);     
  
  return (
    <>
    
      <main className="main bg-dark div">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit>            
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" required value={email} onChange={(e)=>setEmail(e.target.value)}></input>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required value={password} onChange={(e)=>setPassword(e.target.value)}></input>
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" onChange={()=>setRememberMe(!rememberMe)}></input>
                <label htmlFor="remember-me">Remember me</label>
              </div>              
              <button type="submit" className="sign-in-button">
                Sign In
              </button> 
            </form>
          </section>
      </main>
    </>
  );
}

export default Login;