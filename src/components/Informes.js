
import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
//import axios from 'axios';

export default function Informes(props){
    const { informes } = props;

    const listItems = informes.length > 0 ? (
        informes.map((informe, index) => 
            <Row key={index}>
                <Col md={3} className="center">{informe.id}</Col>
                <Col md={3} className="center">{informe.fechareunion}</Col>
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