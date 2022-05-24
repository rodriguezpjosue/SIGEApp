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
    const location = 'rest';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const settings = {
      method: 'post',
      headers: headers,
      body: JSON.stringify({
                            params: {
                              endpoint: 'login',
                              args: {
                                db: 'sige', 
                                login: allValues.login, 
                                password: allValues.password
                              }
                            }
                          }),
      credentials: 'include'
    }

    try {
      const fetchResponse = await fetch(`${location}`, settings);
      const json = await fetchResponse.json();
      let result = JSON.parse(json.result);
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
      if (error.error) {
        alert(error.error);
      }
    }

  }

  //const MemoInformes = React.memo(Informes);

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
