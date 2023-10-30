import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";


const ViewUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = async () => {
    try {
      const updatedUserResponse = await axios.put(`http://localhost:3001/users/${selectedUser.id}`, selectedUser);
      setUsers(updatedUserResponse.data);
      toast.success('user updated succesfully')
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error('nothing to update')
    }
    setShowEditModal(false);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/users/${userId}`);
      if (response.status === 200) {
        toast.success('User deleted successfully');
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };
  

  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  return (
    <div style={{ paddingTop: "5rem" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">User Database</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Birth Date</th>
                <th>View Details</th>
                <th>Edit Details</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openViewModal(user)}
                      style={{ width: "80px" }}
                    >
                      Details
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => openEditModal(user)}
                      style={{ width: "80px" }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                        variant="danger" 
                        onClick={() => handleDelete(user.id)}
                        style={{ width: "80px" }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal for viewing user Details */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>First Name: {selectedUser.firstName}</p>
          <p>Last Name: {selectedUser.lastName}</p>
          <p>Date of Birth: {selectedUser.dateOfBirth}</p>
          <p>Address: {selectedUser.address}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal for editing user Details */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={selectedUser.firstName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    firstName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={selectedUser.lastName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    lastName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={selectedUser.dateOfBirth}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    dateOfBirth: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={selectedUser.address}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewUserScreen;
