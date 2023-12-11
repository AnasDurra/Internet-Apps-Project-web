import Cookies from 'js-cookie';
import { errorMessage } from '../../components/messages.api';
import { router } from '../../main';

const apiError = (store) => (next) => async (action) => {
  var response = await next(action);

  if (response.payload?.status === 401 || response.payload?.status === 403) {
    if (!window.location.pathname.startsWith('/login')) {
      router.navigate('/login', { replace: true });
    } else {
      errorMessage({ content: response.payload.data?.message });
    }
  } else if (response.payload?.status > 299) {
    errorMessage({ content: response.payload.data?.message });
  }

  return response;
};

export default apiError;
