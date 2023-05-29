/* --save --legacy-peer-deps */
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import logo from "../../assets/images/logo.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL, searchName } from "../../util/api";
import * as S from "./Main.styled";
import { useRecoilState, useSetRecoilState } from "recoil";
import { clubID } from "../../util/atoms";

function Main() {
  const search = useRef<any>(null);
  const res = useRef<any>(null);
  const [word, setWord] = useState("");
  const [a, setArr] = useState([] as any);
  //const [resAPI, getRes] = useState([]);
  var resAPI = [] as any;
  const [code, setCode] = useState("");
  const box = useRef<any>([]);
  const priv = useRef<any>(null);
  const [key, setKey] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    if (word === "") {
      search.current.style.border = "1px solid white";
      res.current.style.opacity = "0";
    } else {
      searchClub();
      search.current.style.border = "1px solid transparent";
      res.current.style.opacity = "1";
    }
  }, [word]);

  /* function Api() {
    const url = "http://172.30.1.58:8000/club";
    axios.get(url).then(function (response) {
      get(response.data);
      console.log(resAPI);
    });
  } */

  const Api = async () => {
    try {
      const url = "http://172.20.10.4:8000/club";
      const response = await axios.get(url);
      //getRes(response.data);
      //console.log(response.data);
      resAPI = response.data;
      //console.log(resAPI);
    } catch (err) {
      console.log(err);
    }
  };

  const searchClub = async () => {
    const response = await searchName(word);
    setArr(response);
    //console.log(response);
  };

  useEffect(() => {
    if (code === "") {
      box.current[0].style.border = "1px solid white";
    } else {
      box.current[0].style.border = "1px solid transparent";
    }
  }, [code]);

  return (
    <>
      <S.Wrap>
        <S.Bg>
          <Navbar />
          <S.Logo src={logo} onClick={Api} />
          <S.Text>활동 중인 동아리를 찾아보세요</S.Text>
          <S.SearchBox ref={search}>
            <S.Search
              type="text"
              placeholder="SEARCH"
              onChange={(e) => {
                setWord(e.target.value);
              }}
            ></S.Search>
            <S.SearchIcon>
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "22px",
                  fontVariationSettings: "'wght' 200",
                }}
              >
                search
              </span>
            </S.SearchIcon>
          </S.SearchBox>
          <S.ResDiv ref={res}>
            <ul>
              {a &&
                a?.map((e: any) => {
                  let lock = "lock";
                  if (e.status === "PUBLIC") {
                    lock = "lock_open_right";
                  }
                  return (
                    <li key={e.id}>
                      <S.Res
                        onClick={() => {
                          if (e.status === "PUBLIC") {
                            window.location.href = `/attendance/${e.id}`;
                          } else {
                            priv.current.style.opacity = "1";
                            priv.current.style.zIndex = "10";
                            setKey(e.club_code);
                            setId(e.id);
                          }
                        }}
                      >
                        <S.ResImg>♣</S.ResImg>
                        <S.ResText>
                          <S.ResName>{e.name}</S.ResName>
                          <S.ResAbout>{e.description}</S.ResAbout>
                        </S.ResText>
                        <S.ResLock>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "15px",
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            {lock}
                          </span>
                        </S.ResLock>
                      </S.Res>
                    </li>
                  );
                })}
            </ul>
          </S.ResDiv>
          <S.InputDiv ref={priv}>
            <S.InputText>동아리 코드를 입력해주세요.</S.InputText>
            <S.InputBox
              ref={(e) => {
                box.current[0] = e;
              }}
            >
              <S.Input
                type="text"
                placeholder="동아리 코드"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></S.Input>
            </S.InputBox>
            <S.Btn
              ref={(e) => {
                box.current[1] = e;
              }}
              onMouseEnter={() => {
                if (code !== "") {
                  box.current[1].style.background =
                    "linear-gradient(135deg, #89ec84 0%, #abc0e4 55%, #abc0e4 83%, #c7d5ed 100%)";
                } else {
                  box.current[1].style.background = "white";
                }
              }}
              onMouseLeave={() => {
                box.current[1].style.background = "white";
              }}
              onClick={() => {
                console.log(code);
                if (code === key) {
                  window.location.href = `/attendance/${id}`;
                } else {
                  alert("올바르지 않은 코드입니다. 다시 입력해주세요.");
                  setTimeout(() => {
                    priv.current.style.opacity = "0";
                    priv.current.style.zIndex = "-1";
                  }, 200);
                }
              }}
            >
              코드 확인
            </S.Btn>
          </S.InputDiv>
          <Bottombar first={false} second={true} third={false} />
        </S.Bg>
      </S.Wrap>
    </>
  );
}

export default Main;
