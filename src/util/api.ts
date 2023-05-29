import axios from "axios";

export const BASE_URL = `http://cluver.kr:8000`;

export async function loginValidate(id: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, {
      id: id,
      password: password,
    });
    console.log(response);
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}
export async function getClubs(token: string | null) {
  try {
    const response = await axios.get(`${BASE_URL}/club/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e: any) {
    console.log("error: ", e);
    return false;
  }
}

export async function tokenValidate(token: string | null) {
  try {
    const response = await axios.get(`${BASE_URL}/auth/check`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("manager");
      window.location.reload();
    }
    return response.data;
  } catch (e: any) {
    console.log("error: ", e);
    return false;
  }
}

export async function createCheckCode(
  month: number,
  day: number,
  clubId: number
) {
  try {
    const response = await axios.post(
      `${BASE_URL}/club-attendance/startcheck`,
      {
        date: month + "월" + day + "일",
        clubId: clubId,
        activity: "정기회합",
      }
    );
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function getCheckCode(month: number, day: number, clubId: number) {
  try {
    const response = await axios.post(`${BASE_URL}/club-attendance`, {
      date: month + "월" + day + "일",
      clubId: clubId,
    });
    console.log(response);
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function endCheck(month: number, day: number, clubId: number) {
  try {
    const response = await axios.post(`${BASE_URL}/club-attendance/end`, {
      date: month + "월" + day + "일",
      clubId: clubId,
    });
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function createClub(
  name: string,
  desc: string,
  isPrivate: boolean,
  code: string,
  img: string,
  token: string | null
) {
  try {
    const response = await axios.post(
      `${BASE_URL}/club`,
      {
        name: name,
        img: img,
        description: desc,
        is_public: !isPrivate,
        club_code: code,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function editClub(
  id: number,
  name: string,
  desc: string,
  isPrivate: boolean,
  code: string,
  img: string,
  token: string | null
) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/club/${id}`,
      {
        name: name,
        img: img,
        description: desc,
        is_public: !isPrivate,
        club_code: code,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function deleteClub(id: number, token: string | null) {
  try {
    const response = await axios.delete(`${BASE_URL}/club/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function doCheck(
  month: string,
  day: string,
  clubId: number,
  username: string,
  usercode: string
) {
  try {
    const response = await axios.post(`${BASE_URL}/club-attendance/docheck`, {
      date: month + "월" + day + "일",
      clubId: clubId,
      username: username,
      usercode: usercode,
    });
    return response.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function searchName(name: string) {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { name: name },
    });
    return response.data;
  } catch (e: any) {
    console.log("error: ", e);
    return false;
  }
}

export async function codeCheck(
  month: string,
  day: string,
  clubId: number,
  code: string
) {
  try {
    const response = await axios.post(`${BASE_URL}/club-attendance/codecheck`, {
      date: month + "월" + day + "일",
      clubId: clubId,
      code: code,
    });
    return response.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function getClubAttendance(
  month: string,
  day: string,
  clubId: number
) {
  try {
    const response = await axios.post(`${BASE_URL}/club-attendance`, {
      date: month + "월" + day + "일",
      clubId: clubId,
    });
    return response.data;
  } catch (e: any) {
    console.log("error: ", e);
    return false;
  }
}

export async function getCalendar(month: string, day: string, clubId: number) {
  try {
    const response = await axios.post(`${BASE_URL}/club-attendance/calendar`, {
      date: month + "월" + day + "일",
      clubId: clubId,
    });
    return response.data;
  } catch (e: any) {
    console.log("error: ", e);
    return false;
  }
}

export async function postRead(clubId: number) {
  try {
    const response = await axios.post(`${BASE_URL}/post/read`, {
      clubId: clubId,
    });
    return response.data;
  } catch (e: any) {
    console.log("error: ", e);
    return false;
  }
}

export async function postWrite(clubId: number, content: string) {
  try {
    const response = await axios.post(`${BASE_URL}/post/write`, {
      clubId: clubId,
      content: content,
    });
    return response.data;
  } catch (e: any) {
    console.log("error: ", e);
    return false;
  }
}

export async function checkEmailDuplicate(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/email/duplicate-check`, {
      email: email,
    });
    console.log(response);
    return response.data.isExisting;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function sendCheckEmail(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/email/send`, {
      email: email,
    });
    console.log(response);
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function emailValidation(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/email/check`, {
      email: email,
    });
    console.log(response);
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function signUp(
  id: string,
  email: string,
  name: string,
  password: string
) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      id: id,
      email: email,
      name: name,
      password: password,
    });
    console.log(response);
    return response;
  } catch (e: any) {
    return e.response.data.message;
  }
}

export async function restartCheckCode(
  month: number,
  day: number,
  clubId: number
) {
  try {
    const response = await axios.post(`${BASE_URL}/club-attendance/restart`, {
      date: month + "월" + day + "일",
      clubId: clubId,
      activity: "정기회합",
    });
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}
