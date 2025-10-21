import axios from 'axios';

export default async function login(username: string, password: string) {
  const response: {
    data: {
      token: string;
      authenticated: boolean;
    };
    success: boolean;
    type: any;
  } = (
    await axios.post(
      'http://localhost:3000/user/auth/token',
      { username, password },
      {
        withCredentials: true,
      },
    )
  ).data;
  if (response.success && response.data.token) {
    sessionStorage.setItem('access_token', response.data.token);

    const user: any = (
      await axios.get('http://localhost:3000/user/information/myInfo',
        {
            headers: {
                Authorization: `Bearer ${response.data.token}`
            }
        }
      )
    ).data;

  } else {
    throw new Error("Đăng nhập thất bại")
  }
  return response;
}
