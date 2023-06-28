import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import NavBar from './components/NavBar';
import NewQuestion from './components/NewQuestion';
import QuestionPool from './components/QuestionPoll';
import VoteQuestion from './components/VoteQuestion';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard';
import NotFound from './components/NotFound';

function PrivateRoute({ children }) {
  const authedUser = useSelector((state) => state.authedUser);
  console.log(authedUser, 'AUTH on APP JS PrivateRoute');
  return Object.keys(authedUser).length !== 0 &&
    authedUser.constructor === Object ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

const App = () => {
  window.addEventListener('beforeunload', () => {
    // Remove the desired data from local storage
    localStorage.removeItem('authedUser');
  });

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <PrivateRoute>
        <Row>
          <NavBar />
        </Row>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" exact element={<QuestionPool />} />
          <Route path="/question/:id" element={<VoteQuestion />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/add" element={<NewQuestion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PrivateRoute>
    </>
  );
};

export default App;
