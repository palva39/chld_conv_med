import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const medicationData = {
  Tylenol: { mgPerKg: 15, concentration: 160 },     
  Ibuprofen: { mgPerKg: 10, concentration: 100 },   
  Cetirizine: { mgPerKg: 0.25, concentration: 5 },  
  Loratadine: { mgPerKg: 0.2, concentration: 5 },   
  Fexofenadine: { mgPerKg: 1, concentration: 30 },  
  Dimetapp: { mgPerKg: 1.25, concentration: 12.5 }, 
};

function App() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [medication, setMedication] = useState('Tylenol');
  const [dose, setDose] = useState(null);

  const convertDose = () => {
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setDose("Invalid weight.");
      return;
    }

    const weightInKg = unit === 'lbs' ? weightValue * 0.4536 : weightValue;
    const med = medicationData[medication];

    const totalMg = weightInKg * med.mgPerKg;
    const mL = (totalMg / med.concentration) * 5;

    setDose(`${mL.toFixed(2)} mL`);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Children's Medication Dosage Converter</h2>
      <Row className="mb-3">
        <Col md={4}>
          <InputGroup>
            <Form.Control
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Form.Select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          >
            {Object.keys(medicationData).map((med) => (
              <option key={med} value={med}>{med}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button onClick={convertDose}>Convert</Button>
        </Col>
        <Col md={2}>
          {dose && (
            <div className="mt-2">
              <strong>{dose}</strong>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
