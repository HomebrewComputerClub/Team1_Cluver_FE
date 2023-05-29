import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL, postRead, postWrite } from "../../util/api";
import * as S from "./Anonymous.styled";
import { ScrollRestoration, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";

function Anonymous() {
  const params = useParams();
  let resAPI = [] as any;
  const [clubName, setClubName] = useState("");
  //const [a, setArr] = useState(arr);
  const [a, setArr] = useState([] as any);
  const talks = useRef<any>(null);
  const [n, setN] = useState(0);
  const [content, setC] = useState("");
  const [ct, upCt] = useState(0);

  const scrollToBottom = () => {
    talks.current.scrollTop = talks.current.scrollHeight;
  };

  const Api = async () => {
    try {
      const url = BASE_URL + "/club/" + params.clubID;
      const response = await axios.get(url);
      resAPI = response.data;
      console.log(resAPI);
      setClubName(resAPI.name);
      setN(resAPI.posts.length);
    } catch (err) {
      console.log(err);
    }
  };

  const read = async () => {
    const response = await postRead(Number(params.clubID));
    setArr(
      response.sort(function (a: any, b: any) {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      })
    );
    setN(response.length);
  };

  const write = async () => {
    const response = await postWrite(Number(params.clubID), content);
    console.log(response);
    upCt(ct + 1);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    write();
    setC("");
    setTimeout(() => {
      upCt(ct + 1);
    }, 100);
  };

  useEffect(() => {
    Api();
    setClubName(resAPI.name);
    read();
    scrollToBottom();
  }, [ct]);

  useEffect(() => {
    scrollToBottom();
  }, [a]);

  return (
    <>
      <S.Wrap>
        <S.Bg>
          <Navbar />
          <S.TalkDiv>
            <S.Top>
              <S.Left>
                <span className="material-symbols-outlined">chat_bubble</span>
                <span>{n}</span>
              </S.Left>
              <S.ClubName>{clubName}</S.ClubName>
              <S.Right
                onClick={() => {
                  upCt(ct + 1);
                }}
              >
                <span className="material-symbols-outlined">refresh</span>
              </S.Right>
            </S.Top>
            <S.ListDiv ref={talks}>
              <ul style={{ width: "100%" }}>
                {a &&
                  a?.map((e: any) => {
                    return (
                      <li key={e.id} style={{ display: "flex" }}>
                        <div style={{ height: "fit-content" }}>
                          <S.ChatDiv>
                            <S.Chat>{e.content}</S.Chat>
                          </S.ChatDiv>
                          <S.ChatDate>
                            {moment(`${e.date}`).fromNow()}
                          </S.ChatDate>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </S.ListDiv>
            <form onSubmit={onSubmit}>
              <S.InputDiv>
                <S.Input
                  value={content}
                  placeholder="익명 메시지를 작성하세요."
                  onChange={(e) => {
                    setC(e.target.value);
                  }}
                ></S.Input>
                <S.Btn type="submit">
                  <span className="material-symbols-outlined">send</span>
                </S.Btn>
              </S.InputDiv>
            </form>
          </S.TalkDiv>
          <Bottombar first={true} second={false} third={false} />
        </S.Bg>
      </S.Wrap>
    </>
  );
}

export default Anonymous;
