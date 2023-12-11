import Cookies from 'js-cookie';
import { auth } from '../services/auth';
import { errorMessage } from '../../components/messages.api';
import { router } from '../../main';

const authMiddleware = (store) => (next) => async (action) => {
  var response = await next(action);
  
  if (
    (response.payload?.status == 401 || response.payload?.state == 403) &&
    Cookies.get('refreshToken')
  ) {
    const refreshToken = Cookies.get('refreshToken');
    Cookies.remove('refreshToken');
    store.dispatch(auth.endpoints.refresh.initiate(refreshToken));

    response = await next(action);
    if (
      (response.payload?.status == 401 || response.payload?.state == 403) &&
      !window.location.pathname.startsWith('/login')
    ) {
      errorMessage({ content: 'Session Timeout.. login again' });
      router.navigate('/login', { replace: true });
    }
  }

  return response;
};

export default authMiddleware;
