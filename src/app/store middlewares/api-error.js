import Cookies from 'js-cookie';
import { errorMessage } from '../../components/messages.api';
import { router } from '../../main';

const apiError = (store) => (next) => async (action) => {
  const response = await next(action);
  const { status, data } = response.payload || {};

  if (status === 401 || status === 403) {
    if (!window.location.pathname.startsWith('/login')) {
      router.navigate('/login', { replace: true });
    } else errorMessage({ content: data?.message });
  } else if (status > 299) {
    errorMessage({ content: data?.message });
  }

  return response;
};

export default apiError;
