import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tokenValidate } from "../util/api";
import { useRecoilValue } from "recoil";
import { clubID } from "../util/atoms";
import cluver from "../assets/images/cluver.png";

const Container = styled.div`
  width: 100%;
  height: 65px;
  position: absolute;
  top: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  vertical-align: middle;
`;

const Cluver = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 23px;
  z-index: 22;
  cursor: pointer;
  width: 125px;
`;

const Leftdiv = styled.div`
  width: fit-content;
  position: absolute;
  font-size: 25px;
  //font-family: ${(props) => props.theme.titleFont};
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  left: 25px;
  margin-top: 15px;
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  z-index: 22;
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 5px;
`;

const MenuDiv = styled.div`
  width: fit-content;
  position: absolute;
  font-size: 25px;
  font-family: ${(props) => props.theme.textFont};
  font-weight: bold;
  right: 25px;
  margin-top: 17.5px;
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  cursor: pointer;
  z-index: 22;
`;

const DropDiv = styled.div`
  width: 100%;
  height: fit-content;
  height: calc(var(--vh, 1vh) * 100);
  position: absolute;
  top: 0;
  background: ${(props) => props.theme.boxColor};
  z-index: 5;
  padding-top: 65px;
  padding-bottom: 5px;
  opacity: 0;
`;

const DropMenu = styled.div`
  width: 100%;
  height: 35px;
  color: white;
  font-family: ${(props) => props.theme.textFont};
  font-size: 15px;
  text-align: center;
  line-height: 31px;
`;

const BtnDiv = styled.div`
  width: 60%;
  height: fit-content;
  margin: auto;
  display: flex;
  //flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: calc(var(--vh, 1vh) * 27);
  /* border: 1px solid white;
  padding: 7px 0;
  border-radius: 10px; */
`;

const Btn = styled.div`
  text-align: center;
  color: white;
  width: 130px;
  margin: 9px;
  border-radius: 10px;
  font-size: 15px;
  border: 1px solid white;
  padding: 11px 0px;
  cursor: pointer;
  font-family: ${(props) => props.theme.textFont};
  :hover {
    color: #1c1f2a;
    background: white;
  }
  transition: 0.2s;
  letter-spacing: 1px;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  padding-left: 1px;
`;

const Icon = styled.div`
  font-size: 40px;
  width: 100%;
  height: 70%;
  //border: 1px solid green;
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-left: 3px;
  padding-bottom: 5px;
  margin-bottom: 2px;
