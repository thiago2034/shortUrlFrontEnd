import axios from 'axios';

class LoginServices {

  public async login(username:string, password:string) {

    const body = {
      'username': username,
      'password': password
    };

    const url = 'http://localhost:5000/login/autenticate';
    const request = await axios.post(url,body);
    return request
  }
}

export default LoginServices;
