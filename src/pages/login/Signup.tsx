import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import { useEffect, useRef, useState } from "react";
import {
  checkEmailDuplicate,
  emailValidation,
  sendCheckEmail,
  signUp,
} from "../../util/api";
import { useNavigate } from "react-router-dom";

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
`;
const Modal = styled.div`
  display: none; //flex
  width: 75%;
  border: 1px solid white;
  padding-top: 10px;
  padding-bottom: 5px;
  border-radius: 12px;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 90px;
  background: ${(props) => props.theme.bgColor};
`;
const Text = styled.div`
  font-size: 10px;
  font-weight: lighter;
  font-family: ${(props) => props.theme.textFont};
  color: ${(props) => props.theme.iconColor};
  margin-bottom: 5px;
`;
const EmailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const InputBox = styled.div`
  width: 100%;
  min-width: 150px;
  border: 1px solid white;
  border-radius: 6px;
  height: 30px;
  border-radius: 7px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(
      ${(props) => props.theme.bgColor},
      ${(props) => props.theme.bgColor}
    ),
    ${(props) => props.theme.gradient};
  margin-bottom: 6px;
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid white;
  border-radius: 7px;
  height: 30px;
  padding-bottom: 3px;
  color: white;
  font-family: ${(props) => props.theme.textFont};
  text-align: center;
  font-size: 13px;
  background-color: transparent;
  border: 1px solid transparent;
  ::placeholder {
    color: ${(props) => props.theme.formColor};
  }
  :focus {
    outline: none;
  }
`;
const Button = styled.button`
  width: 100%;
  border-radius: 6px;
  height: 30px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.bgColor};
  background: white;
  text-align: center;
  font-size: 13px;
  font-family: ${(props) => props.theme.textFont};
  cursor: pointer;
`;
const Error = styled.span`
  font-size: 10px;
  color: #d23535;
  display: none;
  margin-bottom: 5px;
  font-family: ${(props) => props.theme.textFont};
`;
const Form = styled.form`
  width: 70%;
`;

function Signup() {
  const navigate = useNavigate();

  const emailInputRef = useRef<any>(null);
  const dupRef = useRef<any>(null);
  const sendRef = useRef<any>(null);
  const btnRef = useRef<any>(null);
  const errorRef = useRef<any>(null);
  const modalRef = useRef<any>(null);

  const [email, setEmail] = useState<string>("");
  const [noDuplicate, setNoDuplicate] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");

  const checkDuplicate = async () => {
    if (email !== "") {
      const response = await checkEmailDuplicate(email);
      if (response === true) {
        errorRef.current.style.display = "block";
      } else if (response === false) {
        setNoDuplicate(true);
        emailInputRef.current.disabled = true;
        emailInputRef.current.style.color = "#6a5f5f";
        sendRef.current.style.background =
          "linear-gradient(135deg, #89ec84 0%, #abc0e4 55%, #abc0e4 83%, #c7d5ed 100%)";
      }
    }
  };
  const onSendMail = async () => {
    if (noDuplicate === true) {
      const response = await sendCheckEmail(email);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await emailValidation(email);
    if (response.data === "인증완료") {
      setEmailValid(true);
    }
    if (
      id !== "" &&
      name !== "" &&
      pw !== "" &&
      pw === pwCheck &&
      emailValid === true
    ) {
      const response2 = await signUp(id, email, name, pw);
      if (response2.status === 201) {
        navigate("/login");
      }
    } else if (emailValid === false) {
      // 이메일 인증 전
      modalRef.current.style.display = "flex";
      return;
    } else {
      // 유효하지 않음
      errorRef.current.style.display = "block";
    }
  };

  useEffect(() => {
    errorRef.current.style.display = "none";
    modalRef.current.style.display = "none";
    if (email !== "") {
      dupRef.current.style.background =
        "linear-gradient(135deg, #89ec84 0%, #abc0e4 55%, #abc0e4 83%, #c7d5ed 100%)";
    } else {
      dupRef.current.style.background = "white";
    }
    if (id !== "" && name !== "" && pw !== "" && pw === pwCheck) {
      btnRef.current.style.background =
        "linear-gradient(135deg, #89ec84 0%, #abc0e4 55%, #abc0e4 83%, #c7d5ed 100%)";
    }
  }, [email, name, id, pw, pwCheck]);

  return (
    <Background>
      <Wrap>
        <Navbar></Navbar>
        <Container>
          <Modal ref={modalRef}>
            <Text>이메일 인증 전입니다.</Text>
            <Text>입력하신 이메일로 이동하여 인증을 완료해 주세요.</Text>
          </Modal>
          <Form onSubmit={onSubmit}>
            <EmailWrapper>
              <InputBox>
                <Input
                  ref={emailInputRef}
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                />
              </InputBox>
              <Button
                type="button"
                ref={dupRef}
                style={{ marginLeft: "5px" }}
                onClick={checkDuplicate}
              >
                중복 확인
              </Button>
            </EmailWrapper>
            <Error ref={errorRef}>* 이메일이 중복입니다.</Error>
            <Text>* 발송하기 버튼을 누른 후 이메일 인증을 완료해 주세요.</Text>
            <Button type="button" ref={sendRef} onClick={onSendMail}>
              인증 메일 발송하기
            </Button>
            <InputBox>
              <Input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
              />
            </InputBox>
            <InputBox>
              <Input
                type="text"
                placeholder="아이디"
                value={id}
                onChange={(e) => {
                  setId(e.currentTarget.value);
                }}
              />
            </InputBox>
            <InputBox>
              <Input
                type="password"
                placeholder="비밀번호"
                value={pw}
                onChange={(e) => {
                  setPw(e.currentTarget.value);
                }}
              />
            </InputBox>
            <InputBox>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={pwCheck}
                onChange={(e) => {
                  setPwCheck(e.currentTarget.value);
                }}
              />
            </InputBox>
            <Button type="submit" ref={btnRef}>
              회원가입
            </Button>
          </Form>
        </Container>
        <Bottombar
          first={false}
          second={false}
          third={false}
        />
      </Wrap>
    </Background>
  );
}
export default Signup;
