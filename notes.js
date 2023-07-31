<Nav>
          <NavDropdown title="User Name" id="basic-nav-dropdown">
              
              <Link href='/favourites' passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/favourites"}>
                  <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => handleLinkClick} href="#action/3.1">Favourites</NavDropdown.Item>
                </Nav.Link>
              </Link>

              <Link href='/history' passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/history"}>
                  <NavDropdown.Item active={router.pathname === "/history"} onClick={() => handleLinkClick} href="#action/3.1">Search History</NavDropdown.Item>
                </Nav.Link>
              </Link>
            
            </NavDropdown>


          </Nav>
        </Navbar.Collapse>
      
      </Container>
    </Navbar>
    <br /> 
    <br />
    </>