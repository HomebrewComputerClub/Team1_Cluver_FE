import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import Card2 from "../../components/Card2";
import { Link, useNavigate } from "react-router-dom";
import { getClubs, tokenValidate } from "../../util/api";
import { useRecoilValue } from "recoil";
import { IClub, manager } from "../../util/atoms";
import { useEffect, useState } from "react";

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

const AddButton = styled.div`
  font-size: 13px;
  font-weight: 400;
  font-family: ${(props) => props.theme.textFont};
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-top: 5px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    transition: all ease 0.3s;
    cursor: pointer;
  }
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
const CardContainer = styled.div`
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

function CheckAttendance() {
  const navigate = useNavigate();
  const data = useRecoilValue(manager);
  const [clubs, setClubs] = useState<IClub[]>([]);

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

  return (
    <Background>
      <Wrap>
        <Navbar></Navbar>
        <Container>
          <div style={{ marginBottom: "10px" }}>
            {clubs.length === 0 ? (
              <>
                <UserName>{data.name}</UserName>
                <Title> 님이 관리 중인 동아리가 없습니다.</Title>
              </>
            ) : (
              <Title>출석 확인할 동아리를 선택하세요.</Title>
            )}
          </div>
          <CardContainer>
            {clubs.map((club: any) => {
              if (club)
                return (
                  <Card2
                    key={club.id}
                    id={club.id}
                    name={club.name.toUpperCase()}
                    desc={club.description}
                    img={club.img}
                    isPrivate={club.status === "PRIVATE" ? true : false}
                    code={club.club_code}
                  />
                );
            })}
          </CardContainer>
        </Container>
        <Bottombar first={false} second={false} third={true} />
      </Wrap>
    </Background>
  );
}

export default CheckAttendance;
