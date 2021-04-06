import React, { lazy, Suspense } from 'react';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import Loading from 'products/Loading';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Movies = lazy(() => import('pages/Movies'));
const Shows = lazy(() => import('pages/Shows'));
const Detail = lazy(() => import('pages/Detail'));
const Reviews = lazy(() => import('pages/Reviews'));
const Registration = lazy(() => import('pages/Registration'));

const RouterContainer: React.FunctionComponent = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/movies/:id" component={Detail} />
          <Route exact path="/shows" component={Shows} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/registration" component={Registration} />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default RouterContainer;
