import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import { useEffect, useRef, useState } from "react";
import { createClub } from "../../util/api";
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
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 70%;
`;
const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Text = styled.div`
  margin-bottom: 3px;
  font-size: 10px;
  font-weight: lighter;
  font-family: ${(props) => props.theme.textFont};
  color: ${(props) => props.theme.iconColor};
`;
const WarningText = styled.span`
  font-size: 10px;
  font-weight: lighter;
  color: ${(props) => props.theme.accentColor};
  position: absolute;
  transform: translate(5px, 2px);
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
  margin-bottom: 10px;
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
const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  border: 1px solid white;
  border-radius: 6px;
  height: 30px;
  margin-bottom: 5px;
  color: ${(props) =>
    props.isActive ? props.theme.bgColor : props.theme.iconColor};
  background: ${(props) =>
    props.isActive ? props.theme.iconColor : props.theme.bgColor};
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

function AddClub() {
  const navigate = useNavigate();

  const textRef = useRef<any>(null);
  const btnRef = useRef<any>(null);
  const errorRef = useRef<any>(null);

  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [code, setCode] = useState<string>("");
  const [imgsrc, setImgsrc] = useState<string>("");

  const toggle = () => {
    setIsPrivate((prev) => !prev);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name !== "" && desc !== "" && (!isPrivate || code !== "")) {
      const response = await createClub(
        name,
        desc,
        isPrivate,
        code,
        imgsrc,
        localStorage.getItem("token")
      );
      if (response.status === 201) {
        navigate("/admin");
      } else {
        console.log("error: ", response);
        errorRef.current.style.display = "block";
      }
    }
  };

  useEffect(() => {
    if (isPrivate === true) {
      textRef.current.style.color = "#89EC84";
    } else {
      textRef.current.style.color = "white";
    }
    if (name !== "" && desc !== "" && (!isPrivate || code !== "")) {
      btnRef.current.style.background =
        "linear-gradient(135deg, #89ec84 0%, #abc0e4 55%, #abc0e4 83%, #c7d5ed 100%)";
    } else {
      btnRef.current.style.background = "white";
    }
    errorRef.current.style.display = "none";
  }, [name, desc, isPrivate, code]);

  return (
    <Background>
      <Wrap>
        <Navbar></Navbar>
        <Container>
          <Form onSubmit={onSubmit}>
            <InputBox>
              <WarningText>*</WarningText>
              <Input
                type="text"
                placeholder="동아리 이름"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
              />
            </InputBox>
            <InputBox style={{ minHeight: "50px" }}>
              <WarningText>*</WarningText>
              <Input
                as="textarea"
                aria-rowspan={2}
                maxLength={48}
                style={{
                  resize: "none",
                  overflow: "hidden",
                  transform: "translateY(45%)",
                }}
                placeholder="동아리 소개"
                value={desc}
                onChange={(e) => {
                  setDesc(e.currentTarget.value);
                }}
              />
            </InputBox>
            <RowWrapper>
              <Button type="button" isActive={!isPrivate} onClick={toggle}>
                공개
              </Button>
              <Button
                type="button"
                isActive={isPrivate}
                style={{ marginLeft: "5px" }}
                onClick={toggle}
              >
                비공개
              </Button>
            </RowWrapper>
            <Text ref={textRef}>※ 비공개 설정 시 동아리 코드 입력 필요</Text>
            <InputBox>
              <Input
                type="text"
                placeholder="동아리 코드"
                value={code}
                onChange={(e) => {
                  setCode(e.currentTarget.value);
                }}
              />
            </InputBox>
            <RowWrapper>
              <InputBox>
                <Input
                  type="text"
                  placeholder="동아리 프로필 사진"
                  value={imgsrc}
                  onChange={(e) => {
                    setImgsrc(e.currentTarget.value);
                  }}
                />
              </InputBox>
              <Button
                type="button"
                isActive={true}
                style={{ marginLeft: "5px" }}
                onClick={() => {}}
              >
                등록
              </Button>
            </RowWrapper>
            <Error ref={errorRef}>* 유효하지 않습니다</Error>
            <Button type="submit" ref={btnRef} isActive={true}>
              동아리 추가
            </Button>
          </Form>
        </Container>
        <Bottombar first={false} second={false} third={true} />
      </Wrap>
    </Background>
  );
}
export default AddClub;
