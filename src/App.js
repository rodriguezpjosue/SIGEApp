import React, { useState } from 'react';
import Login from './components/Login';
import Informes from './components/Informes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/modern.min.css';
import './css/custom.css';
function App() {
  const [logged, setLogin] = useState(false);
  const login = () => {
    setLogin(true);
    alert('logged in!');
  }
  return (
    <div className="App">
      {logged 
        ? <Informes /> 
        : <Login logged={logged} setLogin={setLogin} login={login}/>
      }
    </div>
  );
}

export default App;
