import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center" style={{ padding: '3rem' }}>
        <Card className="p-4 p-md-5 d-flex flex-column align-items-center hero-card bg-light">
          <h2 className="text-center mb-3 mb-md-4">Welcome to CRUD App</h2>
          <p className="text-center mb-3 mb-md-4">
            This is a professional tool for managing users. Easily add new users by clicking the 'Add User' button and view existing users by clicking the 'View Users' button.
          </p>
          <div className="d-flex flex-column flex-md-row align-items-center">
            <LinkContainer to="/add-user">
              <Button variant="dark" className="mb-3 mb-md-0 me-md-3">
                Add User
              </Button>
            </LinkContainer>
            <LinkContainer to="/view-users">
              <Button variant="info">View Users</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
