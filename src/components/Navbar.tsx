import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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

const Cluver = styled.div`
  width: fit-content;
  position: absolute;
  font-size: 28px;
  font-family: ${(props) => props.theme.titleFont};
  font-weight: bold;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  z-index: 10;
  cursor: pointer;
`;

const Leftdiv = styled.div`
  width: fit-content;
  position: absolute;
  font-size: 25px;
  font-family: ${(props) => props.theme.titleFont};
  font-weight: bold;
  left: 25px;
  margin-top: 20px;
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  z-index: 10;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
`;

const MenuDiv = styled.div`
  width: fit-content;
  position: absolute;
  font-size: 25px;
  font-family: ${(props) => props.theme.titleFont};
  font-weight: bold;
  right: 25px;
  margin-top: 17.5px;
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  cursor: pointer;
  z-index: 10;
`;

const DropDiv = styled.div`
  width: 100%;
  height: fit-content;
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

function Navbar() {
  const [n, setN] = useState(1);
  const menu = useRef<any>();
  const [text, setText] = useState("menu");
  const clover = useRef<any>();

  useEffect(() => {
    if (n % 2 === 1) {
      clover.current.style.opacity = "0";
      menu.current.style.opacity = "0";
      menu.current.style.zIndex = "-1";
      setText("menu");
      clover.current.style.fontSize = "35px";
      setTimeout(() => {
        clover.current.style.opacity = "1";
      }, 15);
    } else {
      clover.current.style.opacity = "0";
      menu.current.style.opacity = "1";
      menu.current.style.zIndex = "5";
      setText("♣");
      clover.current.style.fontSize = "26px";
      setTimeout(() => {
        clover.current.style.opacity = "1";
      }, 15);
    }
  }, [n]);

  return (
    <>
      <Container>
        <Leftdiv>♣</Leftdiv>
        <Link to="/">
          <Cluver>CLUVER</Cluver>
        </Link>
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
          <DropMenu
            onClick={() => {
              setN(1);
            }}
          >
            <Link to="/">
              <span style={{ cursor: "pointer" }}>서비스 이용 가이드</span>
            </Link>
          </DropMenu>
          <DropMenu
            onClick={() => {
              setN(1);
            }}
          >
            <Link to="/">
              <span style={{ cursor: "pointer" }}>출석 체크</span>
            </Link>
          </DropMenu>
          <DropMenu
            onClick={() => {
              setN(1);
            }}
          >
            <span style={{ cursor: "pointer" }}>모임 시간 조율</span>
          </DropMenu>
          <DropMenu
            onClick={() => {
              setN(1);
            }}
          >
            <span style={{ cursor: "pointer" }}>그룹 관리</span>
          </DropMenu>
          {!!localStorage.getItem("token") ? (
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
            </DropMenu>
          ) : (
            <>
              <DropMenu
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
              </DropMenu>
            </>
          )}
        </DropDiv>
      </Container>
    </>
  );
}

export default Navbar;
