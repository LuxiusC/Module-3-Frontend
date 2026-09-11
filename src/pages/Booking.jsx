import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import board from "../greenboard.jpg"
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UserContext";



export default function Booking() {
    const url = "http://localhost:3000"
    const navigate = useNavigate()
    const { allUser } = useUsers()
    const [userId, setUserId] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [classType, setClassType] = useState('')
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const handleDateChange = (date) => {
        setDate(date)
    }

    const handleTimeChange = (time) => {
        setTime(time)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formattedDate = date ? new Date(date).toLocaleDateString("en-CA") : "";
        const formattedTime = time ? new Date(time).toLocaleTimeString('en-GB') : ""

        try {
            const data = {
                title: title,
                description: description,
                date_now: formattedDate,
                time_now: formattedTime,
                user_id: userId,
                class_type: classType
            }
            const res = await axios.post(`${url}/newbooking/${userId}`, data)
            setUserId(null)
            setTitle('')
            setDescription('')
            setClassType('')
            setDate(null)
            setTime(null)
            setSubmitted(true)
        } catch (error) {
            console.error(error.message)
        }
    }


    return (
        <Container className="vh-100" fluid style={{ padding: "0", backgroundImage: `url(${board})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

            <Card style={{
                padding: "40px 60px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff"
            }}>
                <div>
                    <Button onClick={() => navigate('/')} style={{ border: "0", backgroundColor: "transparent", display: 'flex', justifyContent: "start", alignContent: "start" }}><i class="bi bi-arrow-bar-left" style={{ marginRight: "1px" }}></i>Back</Button>
                </div>
                <Card.Body>
                    <h3>Start Your Journey Now</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label style={{ marginBottom: "5px", marginTop: "5px" }}>Name:</Form.Label>
                            <Form.Select
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                defaultValue=''
                            >
                                <option value=''>Choose Participant</option>
                                {allUser.map((u) => {
                                    return (
                                        <option key={u.id} value={u.id}>
                                            {u.name} - {u.email}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ marginBottom: "5px", marginTop: "5px" }}>Title:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="What are you up to do ?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ marginBottom: "5px", marginTop: "5px" }}>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="What are you up to do ?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ marginBottom: "5px", marginTop: "5px" }}>Class Type:</Form.Label>
                            <Form.Select
                                defaultValue=''
                                value={classType}
                                onChange={(e) => setClassType(e.target.value)}
                                required
                            >
                                <option value='' disabled>Type:</option>
                                <option value="TOUR" >TOUR</option>
                                <option value='FULL CLASS' >FULL CLASS</option>
                                <option value='TRIAL' >TRIAL</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ marginBottom: "5px", marginTop: "5px" }}>Date:</Form.Label>
                            <DatePicker
                                selected={date}
                                onChange={handleDateChange}
                                dateFormat="YYYY/MM/dd"
                                wrapperClassName="w-100"
                                className="form-control"
                                placeholderText="Pick a date..."
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{ marginBottom: "5px", marginTop: "5px" }}>Time:</Form.Label>
                            <DatePicker
                                selected={time}
                                onChange={handleTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm:ss aa"
                                wrapperClassName="w-100"
                                className="form-control"
                                placeholderText="Pick a time..."
                                required
                            />
                        </Form.Group>

                        <Button style={{ marginTop: "20px", width: "100%" }} variant="success" type="submit">Submit</Button>
                        {submitted ? <p style={{ marginTop: "10px", textAlign: "center" }}>Thanks for the submittion, see you soon!</p> : ""}
                    </Form>
                    <hr />
                    <p style={{ marginTop: "10px" }}>Dont have your name? Click here to register</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="success" onClick={() => navigate('/newuser')} >Register</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>

    )

}
