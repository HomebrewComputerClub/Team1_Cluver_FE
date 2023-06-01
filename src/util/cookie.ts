const getCookie = (name: string) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
};

// 쿠키에 저장하는 함수
const setCookie = (name: string, value: string) => {
  let sec = 24 * 60 * 60 * 1000; //1일
  document.cookie = `${name}=${value}; max-age=${sec}; path=/`;
};

// 만료일을 예전으로 설정해 쿠키를 삭제
const deleteCookie = (name: string) => {
  document.cookie = name + "=; max-age=0";
};

export { getCookie, setCookie, deleteCookie };
