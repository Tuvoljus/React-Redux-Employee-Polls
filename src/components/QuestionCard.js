import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import { formatDate } from '../utils/helpers';

const QuestionCard = ({ question }) => {
  const users = useSelector((state) => state.users);
  const authorPicture = users[question.author].avatarURL;

  const currentDate = new Date();
  const questionDate = new Date(question.timestamp);
  const timeDiff = Math.abs(currentDate - questionDate);
  let timeAgo;
  if (timeDiff < 24 * 60 * 60 * 1000) {
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    timeAgo = `${hoursDiff} hours ago`;
  } else {
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    timeAgo = `${daysDiff} days ago`;
  }

  return (
    <Card key={question.id} style={{ width: '18rem' }} className="text-center">
      <Card.Img
        data-testid="author-picture"
        variant="top"
        src={`${authorPicture}`}
      />
      <Card.Body>
        <p>by</p>
        <Card.Title>{question.author}</Card.Title>
        <Card.Text>{formatDate(question.timestamp)}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Link
          to={{
            pathname: 'question/' + question.id,
            state: { questionId: question.id },
          }}
        >
          Go To Question
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">{timeAgo}</Card.Footer>
    </Card>
  );
};

export default QuestionCard;
