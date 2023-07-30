import { React } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { useRouter } from 'next/router';
import { removeFromHistory } from '@/lib/userData';

export default function SearchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  if(!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // stop the event from triggering other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  return (
    <>
      <Container>
        {parsedHistory.length === 0 ? (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try searching for some artwork.
            </Card.Body>
          </Card>
        ) : (
          <>
            <ListGroup>
              {parsedHistory.map((historyItem, index) => ( // Fix here
                <ListGroup.Item
                  onClick={(e) => historyClicked(e, index)}
                  className={styles.historyListItem}
                  key={index}
                >
                  {Object.keys(historyItem).map((key) => (
                    <span key={key}>
                      {key}: <strong>{historyItem[key]}</strong>&nbsp;
                    </span>
                  ))}
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={(e) => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Container>
    </>
  );
}
