import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { favouritesAtom } from '../store';
import { searchHistoryAtom } from '../store';

const [user, setUser] = useState('');
const [password, setPassword] = useState('');
const [warning, setWarning] = useState('');


const [searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);
const [favourites, setFavourites ] = useAtom(favouritesAtom);

async function updateAtoms() {
    setFavouritesList(await getFavourites()); 
    setSearchHistory(await getHistory());
}    

const router = useRouter();

async function handleSubmit(e) {
    e.preventDefault();
    try {
        await authenticateUser(user, password);
        await updateAtoms();
        router.push('/favourites');
      } catch (err) {
        setWarning(err.message);
      }
  }

export default function Login(props){
  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below: { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}i