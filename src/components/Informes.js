
import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Informes(props){
    const [informes,setInformes] = useState([]);

    const getInformes = useCallback(async () => {
      const location = 'rest';
      let sid = window.sessionStorage.getItem('sid');
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
                                    filter: "[('id','!=',None)]",
                                    sid: sid
                                  }
                                }
                            }),
        credentials: 'include'
      }
      
      try {
        const fetchResponse = await fetch(`${location}`, settings);
        const json = await fetchResponse.json();

        let result = [];

        if (json.result){
          result = JSON.parse(json.result); 
        }

        if(json.error || result.error){
          console.log('Error');
          console.log(json);
        } else {
          result = result.data;
          console.log(result);
        }

        setInformes(result);

      } catch (e){
        let error = JSON.parse(e.response.data.result);
        console.log(error.error);
      }
  
    }, [props]);
    
    useEffect(() => {
      getInformes();
    }, [getInformes]);    

    const listItems = informes.length > 0 ? (
        console.log(informes),
        informes.map((informe,index) => 
            <Row>
                <Col md={3} className="center">{informe.display_name}</Col>
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