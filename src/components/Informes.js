
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Informes(props){
    const [informes,setInformes] = useState([]);
    
    useEffect(() => {
      const getInformes = async () => {
        const location = 'rest/search_read';
        let sid = window.sessionStorage.getItem('sid');
        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
        const settings = {
          method: 'post',
          headers: headers,
          body: JSON.stringify({ 
                                  model: 'sige.informereunion',
                                  params: "[('active','=',True)]",
                                  sid: sid
                                }),
          credentials: 'include'
        }
        
        try {
          const fetchResponse = await fetch(`${location}`, settings);
          const json = await fetchResponse.json();
          console.log(fetchResponse);
          console.log(json);

        } catch (e){
          let error = JSON.parse(e.response.data.result);
          console.log(error.error);
        }
    
      }
      //getInformes();
    });    

    const listItems = informes.length > 0 ? (
        console.log(informes),
        informes.map((informe,index) => 
            <Row>
                <Col md={3} className="center">{informe.name}</Col>
            </Row>
        )
    ) : (<p>Not loaded yet</p>);

    return (
        <main className="page-content">
            <div className="page-inner">
                <div id="main-wrapper">
                    {listItems}
                </div>
            </div>
        </main>
    );
}