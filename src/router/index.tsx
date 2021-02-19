import Header from 'products/Header';
import Loading from 'products/Loading';
import React, { lazy, Suspense } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Movies = lazy(() => import('pages/Movies'));
const Shows = lazy(() => import('pages/Shows'));
const Reviews = lazy(() => import('pages/Reviews'));

const RouterContainer = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
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
