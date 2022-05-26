import React, { useState } from 'react';
//import axios from 'axios';
import Login from './components/Login';
import Informes from './components/Informes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/modern.min.css';
import './css/custom.css';

function App() {
  const [logged, setLogin] = useState(false);
  const [informes, setInformes] = useState(false);
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

      if (result.data.uid) {
        setLogin(true);
        getInformes();
        window.sessionStorage.setItem('red_liderada', result.data.red_liderada);
        window.sessionStorage.setItem('red_id', result.data.red_id);
        window.sessionStorage.setItem('sid', result.data.session_id);
      } else {
        setLogin(false);
        alert('Usuario o contraseña incorrecto')
      }
      
    } catch (e){
      let error = JSON.parse(e);
      if (error.error) {
        alert(error.error);
      }
    }

  }

  const getInformes = async () => {
    const location = 'rest';
    let sid = window.sessionStorage.getItem('sid');
    let red_liderada = window.sessionStorage.getItem('red_liderada');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const settings = {
      method: 'post',
      headers: headers,
      body: JSON.stringify({
                              params:{ 
                                endpoint: 'search_read',
                                args: {
                                  model: 'sige.informereunion',
                                  filter: "[('red_id','='," + red_liderada + ")]",
                                  fields: "['fechareunion', 'tema', 'state']",
                                  sid: sid
                                }
                              }
                          }),
      credentials: 'include'
    }

    try {
      const fetchResponse = await fetch(`${location}`, settings);
      const json = await fetchResponse.json();
      let data = JSON.parse(json.result);
      setInformes(data.data);

    } catch(e) {
      let error = JSON.parse(e);
      alert(error);
    }
    
  }

  //const MemoInformes = React.memo(Informes);

  return (
    <div className="App">
      {logged 
        ? informes ? <Informes informes={informes}/> : <p>Cargando ...</p>
        : <Login login={login} changeHandler={changeHandler} allValues={allValues}/>
      }
    </div>
  );
}

export default App;
