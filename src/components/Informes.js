
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Informes(props){
    const [informes,setInformes] = useState([]);
    
    useEffect(() => {
        // call api or anything
        const getInformes = async () => {
            const location = 'https://sige.emmanuel.pe/rest/search_read';
            const settings = {
              model: 'sige.informereunion'
            }
            const headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
            
            try {
              const axiosResponse = await axios.post(`${location}`, settings, {headers: headers});
              console.log(axiosResponse.data.result);
              setInformes(axiosResponse.data.result);
        
            } catch (e){
              console.log(e);
            }
        
        }
        getInformes();
    });    

    const listItems = informes.map((informe,index) => 
        <Row>
            <Col md={3} className="center">{informe.name}</Col>
        </Row>
    );

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