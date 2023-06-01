import axios from "axios";

// api 테스트용 페이지
// 허락없이 추가한 것에 심심한 양해의 말씀을..
function Test() {
  const SERVER_URL = "cluver.kr:8000";

  const login = async () => {
    const response = await axios({
      method: "post",
      url: `http://${SERVER_URL}/auth/test`,
      withCredentials: true,
    });
    console.log(response);
  };

  const authorization = async () => {
    const response = await axios({
      method: "get",
      url: `http://${SERVER_URL}/auth/check`,
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
