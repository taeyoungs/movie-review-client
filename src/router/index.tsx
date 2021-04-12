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
          <Route exact path="/movie" component={Movies} />
          <Route exact path="/movie/:id" component={Detail} />
          <Route exact path="/tv" component={Shows} />
          <Route exact path="/tv/:id" component={Detail} />
          <Route exact path="/review" component={Reviews} />
          <Route exact path="/registration" component={Registration} />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default RouterContainer;
