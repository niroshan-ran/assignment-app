import { useState } from 'react';
import './App.css';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { GetRandomAgeByName, GetThreeRandomPeople } from './Functions/APIRequests';
import PersonCard from './Views/PersonCard';
import { Person } from './Model/Person';

function App() {

  let [personsList, setPersonsList] = useState<Person[]>([]);
  let [isFetechedRandomPeoples, setIsFetechedRandomPeoples] = useState(false);

  let btnSearchRandomPeopleClick = () => {
    GetThreeRandomPeople().then(persons => {

      setPersonsList(persons);
      setIsFetechedRandomPeoples(true);

    });
  }

  let btnCalculateAgeClick = () => {
    GetRandomAgeByName(personsList).then(persons => {
      setPersonsList(persons);
    });
  }

  let btnClear = () => {
    setPersonsList([]);
    setIsFetechedRandomPeoples(false);
  }

  return (
    <Container>
      <div className="mb-2 mt-2">
        <ButtonGroup>
          <Button variant="primary" className="mb-2 mt-2" onClick={btnSearchRandomPeopleClick}>Search Random People</Button>
          {isFetechedRandomPeoples ?
            <>
              <Button variant="info" className="mb-2 mt-2" onClick={btnCalculateAgeClick}>Calculate Age</Button>
              <Button variant="danger" className="mb-2 mt-2" onClick={btnClear}>Clear</Button>
            </> : <>
              <Button variant="info" className="mb-2 mt-2" onClick={btnCalculateAgeClick} disabled>Calculate Age</Button>
              <Button variant="danger" className="mb-2 mt-2" onClick={btnClear} disabled>Clear</Button>
            </>
          }
        </ButtonGroup>
      </div>


      <Row>

        {(personsList) ?
          personsList.map((personObj, index) => {
            return <Col><PersonCard key={index} Title={personObj.Title} FirstName={personObj.FirstName} LastName={personObj.LastName} ImageURL={personObj.ImageURL} City={personObj.City} DoB={personObj.DoB} Age={personObj.Age} /></Col>
          })
          : null}
      </Row>
    </Container>
  );
}

export default App;
