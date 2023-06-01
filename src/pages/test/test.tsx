import axios from "axios";
import { BASE_URL } from "../../util/api";

// api 테스트용 페이지
// 허락없이 추가한 것에 심심한 양해의 말씀을..
function Test() {
  const login = async () => {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/auth/signin`,
      data: {
        id: "root1",
        password: "1234",
      },
      withCredentials: true,
    });
    console.log(response);
  };

  const authorization = async () => {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/auth/check`,
      withCredentials: true,
    });
    console.log(response);
  };

  return (
    <>
      <button onClick={login}>accessToken 발급</button>
      <button onClick={authorization}>인증 체크</button>
    </>
  );
}

export default Test;
