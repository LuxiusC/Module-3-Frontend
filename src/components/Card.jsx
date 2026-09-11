import { Card, Button } from "react-bootstrap"
import { ListGroup } from "react-bootstrap"


export default function Cards({ data, edit, remove }) {
    return (
        <Card style={{ fontFamily: "cursive", marginTop: "20px", textAlign: "center", backgroundColor: "#FFC256", color: "black" }}>
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <ListGroup >
                    <ListGroup.Item>Title: {data.title}</ListGroup.Item>
                    <ListGroup.Item>Description: {data.description}</ListGroup.Item>
                    <ListGroup.Item>Date: {data.date_now}</ListGroup.Item>
                    <ListGroup.Item>Time: {data.time_now}</ListGroup.Item>
                </ListGroup>
                <div style={{ marginTop: "10px" }}>
                    <Button style={{ border: "0", backgroundColor: "#2C3E50", marginRight: "10px" }} onClick={edit}><i class="bi bi-pencil-square"></i></Button>
                    <Button style={{ border: "0", backgroundColor: "#DC3545" }} onClick={remove}><i class="bi bi-trash3"></i></Button>
                </div>
            </Card.Body>
        </Card>
    )
}