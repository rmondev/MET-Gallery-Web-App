import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { Error } from 'next/error';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function ArtworkUI() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState();

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  // If page state is greater than 1, decrease by 1
  const previousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Increases page state by 1, if page is less than artworkList length
  const nextPage = () => {
    if (page < artworkList.length) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      let results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
    }    

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList != null || artworkList != undefined) {
    return (
      <>
      
        {artworkList.length === 0 ? (
          <>
            <br/>
              <Row className="gy-4">
              <Card>
                <Card.Body>
                  <h4>Nothing Here</h4>
                  Try searching for something else.
                </Card.Body>
              </Card>
            </Row>
          </>
        ) : (
          <>
          <br/><br/>
            <Row className="gy-4">
              {artworkList[page - 1].map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))}
            </Row>
          </>
        )}

        {artworkList.length > 0 ? (
          <>
            <br/>
            <Row className="gy-4">
              <Col>
                <Pagination>
                  <Pagination.Prev onClick={previousPage} />
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </Col>
            </Row>
          </>
        ) : null }
      </>
    );
  }
}
