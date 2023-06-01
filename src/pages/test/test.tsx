import axios from "axios";

// api 테스트용 페이지
// 허락없이 추가한 것에 심심한 양해의 말씀을..
function Test() {
  const test_api = async () => {
    const SERVER_URL = "cluver.kr:8000";

    const response = await axios({
      method: "post",
      url: `http://${SERVER_URL}/auth/test`,
      withCredentials: true,
    });
    console.log(response);
  };

  return (
    <>
      <button onClick={test_api}>api 테스트</button>
    </>
  );
}

export default Test;
