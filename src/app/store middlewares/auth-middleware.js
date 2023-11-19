import Cookies from 'js-cookie';
import { auth } from '../services/auth';

const authMiddleware = (store) => (next) => async (action) => {
  var response = next(action);

  if (response.payload?.status == 403) {
    store.dispatch(auth.endpoints.refresh.initiate());
    response = next(action);
  }

  if (response.payload?.status == 401 || response.payload?.state == 403) {
    Cookies.remove('accessToken');
    //TODO remove user from state & navigate to login
  }

  return response;
};

export default authMiddleware;
