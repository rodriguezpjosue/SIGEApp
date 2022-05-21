
import { Row, Col, Form } from 'react-bootstrap';
export default function Informes(props){
    const { informes, setInformes } = props;
    const listItems = informes.map((informe,index) => 
        <Row>
            <Col md={3} className="center"></Col>
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