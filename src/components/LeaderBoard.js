import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const LeaderBoard = () => {
  const combinedUsers = useSelector((state) => {
    const { authedUser, users } = state;
    const filterOutAuthedUser = Object.values(users).filter(
      (user) => user.id !== authedUser.id
    );
    return [...filterOutAuthedUser, authedUser];
  });

  // Sort the combinedUsers array in descending order based on the combined length of answers and questions
  const sortedUsers = [...combinedUsers].sort(
    (userA, userB) =>
      Object.keys(userB.answers).length +
      userB.questions.length -
      (Object.keys(userA.answers).length + userA.questions.length)
  );

  return (
    <Container>
      <Row>
        <h1>Leader Board</h1>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default LeaderBoard;
