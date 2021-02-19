import React, { lazy, Suspense } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Movies = lazy(() => import('pages/Movies'));
const Shows = lazy(() => import('pages/Shows'));
const Reviews = lazy(() => import('pages/Reviews'));

const RouterContainer = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/shows">Shows</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>⏰</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/shows" component={Shows} />
          <Route exact path="/reviews" component={Reviews} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RouterContainer;
