import Cookies from 'js-cookie';
import { errorMessage } from '../../components/messages.api';

const apiError = (store) => (next) => async (action) => {
  var response = await next(action);

  if (response.payload?.status > 299) {
    errorMessage({ content: response.payload.data?.message });
  }

  return response;
};

export default apiError;
