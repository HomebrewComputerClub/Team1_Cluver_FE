import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { getClubs, tokenValidate } from "../../util/api";
import { useRecoilValue } from "recoil";
import { IClub, manager } from "../../util/atoms";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const Background = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  //background-color: ${(props) => props.theme.bgColor};
`;
const Wrap = styled.div`
  width: 100%;
  @media only screen and (min-width: 1000px) {
    max-width: 360px;
  }
  height: calc(var(--vh, 1vh) * 100);
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
  overflow-x: hidden;
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

function Login() {
  const navigate = useNavigate();
  const data = useRecoilValue(manager);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [loading, setLoading] = useState(true);

  const onAddClub = async () => {
    const response = await tokenValidate(localStorage.getItem("token"));
    if (response) {
      navigate("/addclub");
    } else {
      navigate("/login");
      console.log(response);
    }
  };
  const onDeleteClub = async () => {
    const response = await tokenValidate(localStorage.getItem("token"));
    if (response) {
      navigate("/delete");
    } else {
      navigate("/login");
      console.log(response);
    }
  };
  const getClubsData = async () => {
    setLoading(true);
    const response = await getClubs(localStorage.getItem("token"));
    if (response) {
      console.log(response);
      setClubs(response);
      setLoading(false);
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
          {loading ? (
            <Loading />
          ) : (
            <>
              <div style={{ marginBottom: "10px" }}>
                <UserName>{data.name}</UserName>
                {clubs.length == 0 ? (
                  <Title> 님이 관리 중인 동아리가 없습니다.</Title>
                ) : (
                  <Title> 님이 관리 중인 동아리입니다.</Title>
                )}
              </div>
              <CardContainer>
                {clubs.map((club: any) => {
                  if (club)
                    return (
                      <Card
                        key={club.id}
                        id={club.id}
                        name={club.name.toUpperCase()}
                        desc={club.description}
                        img={club.img}
                        isPrivate={club.status == "PRIVATE" ? true : false}
                        code={club.club_code}
                      />
                    );
                })}
              </CardContainer>
              <AddButton onClick={onAddClub}>
                관리 중인 동아리 추가하기 +
              </AddButton>
              {clubs.length === 0 ? (
                <></>
              ) : (
                <TextWrapper style={{ position: "absolute", bottom: "20px" }}>
                  <Text onClick={onDeleteClub}>동아리 삭제하기</Text>
                </TextWrapper>
              )}
            </>
          )}
        </Container>
        <Bottombar first={false} second={false} third={true} />
      </Wrap>
    </Background>
  );
}

export default Login;
