import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { formatDate } from '../utils/helpers';

const QuestionCard = ({ question }) => {
  const users = useSelector((state) => state.users);
  const authorPicture = users[question.author].avatarURL;

  const currentDate = new Date();
  const questionDate = new Date(question.timestamp);
  const timeDiff = Math.abs(currentDate - questionDate);
  let timeAgo;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = 30 * millisecondsPerDay;
  const millisecondsPerYear = 365 * millisecondsPerDay;

  if (timeDiff < millisecondsPerDay) {
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    timeAgo = `${hoursDiff} hours ago`;
  } else if (timeDiff < 7 * millisecondsPerDay) {
    const daysDiff = Math.floor(timeDiff / millisecondsPerDay);
    timeAgo = `${daysDiff} days ago`;
  } else if (timeDiff < millisecondsPerMonth) {
    const monthsDiff = Math.floor(timeDiff / millisecondsPerMonth);
    timeAgo = `${monthsDiff} months ago`;
  } else if (timeDiff < millisecondsPerYear) {
    const yearsDiff = Math.floor(timeDiff / millisecondsPerYear);
    timeAgo = `${yearsDiff} years ago`;
  } else {
    timeAgo = `more than ${Math.floor(
      timeDiff / millisecondsPerYear
    )} years ago`;
  }

  return (
    <Card key={question.id} style={{ width: '15rem' }} className="text-center">
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
