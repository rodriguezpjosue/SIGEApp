import React, { useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Informes from './components/Informes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/modern.min.css';
import './css/custom.css';

function App() {
  //axios.defaults.withCredentials = true;
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
      const axiosResponse = await axios.post(`${location}`, settings, {headers: headers, withCredentials: true});
      let result = JSON.parse(axiosResponse.data.result);
      console.log(result);

      if (result.data.uid) {
        setLogin(true);
        window.sessionStorage.setItem('sid', result.data.session_id)
      } else {
        console.log(result.uid);
        setLogin(false);
        alert('Usuario o contraseña incorrecto')
      }
      
    } catch (e){
      let error = JSON.parse(e);
      console.log(error);
    }

  }

  return (
    <div className="App">
      {logged 
        ? <Informes /> 
        : <Login login={login} changeHandler={changeHandler} allValues={allValues}/>
      }
    </div>
  );
}

export default App;
