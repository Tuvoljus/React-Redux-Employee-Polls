import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import NavBar from './components/NavBar';
import NewQuestion from './components/NewQuestion';
import QuestionPoll from './components/QuestionPoll';
import VoteQuestion from './components/VoteQuestion';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard';
import NotFound from './components/NotFound';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <>
      <Row>
        <NavBar />
      </Row>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <QuestionPoll />
            </PrivateRoute>
          }
        />
        <Route
          path="/question/:id"
          element={
            <PrivateRoute>
              <VoteQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <PrivateRoute>
              <NewQuestion />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
