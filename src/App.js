import Login from './components/login.component'
import Register from './components/register.component'
import Home from './components/home.component'
import React from 'react'
import './styles/application.css'
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import { userContext } from './user.context'
import axios from 'axios'
function App() {

  const [user, setuser] = React.useState()
  console.log(user)

  return (
      <div className="container">
        <userContext.Provider value={{ user, setuser }} >

          <Router>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/register" component={Register}  />
                <Route path="/login" component={Login}  />
              </Switch>
          </Router>

        </userContext.Provider>
    </div>
  );
}

export default App;
