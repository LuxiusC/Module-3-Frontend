import { useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import board from '../greenboard.jpg'
import axios from "axios";
import Cards from "../components/Card";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";


export default function Students() {
    const url = 'http://localhost:3000'
    const [number, setNumber] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [classType, setClassType] = useState('')
    const [userData, setUserData] = useState([])
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const [postId, setPostId] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const classTypes = ["FULL CLASS", "TOUR", "TRIAL"]
    const navigate = useNavigate()
    console.log(postId)
    console.log(userData)

    const handleClose = () => {
        setShow(false)
    }

    const handleOpen = () => {
        setShow(true)
    }

    const handleOpenDelete = (id) => {
        setPostId(id)
        setDeleteModal(true)
    }

    const handleCloseDelete = () => {
        setDeleteModal(false)
    }

    const handleDate = (date) => {
        setDate(date)
    }

    const handleTime = (time) => {
        const formattedTime = time ? new Date(time).toLocaleTimeString('en-GB') : ""
        setTime(formattedTime)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                phone_number: number
            }
            const res = await axios.post(`${url}/result`, data)
            setUserData(res.data)
            setError('')
        } catch (error) {
            console.error(error.message)
            setError("No booking is found under this number.")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!userData)
            return
        try {
            const data = {
                title: title,
                description: description,
                date_now: date,
                time_now: time,
                class_type: classType,
            }
            const res = await axios.put(`${url}/update/${postId}`, data)
            console.log(res.data)
            handleClose()
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!postId) return
        try {
            const res = await axios.delete(`${url}/booking/${postId}`)
            setUserData((prev) => prev.filter((user) => user.id !== postId))
            handleCloseDelete()
        } catch (error) {
            console.error(error.message)
        }

    }

    return (
        <Container fluid className="min-vh-100" style={{ display: "flex", backgroundImage: `url(${board})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", justifyContent: "center", paddingLeft: "0px", width: '100%', margin: '0', padding: "0" }}>
            <Form onSubmit={handleSubmit} style={{ padding: "50px" }}>
                <Card
                    style={{
                        padding: "30px 45px",
                        backdropFilter: "blur(12px)",
                        background: "rgba(255, 255, 255, 0.15)",
                        color: "#FFFFFF"
                    }}
                >
                    <div>
                        <Button onClick={() => navigate('/')} style={{ border: "0", backgroundColor: "transparent", display: 'flex', justifyContent: "start", alignContent: "start" }}><i class="bi bi-arrow-bar-left" style={{ marginRight: "1px" }}></i>Back</Button>
                    </div>
                    <Card.Body style={{ textAlign: "center" }}>

                        <p>Welcome</p>
                        <p>Type your phone number to view your bookings</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Type here..."
                            />
                        </Form.Group>
                        <br />
                        <Button variant="success" type="submit">Search</Button>
                        <br />
                        {error ? error : ""}
                    </Card.Body>
                </Card>
            </Form>

            <div style={{ position: "absolute", display: "flex", top: "350px", gap: "10px" }}>
                {userData?.map((user) => {
                    const oriData = () => {
                        setPostId(user.id)
                        setTitle(user.title)
                        setDescription(user.description)
                        setDate(user.date_now)
                        setTime(user.time_now)
                        handleOpen()
                    }


                    const formattedData = {
                        ...user, date_now: user.date_now ? new Date(user.date_now).toLocaleDateString("en-CA") : "",
                    }


                    return (
                        <Cards style={{ display: "flex", width: "100%" }} remove={() => handleOpenDelete(user.id)} edit={oriData} data={formattedData} key={user.id} />
                    )
                })}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleUpdate} style={{ padding: "10px", fontFamily: "cursive" }}>
                    <h4 style={{ textAlign: "center" }}>Edit:</h4>
                    <hr />
                    <Form.Group style={{ marginBottom: "10px" }}>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "10px" }}>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "10px" }}>
                        <Form.Label>Date:</Form.Label>
                        <DatePicker
                            selected={date}
                            onChange={handleDate}
                            dateFormat="YYYY/MM/dd"
                            wrapperClassName="w-100"
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Time:</Form.Label>
                        <DatePicker
                            selected={new Date(`1980-01-01T${time}`)}
                            onChange={handleTime}
                            showTimeSelect
                            showTimeSelectOnly
                            dateFormat="HH:mm:ss"
                            wrapperClassName="w-100"
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group style={{ marginTop: "10px" }}>
                        <Form.Label>Class Type:</Form.Label>
                        <Form.Select defaultValue="" onChange={(e) => setClassType(e.target.value)}>
                            <option value="">Pick a type:</option>
                            {classTypes.map((classType, index) => {
                                return (
                                    <option key={index} value={classType}>{classType}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <div style={{ padding: "10px", display: "flex", marginTop: "10px", alignContent: "center", justifyContent: "center" }}>
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </Modal>
            <Modal style={{ alignContent: "center", textAlign: "center" }} show={deleteModal} onHide={handleCloseDelete}>
                <div style={{ padding: "15px", gap: "10px" }}>
                    <p>Are you sure you want to delete this booking?</p>
                    <Button onClick={handleDelete} style={{ width: "60px", marginRight: "20px" }} variant="primary">Yes</Button>
                    <Button onClick={handleCloseDelete} style={{ width: "60px" }} variant="danger">No</Button>
                </div>
            </Modal>
        </Container>
    )
} 