import Cookies from 'js-cookie';
import { auth } from '../services/auth';
import { errorMessage } from '../../components/messages.api';

const authMiddleware = (store) => (next) => async (action) => {
  var response = await next(action);

  if (
    response.payload?.status == 401 ||
    (response.payload?.state == 403 && Cookies.get('refreshToken'))
  ) {
    const refreshToken = Cookies.get('refreshToken');
    Cookies.remove('refreshToken');
    store.dispatch(auth.endpoints.refresh.initiate(refreshToken));
    response = next(action);

    if (response.payload?.status == 401 || response.payload?.state == 403) {
      errorMessage({ content: 'Session Timeout.. login again' });
    }
  }

  return response;
};

export default authMiddleware;
