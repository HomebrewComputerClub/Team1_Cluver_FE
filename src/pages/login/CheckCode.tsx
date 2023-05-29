import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import SimpleCard from "../../components/SimpleCard";
import { useLocation, useNavigate } from "react-router";
import { endCheck, codeCheck, restartCheckCode } from "../../util/api";
import { useRef, useState, useEffect } from "react";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  //background-color: ${(props) => props.theme.bgColor};
`;
const Wrap = styled.div`
  width: 360px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.bgColor};
`;
const Container = styled.div`
  width: 100%;
  height: 77%;
  transform: translateY(10%);
  //background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 400;
  font-family: ${(props) => props.theme.textFont};
  color: ${(props) => props.theme.iconColor};
  margin: 10px auto;
`;
const CodeText = styled.span`
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 5px;
  font-family: ${(props) => props.theme.textFont};
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 20px;
`;
const TextWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & {
    color: ${(props) => props.theme.iconColor};
    font-size: 10px;
  }
`;
const Text = styled.div`
  color: ${(props) => props.theme.iconColor};
  margin-bottom: 20px;
  font-size: 14px;
  font-family: ${(props) => props.theme.textFont};
  font-weight: lighter;
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: all ease 0.3s;
    cursor: pointer;
  }
  border-radius: 7px;
`;
const ModalBg = styled.div`
  display: none; //flex
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  position: fixed;
  justify-content: center;
`;
const Modal = styled.div`
  width: 80%;
  border: 1px solid white;
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 40%;
  background: ${(props) => props.theme.bgColor};
  transition: all ease 0.3s;
`;
const SmallText = styled.div`
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: all ease 0.3s;
  }
`;

interface IRouterState {
  state: {
    id: number;
    name: string;
    desc: string;
    isPrivate: boolean;
    checkCode: string;
  };
}
function CheckCode() {
  const navigate = useNavigate();
  const modalRef = useRef<any>(null);
  const { state } = useLocation() as IRouterState;
  const [status, setStatus] = useState("(진행 중)");
  const [message, setM] = useState("출석 마감하기");
  const [message2, setM2] = useState("출석을 마감하시겠습니까?");
  const [message3, setM3] = useState("마감하기");
  const btn = useRef<any>(null);
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);

  const onEndCheck = async () => {
    const today = new Date();
    const response = await endCheck(
      today.getMonth() + 1,
      today.getDate(),
      state.id
    );
    if (response.status === 201) {
      const code = response.data.checkCode;
      navigate("/admin");
    } else {
      //console.log(response);
    }
  };

  const restart = async () => {
    const today = new Date();
    const response = await restartCheckCode(
      today.getMonth() + 1,
      today.getDate(),
      state.id
    );
    if (response.status === 201) {
      const code = response.data.checkCode;
      navigate("/admin");
    } else {
      //console.log(response);
    }
  };

  const codeIsValid = async () => {
    const today = new Date();
    const response = await codeCheck(
      String(today.getMonth() + 1),
      String(today.getDate()),
      state.id,
      state.checkCode
    );
    //console.log(response);
    if (response === "출석체크 이미 끝났음") {
      setStatus("(마감)");
      setM("출석 진행하기");
      setM2("출석을 진행하시겠습니까?");
      setM3("진행하기");
    } else if (response === "출석 성공") {
      setStatus("(진행 중)");
      setM("출석 마감하기");
      setM2("출석을 마감하시겠습니까?");
      setM3("마감하기");
    }
    return response;
  };

  useEffect(() => {
    codeIsValid();
  }, []);

  //뒤로가기 막기 / 뒤로가기 하면 자동 출석마감

  return (
    <Background>
      <Wrap>
        <Navbar></Navbar>
        <Container>
          <ModalBg ref={modalRef}>
            <Modal>
              <Text>{message2}</Text>
              <TextWrapper>
                <SmallText
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (message3 === "진행하기") {
                      console.log(1);
                      restart();
                    } else {
                      onEndCheck();
                    }
                  }}
                >
                  {message3}
                </SmallText>
                <span>|</span>
                <SmallText
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    modalRef.current.style.display = "none";
                  }}
                >
                  취소
                </SmallText>
              </TextWrapper>
            </Modal>
          </ModalBg>
          <Title>
            {year}-{month}-{day}
          </Title>
          <Title>출석 코드 {status}</Title>
          <CodeText>{state.checkCode}</CodeText>
          <SimpleCard
            name={state.name}
            desc={state.desc}
            isPrivate={state.isPrivate}
            chosen={false}
          />
          <TextWrapper style={{ marginTop: "20px" }}>
            <Text
              ref={btn}
              style={{
                fontSize: "14px",
                border: "1px solid white",
                padding: "7px 15px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = `/attendance/${state.id}`;
              }}
              onMouseEnter={() => {
                btn.current.style.color = "#1C1F2A";
                btn.current.style.background = "white";
              }}
              onMouseLeave={() => {
                btn.current.style.color = "white";
                btn.current.style.fontWeight = "lighter";
                btn.current.style.background = "#1C1F2A";
              }}
            >
              출석 명단 확인
            </Text>
          </TextWrapper>
          <TextWrapper style={{ position: "absolute", bottom: "10px" }}>
            <Text
              onClick={() => {
                modalRef.current.style.display = "flex";
              }}
            >
              {message}
            </Text>
          </TextWrapper>
        </Container>
        <Bottombar first={false} second={false} third={true} />
      </Wrap>
    </Background>
  );
}
export default CheckCode;
