import Row from 'react-bootstrap/esm/Row';
import NavBar from './components/NavBar';
import NewQuestion from './components/NewQuestion';
import QuestionPool from './components/QuestionPoll';
import { Route, Routes } from 'react-router-dom';
import VoteQuestion from './components/VoteQuestion';
import Login from './components/Login';

function App() {
  return (
    <>
      <Row>
        <NavBar />
      </Row>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<QuestionPool />} />
        <Route path="/votequestion/:id" exact element={<VoteQuestion />} />
        <Route path="/new" element={<NewQuestion />} />
      </Routes>
    </>
  );
}

export default App;
