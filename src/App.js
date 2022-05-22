import React, { useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Informes from './components/Informes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/modern.min.css';
import './css/custom.css';
function App() {
  const [logged, setLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    const location = 'https://sige.emmanuel.pe/rest/login';
    const settings = {
      db: 'sige', 
      login: 'soporte@ibemmanuel.org', 
      password: 'J3sus1smystr3ngth'
    }
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const axiosResponse = await axios.post(`${location}`, settings, {headers: headers});
    console.log(axiosResponse.data.result);
    return axiosResponse;
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