`;

function Navbar() {
  const id = useRecoilValue(clubID);
  const navigate = useNavigate();
  const [n, setN] = useState(1);
  const menu = useRef<any>();
  const [text, setText] = useState("menu");
  const clover = useRef<any>();

  const Linkto = async () => {
    setN(n + 1);
    const response = await tokenValidate(localStorage.getItem("token"));
    //console.log(response);
    if (response) {
      navigate("/checkattendance");
    } else {
      if (id > 0) {
        navigate(`/attendance/${id}`);
      } else {
        navigate("/");
        alert("동아리를 먼저 검색해주세요.");
      }
    }
  };

  const Linkto2 = async () => {
    setN(n + 1);
    const response = await tokenValidate(localStorage.getItem("token"));
    //console.log(response);
    if (response) {
      navigate("/moveto");
    } else {
      if (id > 0) {
        navigate(`/anonymous/${id}`);
      } else {
        navigate("/");
        alert("동아리를 먼저 검색해주세요.");
      }
    }
  };

  useEffect(() => {
    if (n % 2 === 1) {
      clover.current.style.opacity = "0";
      menu.current.style.opacity = "0";
      menu.current.style.zIndex = "-1";
      setText("menu");
      setTimeout(() => {
        clover.current.style.opacity = "1";
      }, 15);
    } else {
      clover.current.style.opacity = "0";
      menu.current.style.opacity = "1";
      menu.current.style.zIndex = "20";
      setText("close");
      setTimeout(() => {
        clover.current.style.opacity = "1";
      }, 15);
    }
  }, [n]);

  return (
    <>
      <Container>
        <Leftdiv>♣</Leftdiv>
        <Cluver
          src={cluver}
          alt=""
          onClick={() => {
            //setN(n + 1);
            navigate("/");
          }}
        ></Cluver>
        <MenuDiv
          onClick={() => {
            setN(n + 1);
          }}
        >
          <span
            ref={clover}
            className="material-symbols-outlined"
            style={{
              fontSize: "35px",
              fontVariationSettings: "'wght' 300",
            }}
          >
            {text}
          </span>
        </MenuDiv>
        <DropDiv ref={menu}>
          {/* <DropMenu
            onClick={() => {
              setN(1);
            }}
          >
            <Link to="/">
              <span style={{ cursor: "pointer" }}>서비스 이용 가이드</span>
            </Link>
          </DropMenu> */}
          {/* <DropMenu onClick={Linkto}>
            <span style={{ cursor: "pointer" }}>출석 체크</span>
          </DropMenu>
          <DropMenu onClick={Linkto2}>
            <span style={{ cursor: "pointer" }}>대나무숲</span>
          </DropMenu> */}

          {!!localStorage.getItem("token") ? (
            <>
              <BtnDiv>
                <Btn onClick={Linkto}>
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "39px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      how_to_reg
                    </span>
                  </Icon>
                  출석체크
                </Btn>
                <Btn onClick={Linkto2}>
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "37px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      chat
                    </span>
                  </Icon>
                  대나무숲
                </Btn>
                <Btn
                  onClick={() => {
                    setN(n + 1);
                    navigate("/admin");
                  }}
                >
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "39px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      settings
                    </span>
                  </Icon>
                  동아리관리
                </Btn>
                <Btn
                  onClick={() => {
                    setN(n + 1);
                    localStorage.removeItem("token");
                    localStorage.removeItem("manager");
                    navigate("/login");
                  }}
                >
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "37px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      logout
                    </span>
                  </Icon>
                  로그아웃
                </Btn>
              </BtnDiv>
              {/* <DropMenu
                onClick={() => {
                  setN(1);
                }}
              >
                <Link to="/admin">
                  <span style={{ cursor: "pointer" }}>동아리 관리</span>
                </Link>
              </DropMenu>
              <DropMenu
                onClick={() => {
                  setN(1);
                  localStorage.removeItem("token");
                  localStorage.removeItem("manager");
                }}
              >
                <Link to="/login">
                  <span style={{ cursor: "pointer" }}>로그아웃</span>
                </Link>
              </DropMenu> */}
            </>
          ) : (
            <>
              <BtnDiv>
                <Btn onClick={Linkto}>
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "39px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      how_to_reg
                    </span>
                  </Icon>
                  출석체크
                </Btn>
                <Btn onClick={Linkto2}>
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "37px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      chat
                    </span>
                  </Icon>
                  대나무숲
                </Btn>
                <Btn
                  onClick={() => {
                    setN(n + 1);
                    navigate("/login");
                  }}
                >
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "39px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      account_circle
                    </span>
                  </Icon>
                  로그인
                </Btn>
                <Btn
                  onClick={() => {
                    setN(n + 1);
                    navigate("/signup");
                  }}
                >
                  <Icon>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "37px",
                        fontVariationSettings: "'wght' 300",
                      }}
                    >
                      person_add
                    </span>
                  </Icon>
                  회원가입
                </Btn>
              </BtnDiv>
              {/* <DropMenu
                onClick={() => {
                  setN(1);
                }}
              >
                <Link to="/login">
                  <span style={{ cursor: "pointer" }}>로그인</span>
                </Link>
              </DropMenu>
              <DropMenu
                onClick={() => {
                  setN(1);
                }}
              >
                <Link to="/signup">
                  <span style={{ cursor: "pointer" }}>회원가입</span>
                </Link>
              </DropMenu> */}
            </>
          )}
        </DropDiv>
      </Container>
    </>
  );
}

export default Navbar;
