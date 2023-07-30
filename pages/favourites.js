import { React, useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Container, Col, Row, Card} from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites(){
    
    const [favourites, setFavourites ] = useAtom(favouritesAtom);
    
    let [ artworkList, setArtworkList ] = useState([]);

    useEffect(() => {
        setArtworkList(favourites);
    }, [favourites]);

    if(!favourites) return null;

    return(
        <>
        <Container>
        {artworkList.length > 0 ? (
            <>
                <Row className="gy-4">
                    {artworkList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                </Row>
            </>
            ) : (
            <Card>
                <Card.Body>
                <h4>Nothing Here</h4>
                </Card.Body>
            </Card>
            )}
        </Container>
    </>

    );
}
