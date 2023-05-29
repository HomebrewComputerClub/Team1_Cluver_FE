import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import SimpleCard from "../../components/SimpleCard";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IClub, manager } from "../../util/atoms";
import { deleteClub, getClubs } from "../../util/api";

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
const UserName = styled.span`
  font-size: 15px;
  font-weight: 600;
  font-family: ${(props) => props.theme.textFont};
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;
const Title = styled.span`
  font-size: 15px;
  font-weight: 400;
  font-family: ${(props) => props.theme.textFont};
  color: ${(props) => props.theme.iconColor};
`;
const CheckBox = styled.div<{ isActive: boolean }>`
  width: 15px;
  height: 15px;
  border: 1px solid
    ${(props) => (props.isActive ? "transparent" : props.theme.iconColor)};
  background: ${(props) =>
    props.isActive ? props.theme.gradient : props.theme.bgColor};
`;
const CardContainer = styled.div`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;
const Button = styled.div`
  width: 70%;
  border-radius: 6px;
  height: 30px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.bgColor};
  background: white;
  text-align: center;
  font-size: 13px;
  padding-top: 7px;
  font-family: ${(props) => props.theme.textFont};
  cursor: pointer;
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
const Text = styled.span`
  color: ${(props) => props.theme.iconColor};
  font-size: 13px;
`;
const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 18px;
  & {
    color: ${(props) => props.theme.iconColor};
    font-size: 10px;
  }
`;
const SmallText = styled.div`
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: all ease 0.3s;
  }
`;
const CardListContainer = styled.div`
  width: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: red; */
  max-height: 50%;
  overflow-y: scroll;
  margin: 10px auto;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.boxColor};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.gradient};
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

function Delete() {
  const data = useRecoilValue(manager);

  const navigate = useNavigate();
  const modalRef = useRef<any>(null);
  const btnRef = useRef<any>(null);

  const [chosen, setChosen] = useState<boolean[]>([]);
  const [clubs, setClubs] = useState<IClub[]>([]);

  const onChoose = (id: number) => {
    setChosen((prev) => {
      let old = [...prev];
      old[id] = !old[id];
      return old;
    });
  };
  const onWillDelete = () => {
    if (chosen.includes(true)) modalRef.current.style.display = "flex";
  };
  const onDelete = async () => {
    console.log("clubs", clubs);
    console.log("chosen", chosen);
    for (let id = 0; id < chosen.length; id++) {
      if (chosen[id] === true) {
        const response = await deleteClub(id, localStorage.getItem("token"));
        if (response.status === 200) {
          navigate("/admin");
        } else {
          console.log(response);
        }
      }
    }
  };

  const getClubsData = async () => {
    const response = await getClubs(localStorage.getItem("token"));
    if (response) {
      console.log(response);
      setClubs(response);
    } else {
      navigate("/login");
      console.log(response);
    }
  };

  useEffect(() => {
    getClubsData();
  }, []);
  useEffect(() => {
    if (chosen.includes(true)) {
      btnRef.current.style.background =
        "linear-gradient(135deg, #89ec84 0%, #abc0e4 55%, #abc0e4 83%, #c7d5ed 100%)";
    } else {
      btnRef.current.style.background = "white";
    }
    console.log(chosen);
  }, [chosen]);

  return (
    <Background>
      <Wrap>
        <Navbar></Navbar>
        <Container>
          <ModalBg ref={modalRef}>
            <Modal>
              <Text>삭제한 동아리는 복구할 수 없습니다.</Text>
              <Text>정말 삭제하시겠습니까?</Text>
              <TextWrapper>
                <SmallText onClick={onDelete}>삭제하기</SmallText>
                <span>|</span>
                <SmallText
                  onClick={() => {
                    modalRef.current.style.display = "none";
                  }}
                >
                  취소
                </SmallText>
              </TextWrapper>
            </Modal>
          </ModalBg>
          <div style={{ marginBottom: "10px" }}>
            <UserName>{data.name}</UserName>
            <Title> 님이 관리 중인 동아리입니다.</Title>
          </div>
          <CardListContainer>
            {clubs.map((club: any) => (
              <CardContainer onClick={() => onChoose(club.id)}>
                <CheckBox isActive={chosen[club.id]} />
                <SimpleCard
                  key={club.id}
                  name={club.name.toUpperCase()}
                  desc={club.description}
                  isPrivate={club.status == "PRIVATE" ? true : false}
                  chosen={chosen[club.id]}
                />
              </CardContainer>
            ))}
          </CardListContainer>
          <Button ref={btnRef} onClick={onWillDelete}>
            선택 삭제
          </Button>
        </Container>
        <Bottombar first={false} second={false} third={true} />
      </Wrap>
    </Background>
  );
}
export default Delete;
