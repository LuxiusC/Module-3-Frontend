import { useState } from "react"
import { Container, Form, Card, Button } from "react-bootstrap"
import board from '../greenboard.jpg'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function User() {
    const url = "https://backend-project-3-jpiudghuq-luxiuscs-projects.vercel.app"
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const submitInfo = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/newuser`, { name, phone_number: number, email })
            if (res.data.message) {
                setError(res.data.message)
            } else {
                setName('')
                setEmail('')
                setNumber('')
                setError('')
                setSubmitted(true)
                setNotice('Thank you for the information. Press Proceed if you want to book a spot now.')
            }
        } catch (error) {
            setError(error, "Network Error")
        }
    }

    return (
        <Container className="vh-100" fluid style={{ padding: "0", backgroundImage: `url(${board})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{
                padding: "40px 50px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff"
            }}>
                <div>
                    <Button onClick={() => navigate('/')} style={{ border: "0", backgroundColor: "transparent", display: 'flex', justifyContent: "start", alignContent: "start" }}><i class="bi bi-arrow-bar-left" style={{ marginRight: "1px" }}></i>Back</Button>
                </div>
                <Card.Body style={{ textAlign: "center" }}>
                    <h4>General Information:</h4>
                    <Form onSubmit={submitInfo}>
                        <Form.Group style={{ padding: "2px", display: "flex" }}>
                            <Form.Label className="me-3 mt-1">Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-2" style={{ padding: "2px", display: "flex" }}>
                            <Form.Label className="me-3 mt-1">Phone Number:</Form.Label>
                            <Form.Control
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-2 mb-3" style={{ padding: "2px", display: "flex" }}>
                            <Form.Label className="me-3 mt-1">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        {submitted ? <Button variant="success" onClick={() => navigate('/booking')}>Proceed</Button> : <Button variant="success" type="submit">Submit</Button>}
                        <p className="mt-4">{error ? error : notice}</p>
                    </Form>
                </Card.Body>
            </Card>
        </Container >
    )
}