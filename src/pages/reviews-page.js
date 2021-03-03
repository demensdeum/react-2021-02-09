import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PlainReviews from '../components/plainReviews';

import Loader from '../components/loader';
import {
  restaurantsListSelector,
  restaurantsLoadedSelector,
  restaurantsLoadingSelector,
} from '../redux/selectors';
import { loadRestaurants } from '../redux/actions';

function ReviewsPage({
  loading,
  loaded,
  restaurants,
  loadRestaurants,
  match,
}) {
  useEffect(() => {
    if (!loading && !loaded) loadRestaurants();
  }, [loading, loaded, loadRestaurants]);

  if (loading) return <Loader />;
  if (!loaded) return 'No data :(';

  if (match.isExact) {
    return (
      <div>
        <div>select restaurant:</div>
        {restaurants.map(({ id, name }) => (
          <p key={id}>
            <Link to={`/reviews/${id}`}>{name}</Link>{' '}
          </p>
        ))}
      </div>
    );
  }

  return <Route path="/reviews/:restId" component={PlainReviews} />;
}

export default connect(
  createStructuredSelector({
    restaurants: restaurantsListSelector,
    loading: restaurantsLoadingSelector,
    loaded: restaurantsLoadedSelector,
  }),
  { loadRestaurants }
)(ReviewsPage);
