import React, { useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Informes from './components/Informes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/modern.min.css';
import './css/custom.css';

function App() {
  const [logged, setLogin] = useState(false);
  const [allValues, setAllValues] = useState({
    login: '',
    password: ''
  });
  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  }

  const login = async (event) => {
    event.preventDefault();
    const location = 'https://sige.emmanuel.pe/rest/login';
    const settings = {
      db: 'sige', 
      login: allValues.login, 
      password: allValues.password
    }
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    try {
      const axiosResponse = await axios.post(`${location}`, settings, {headers: headers});
      console.log(axiosResponse.data.result);
      setLogin(true);
    } catch (e){
      console.log(e);
    }

  }

  return (
    <div className="App">
      {logged 
        ? <Informes /> 
        : <Login logged={logged} setLogin={setLogin} login={login} changeHandler={changeHandler} allValues={allValues}/>
      }
    </div>
  );
}

export default App;
