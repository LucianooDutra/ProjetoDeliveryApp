import { requestAuthorization } from '../services/requests';

const errors = {
  NOTLOG: { authorized: false, code: 'NOTLOG', message: 'Usuário não logado.' },
  NOTVAL: { authorized: false, code: 'NOTVAL', message: 'Token inválido.' },
};

const AuthorizationCheck = async () => {
  const credentials = JSON.parse(localStorage.getItem('user'));

  if (!credentials) {
    return errors.NOTLOG;
  }

  try {
    const request = await requestAuthorization('/auth', { token: credentials.token });

    return request;
  } catch (err) {
    return { ...errors.NOTVAL, APIMessage: err.message };
  }
};

export default AuthorizationCheck;
