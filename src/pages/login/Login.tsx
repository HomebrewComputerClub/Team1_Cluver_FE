import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import logo from "../../assets/images/logo.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidate } from "../../util/api";
import { useRecoilState } from "recoil";
import { IClub, manager } from "../../util/atoms";

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
  transform: translateY(12%);
  //background-color: red;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 150px;
  margin-top: 120px;
  margin-bottom: 5px;
`;
const InputWrapper = styled.div`
  //gradient input box
  width: 100%;
  margin-bottom: 7px;
  border: 1px solid white;
  border-radius: 7px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(
      ${(props) => props.theme.bgColor},
      ${(props) => props.theme.bgColor}
    ),
    ${(props) => props.theme.gradient};
`;
const Form = styled.form`
  width: 60%;
`;
const Input = styled.input`
  width: 100%;
  padding: 6px;
  background-color: transparent;
  border: 1px solid transparent;
  color: ${(props) => props.theme.formColor};
  text-align: center;
  ::placeholder {
    color: ${(props) => props.theme.formColor};
    font-size: 12px;
    text-align: center;
  }
  :focus {
    outline: none;
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 6px;
  margin-bottom: 15px;
  font-weight: 600;
  border-radius: 7px;
  border-color: transparent;
  background: ${(props) => props.theme.iconColor};
  cursor: pointer;
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
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: all ease 0.3s;
    cursor: pointer;
  }
`;
const Error = styled.span`
  font-size: 10px;
  color: #d23535;
  display: none;
  margin-bottom: 5px;
  font-family: ${(props) => props.theme.textFont};
`;

function Login() {
  const navigate = useNavigate();

  const idRef = useRef<any>(null);
  const pwRef = useRef<any>(null);
  const btnRef = useRef<any>(null);
  const errorRef = useRef<any>(null);

  // const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [managerInfo, setManagerInfo] = useRecoilState(manager);

  const onChangeId = (e: React.FormEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
    errorRef.current.style.display = "none";
  };
  const onChangePw = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    errorRef.current.style.display = "none";
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //valid 확인
    if (id !== "" && password !== "") {
      // setLoading(true);
      const response = await loginValidate(id, password);
      if (response.status === 201) {
        const info = response.data.manager;
        //set manager info
        setManagerInfo({
          id: info.id,
          email: info.manager_email,
          loginID: info.manager_id,
          name: info.manager_name,
        });
        navigate("/admin");
      } else {
        console.log("error: ", response);
        errorRef.current.style.display = "block";
      }
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== "") {
      idRef.current.style.border = "1px solid transparent";
    } else {
      idRef.current.style.border = "1px solid white";
    }
    if (password !== "") {
      pwRef.current.style.border = "1px solid transparent";
    } else {
      pwRef.current.style.border = "1px solid white";
    }
    if (id !== "" && password !== "") {
      btnRef.current.style.background =
        "linear-gradient(135deg, #89ec84 0%, #abc0e4 55%, #abc0e4 83%, #c7d5ed 100%)";
    } else {
      btnRef.current.style.background = "white";
    }
  }, [id, password]);

  return (
    <Background>
      <Wrap>
        <Navbar></Navbar>
        <Container>
          <Logo src={logo} />
          <Form onSubmit={onSubmit}>
            <InputWrapper ref={idRef}>
              <Input
                type="text"
                placeholder="아이디"
                value={id}
                onChange={onChangeId}
              ></Input>
            </InputWrapper>
            <InputWrapper ref={pwRef}>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChangePw}
              ></Input>
            </InputWrapper>
            <Error ref={errorRef}>* 유효하지 않습니다</Error>
            <Button ref={btnRef} type="submit">
              로그인
            </Button>
          </Form>
          <TextWrapper>
            <Text onClick={() => alert("아이디 찾기")}>아이디 찾기</Text>
            <span>|</span>
            <Text onClick={() => alert("비밀번호 초기화")}>
              비밀번호 초기화
            </Text>
          </TextWrapper>
        </Container>
        <Bottombar first={false} second={false} third={false} />
      </Wrap>
    </Background>
  );
}

export default Login;
