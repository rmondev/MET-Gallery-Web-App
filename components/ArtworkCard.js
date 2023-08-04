import React from 'react';
import useSwr from 'swr';
import Error from 'next/error';
import {Card, Button} from 'react-bootstrap';
import Link from 'next/link';

export default function ArtworkCard(props){
    
    // 'props.objectID' used for MET API call (SWR)
    const { data, error } = useSwr(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    if(error){
        return (
        <>
            <Error statusCode={404} />
        </>
        )
    }
    else if (data === null || data === undefined){
        return null;
    } else {
            return (
                <>
                <Card>
                    {data?.primaryImageSmall ? 
                        <Card.Img alt="Card image" style={{ width: '18rem' }} src={data?.primaryImageSmall} /> :
                        <Card.Img alt="Card image" style={{ width: '18rem' }} src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]" />
                    }
                        <Card.Body>
                            {data?.title ?
                                <Card.Title><h4>{data?.title}</h4></Card.Title> : 
                                <Card.Title>N/A</Card.Title>
                            } 
                                <Card.Text>
                                    <br/>
                                {data?.objectDate ? <p><strong>Date: </strong>{data?.objectDate}</p> : <p><strong>Date: </strong>N/A</p>}
                                {data?.classification ? <p><strong>Classification: </strong>{data?.classification}</p> : <p><strong>Classification: </strong>N/A</p>}
                                {data?.medium ? <p><strong>Medium: </strong>{data?.medium}</p> : <p><strong>Date: </strong>N/A</p>}

                                </Card.Text>
                                <Link legacyBehavior passHref href={`/artwork/${props.objectID}`}>
                                <Button>{props.objectID}</Button>
                                </Link>
                        </Card.Body>
                </Card>
                </>
            )

    }

    
}