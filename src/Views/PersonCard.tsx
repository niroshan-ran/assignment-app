import { Card } from 'react-bootstrap'
import { Person } from '../Model/Person';
import '../App.css'

let PersonCard = (personProps: Person) => {

    return (
        <Card className='card'>
            <Card.Img variant="top" src={personProps.ImageURL.toString()} />
            <Card.Body>
                <Card.Text>Name: {personProps.Title} {personProps.FirstName} {personProps.LastName}</Card.Text>
                <Card.Text>City: {personProps.City}</Card.Text>
                <Card.Text>DoB: {personProps.DoB}</Card.Text>
                <Card.Text>Age: {personProps.Age ? personProps.Age : ""}</Card.Text>
            </Card.Body>
        </Card>
    );

}
export default PersonCard;