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
  console.log(authorPicture, 'DER AUTOR');

  // const authorPicture =  question.filter(element => element.author === )

  console.log(question, 'QUESTION in QUERSTION CARD');
  return (
    <Card key={question.id} style={{ width: '18rem' }} className="text-center">
      <Card.Img
        data-testid="author-picture"
        variant="top"
        src={`${authorPicture}`}
      />
      <Card.Body>
        {/* <Card.Title>{question.optionOne.text}</Card.Title> */}
        <p>by</p>
        <Card.Title>{question.author}</Card.Title>
        <Card.Text>{formatDate(question.timestamp)}</Card.Text>
      </Card.Body>
      <Card.Body>
        {/* <Card.Link href="#">Go To Question</Card.Link> */}
        {/* <Link to={'votequestion/' + question.id}>Go To Question</Link> */}
        <Link
          to={{
            pathname: 'question/' + question.id,
            state: { questionId: question.id },
          }}
        >
          Go To Question
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

export default QuestionCard;
