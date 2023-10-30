import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AddUserScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        firstName,
        lastName,
        dateOfBirth,
        address,
      };

      const response = await axios.post(
        "http://localhost:3001/users",
        userData
      );
      toast.success(response.data);

      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setAddress("");
    } catch (error) {
      toast.error("all fields are required", error);
    }
  };

  return (
    <div>
      <FormContainer>
        <h1 className="text-center">Add a New User</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter your date of birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>

        <Row className="py-3 text-center">
          <Col>
            <p className="mb-0">
              Discover our user database:
              <Link to="/view-users" className="btn btn-link">
                View Existing Users
              </Link>
            </p>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default AddUserScreen;
