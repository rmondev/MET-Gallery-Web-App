import { React, useState } from 'react';
import useSwr from 'swr';
import Error from 'next/error';
import {Card, Button} from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';


export default function ArtworkCardDetail(props){

   
    const [ favourites, setFavourites ] = useAtom(favouritesAtom);
    
    const [ showAdded, setShowAdded ] = useState(favourites.includes(props.objectID) ? true : false);

    // 'props.objectID' used for MET API call (SWR)
    const { data, error } = useSwr(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);

    const favouritesClicked = () => {
        // If the "showAdded" value in the state is false, then we must add the objectID (passed in "props") to the "favouritesList" 
        if (showAdded) {
            setFavourites(favourites => favourites.filter(fav => fav != props.objectID));
            setShowAdded(false);

        // If the "showAdded" value in the state is false, then we must add the objectID (passed in "props") to the "favouritesList"
        } else {
            setFavourites(favourites => [...favourites, props.objectID]);
            setShowAdded(true);
        }
    }

    if(error){
        return (
        <>
            <Error statusCode={404} />
        </>
        )
    }
    else if(data === null || data === undefined){
        return null;
    }
    else{
        return (
            <>
            <Card>
                {data?.primaryImageSmall &&
                    <Card.Img class="card-img-top" alt="Card image" src={data?.primaryImage} /> 
                }
                    <Card.Body>
                        {data?.title ?
                            <Card.Title><strong>{data?.title}</strong></Card.Title> : 
                            <Card.Title>N/A</Card.Title>
                        } 
                            <Card.Text>
                            <br/>
                             {data?.objectDate ? <p><strong>Date: </strong>{data?.objectDate}</p> : <p><strong>Date: </strong>N/A</p>}
                             {data?.classification ?<p><strong>Classification: </strong>{data?.classification}</p> : <p><strong>Classification: </strong>N/A</p>}
                             {data?.medium ? <p><strong>Medium: </strong>{data?.medium}</p> : <p><strong>Medium: </strong>N/A</p>}
                             {data?.artistDisplayName ? 
                                    <span>
                                        <p><strong>Artist(s): </strong>{data?.artistDisplayName}</p>
                                        <p>
                                            <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer"><strong>Wiki: {data?.artistDisplayName}</strong> </a>
                                        </p>
                                    </span>
                                : 
                                <span><strong>Wiki: </strong><p>N/A</p></span>}
                             {data?.creditLine ? <p><strong>Credit: </strong>{data?.creditLine}</p> : <p><strong>Credit: </strong>N/A</p>}
                             {data?.dimensions ? <p><strong>Dimensions: </strong>{data?.dimensions}</p> : <p><strong>Dimensions: </strong>N/A</p>}
                             {showAdded ? <Button onClick={favouritesClicked} variant='primary'>+ Favourite (added)</Button> : <Button onClick={favouritesClicked} variant='outline-primary'>+ Favourite</Button>}

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