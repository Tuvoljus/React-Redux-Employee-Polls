import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { createSelector } from 'reselect';

const authedUserSelector = (state) => state.authedUser;

const memoizedAuthedUserSelector = createSelector(
  [authedUserSelector],
  (authedUser) => authedUser
);

function PrivateRoute({ children }) {
  const authedUser = useSelector(memoizedAuthedUserSelector);
  return Object.keys(authedUser).length !== 0 &&
    authedUser.constructor === Object ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
