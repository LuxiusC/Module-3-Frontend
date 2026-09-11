import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import apple from '../mod3.png'
import background from '../background.jpg'
import teacher from '../teacher.jpg'
import student from '../student.jpg'

export default function Home() {
    const navigate = useNavigate()
    return (
        <Container fluid className="px-0">
            <Navbar expand="lg" style={{ display: "flex", backgroundColor: "#FDFBf7", justifyContent: "space-between" }}>
                <Container fluid >
                    <Navbar.Brand onClick={() => navigate('/')} style={{ fontFamily: "cursive", color: "#1b3323" }} href='/'><Image style={{ borderRadius: "20px", marginLeft: "20px" }} height="70" width="70" src={apple} fluid />Academia</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="ms-auto" >
                            <Nav.Link style={{ color: "#1b3323", }} as={Link} to="/students">Students</Nav.Link>
                            <Nav.Link style={{ color: "#1b3323", fontFamily: "cursive" }} as={Link} to="/booking">Book Trial</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "50% 100%",
                height: "350px",
                width: "100%",
                textAlign: "center",
                alignContent: "center",
                paddingBottom: "120px",
                fontFamily: "cursive",
                fontSize: "45px",
                color: "white"
            }}>
                Academia
                <br />
                Start from Young
                <br />
                <Button onClick={() => navigate('/booking')} variant="success">Book Here</Button>
            </div>
            <Row style={{ backgroundColor: "#FDFBf7", padding: "20px" }}>
                <Col>
                    <div style={{ display: 'flex' }}>
                        <Image style={{ padding: "20px", borderRadius: 30, justifyContent: "center" }} height="200px" width="auto" src={teacher} />

                        <div style={{ flex: 1, padding: "20px", alignContent: "center", textAlign: "center", fontFamily: "cursive" }}>
                            <p style={{ textDecoration: "underline", fontSize: "25px" }}>Discover us</p>
                            <p>Learn about our teaching philosophy and values.</p>
                            <Button>About us</Button>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div style={{ display: 'flex' }}>
                        <Image style={{ padding: "20px", borderRadius: 30, justifyContent: "center" }} height="200px" width="280" src={student} />

                        <div style={{ flex: 1, padding: "20px", alignContent: "center", textAlign: "center", fontFamily: "cursive" }}>
                            <p style={{ textDecoration: "underline", fontSize: "25px" }}>Experience a Class</p>
                            <p>Book a free trial or campus tour to see our interactive classrooms in action.</p>
                            <Button onClick={() => navigate('/booking')}>Book Trial</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{ display: "flex", alignContent: "center", justifyContent: "center", height: "250px", background: "linear-gradient(180deg, #2d4a3e 0%, #1a3028 100%)", textAlign: "center" }}>
                <Col style={{ display: "flex", alignContent: "center", color: "#FFFFFF", fontFamily: "cursive" }}>
                    <p>Trust your children with us. Ranked among the Top 10 Early Learning Schools globally, we combine world-class education with a safe, loving environment where over 5,000 children have grown, excelled, and built bright futures.</p>
                </Col>
            </Row>
            <div style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#FDFBf7',
            }}>
                <i class="bi bi-c-square"></i>
                <span style={{ marginLeft: "7px" }}> 2026 Academia Preschool. All rights reserved.</span>
            </div>
        </Container >
    )
}