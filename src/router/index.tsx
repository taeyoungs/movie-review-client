import React, { lazy, Suspense } from 'react';
import Header from 'components/organisms/Header';
import Loading from 'products/Loading';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Works = lazy(() => import('pages/Works'));
// const Shows = lazy(() => import('pages/Shows'));
const Detail = lazy(() => import('pages/Detail'));
const Review = lazy(() => import('pages/Review'));
const Reviews = lazy(() => import('pages/Reviews'));
const Person = lazy(() => import('pages/Person'));
const Search = lazy(() => import('pages/Search'));
const SearchDetail = lazy(() => import('pages/SearchDetail'));
const Registration = lazy(() => import('pages/Registration'));

const RouterContainer: React.FunctionComponent = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie" component={Works} />
          <Route path="/movie/:id" component={Detail} />
          <Route exact path="/tv" component={Works} />
          <Route path="/tv/:id" component={Detail} />
          <Route exact path="/review" component={Reviews} />
          <Route path="/review/:id" component={Review} />
          <Route path="/person/:id" component={Person} />
          <Route exact path="/search" component={Search} />
          <Route path="/search/:mediaType" component={SearchDetail} />
          <Route exact path="/registration" component={Registration} />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RouterContainer;
