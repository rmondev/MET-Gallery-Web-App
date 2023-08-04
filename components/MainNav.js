import {React, useState} from 'react';
import {Container, Nav, Navbar, Button, Form, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';

function MainNav() {

    const router = useRouter();
    const [searchQueryRoute, setSearchQueryRoute] = useState();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);

    const handleSubmit = async(e) => {
      e.preventDefault()
      setIsExpanded(false)
      router.push(`/artwork?title=true&q=${searchQueryRoute}`)
      setSearchQueryRoute('');
      let queryString = `title=true&q=${searchQueryRoute}`;
      setSearchHistory(await addToHistory(queryString)) 
    }
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLinkClick = () => {
      setIsExpanded(false);
    };

    const logout = () =>{
      setIsExpanded(false)
      removeToken()
      router.push('/login')
    }

    let token = readToken()

  return (
    <>
    <Navbar 
      className="fixed-top navbar-dark bg-primary" expand="lg" variant="light" expanded={isExpanded}>
      <Container>
        <Navbar.Brand>Riccardo Moncada</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggle}/>
        <Navbar.Collapse id="navbarScroll">
          {token ? (
          <>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"} onClick={handleLinkClick}>
                  Home
                </Nav.Link>
              </Link>
            <Link href="/search" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/search"} onClick={handleLinkClick}>
                    Advanced Search
                </Nav.Link>
              </Link>
          </Nav>
          &nbsp;
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(event) => {setSearchQueryRoute(event.target.value)}}/>
            <Button variant="outline-light" type="submit">
                Search
              </Button>
          </Form>
          &nbsp;
          <Nav>
            <NavDropdown title={token.userName} id="basic-nav-dropdown"
              >
             <Link href='/favourites' passHref legacyBehavior>
                <Nav.Link>
                  <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleLinkClick} href="#action/3.1">
                    Favourites
                  </NavDropdown.Item>
                </Nav.Link>
              </Link>
              
              <Link href='/history' passHref legacyBehavior>
                <Nav.Link>
                  <NavDropdown.Item active={router.pathname === "/history"} onClick={handleLinkClick} href="#action/3.1">
                      Search History
                    </NavDropdown.Item>
                </Nav.Link>
              </Link>

              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>
                  <NavDropdown.Item onClick={logout} href="#action/3.3">
                    Logout
                  </NavDropdown.Item>
                </Nav.Link>
              </Link>
            </NavDropdown>
          </Nav>
        </>
    ) : (
      <>
        <Nav
            className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Link href="/" passHref legacyBehavior>
            <Nav.Link active={router.pathname === "/"} onClick={handleLinkClick}>
              Home
            </Nav.Link>
          </Link>  
        </Nav>
        <Nav className="my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
          <Link href="/register" passHref legacyBehavior>
            <Nav.Link active={router.pathname === "/register"} onClick={handleLinkClick}>
              Register
            </Nav.Link>
          </Link>
          <Link href="/login" passHref legacyBehavior>
            <Nav.Link active={router.pathname === "/login"} onClick={handleLinkClick}>
              Login
            </Nav.Link>
          </Link>
        </Nav>
      </>
      )}
      </Navbar.Collapse>
      </Container>
      </Navbar>
      <br />
      <br />
      </>
    );
}

export default MainNav;