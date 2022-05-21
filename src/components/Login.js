
import { Row, Col, Form } from 'react-bootstrap';
export default function Login(props){
    const {logged, setLogin, login} = props;
    return (
        <main className="page-content">
            <div className="page-inner">
                <div id="main-wrapper">
                    <Row>
                        <Col md={3} className="center"></Col>
                        <div className="login-box">
                            <a href="index.html" className="logo-name text-lg text-center">Modern</a>
                            <p className="text-center m-t-md">Please login into your account.</p>
                            <Form className="m-t-md" onSubmit={login}>
                                <Form.Group>
                                    <Form.Control type="email" placeholder="Email" required />
                                </Form.Group>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" required/>
                                </div>
                                <button type="submit" className="btn btn-success btn-block">Login</button>
                                <a href="forgot.html" className="display-block text-center m-t-md text-sm">Forgot Password?</a>
                                <p className="text-center m-t-xs text-sm">Do not have an account?</p>
                                <a href="register.html" className="btn btn-default btn-block m-t-md">Create an account</a>
                            </Form>
                            <p className="text-center m-t-xs text-sm">2015 &copy; Modern by Steelcoders.</p>
                        </div>
                    </Row>
                </div>
            </div>
        </main>
    );
}