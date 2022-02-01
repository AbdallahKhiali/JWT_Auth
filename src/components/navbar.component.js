import React from 'react';
import {
  Link
} from "react-router-dom";

function NavigationBar() {
   const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.replace('/login');
      }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link to="/" className="navbar-brand">Navbar</Link>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/signup">Sign up</Link>
              </li>
              {!localStorage.getItem('token') &&
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
              }
              {localStorage.getItem('token') &&
                <li className="nav-item">
                  <button className="nav-link text-white" onClick={logout}>Logout</button>
                </li>
              }
            </ul>
          </div>
        </nav>
      </>
    )
}

export default NavigationBar
