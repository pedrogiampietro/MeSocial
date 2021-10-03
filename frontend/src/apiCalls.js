import axios from 'axios';

export async function loginCall(userCredential, dispatch) {
  dispatch({ type: 'LOGIN_START' });

  try {
    const res = await axios.post('auth/signin', userCredential);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
}
