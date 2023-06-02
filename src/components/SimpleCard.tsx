import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Container = styled.div<{ isActive: boolean }>`
  width: 70%;
  border: ${(props) => (props.isActive ? "4px" : "1px")} solid transparent;
  border-radius: 15px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(
      ${(props) => props.theme.bgColor},
      ${(props) => props.theme.bgColor}
    ),
    ${(props) => props.theme.gradient};
`;
const Bg = styled.div`
  width: 100%;
  padding: 20px;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  width: 70%;
  height: fit-content;
`;
const Icon = styled.div`
  width: 30px;
  height: 30px;
  aspect-ratio: 1;
  border: 1px solid white;
  border-radius: 50%;
  color: white;
  text-align: center;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-family: ${(props) => props.theme.textFont};
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 2px;
`;
const Desc = styled.span`
  width: 100%;
  max-height: 25px;
  overflow-y: scroll;
  word-break: break-all;
  white-space: pre-wrap;
  padding-right: 2px;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 5px;
    background-clip: padding-box;
  }
  font-size: 12px;
  font-weight: lighter;
  font-family: ${(props) => props.theme.textFont};
  color: ${(props) => props.theme.iconColor};
  margin-bottom: 1px;
`;
interface IProps {
  id: number;
  name: string;
  desc: string;
  isPrivate: boolean;
  chosen: boolean;
}
function SimpleCard({ id, name, desc, isPrivate, chosen }: IProps) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Container
      isActive={chosen}
      onClick={() => {
        if (location.pathname === "/checkcode") {
          navigate(`/attendance/${id}`);
        }
      }}
    >
      <Bg>
        <TitleWrapper>
          <TitleWrapper>
            <Icon>
              <span style={{ lineHeight: "160%" }}>♣</span>
            </Icon>
            <DescWrapper>
              <Title>{name}</Title>
              <Desc>{desc}</Desc>
            </DescWrapper>
          </TitleWrapper>
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "15px",
              color: "white",
              fontVariationSettings: "'FILL' 1",
              lineHeight: "180%",
            }}
          >
            {isPrivate ? "lock" : "lock_open_right"}
          </span>
        </TitleWrapper>
      </Bg>
    </Container>
  );
}
export default SimpleCard;
