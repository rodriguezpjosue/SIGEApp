
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Informes(props){
    const [informes,setInformes] = useState([]);
    
    useEffect(() => {
        // call api or anything
        const getInformes = async () => {
            const location = 'https://sige.emmanuel.pe/rest/search_read';
            let sid = window.sessionStorage.getItem('sid');
            const settings = {
              model: 'sige.informereunion',
              sid: sid
            }
            const headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
            
            try {
              const axiosResponse = await axios.post(`${location}`, settings, {headers: headers, withCredentials: true});
              console.log(axiosResponse.data.result);
              let result = axiosResponse.data.result;
              if (result.data){
                setInformes(result.data);
              }
            } catch (e){
              let error = JSON.parse(e.response.data.result);
              console.log(error.error);
            }
        
        }
        getInformes();
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