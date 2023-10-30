import { Navbar, Nav, Container } from "react-bootstrap"

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand>CRUD App</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
