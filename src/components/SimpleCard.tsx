import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div<{ isActive: boolean }>`
  width: 80%;
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
  margin-left: 8px;
`;
const Icon = styled.div`
  width: 30px;
  height: 30px;
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
  font-size: 12px;
  font-weight: lighter;
  font-family: ${(props) => props.theme.textFont};
  color: ${(props) => props.theme.iconColor};
`;
interface IProps {
  name: string;
  desc: string;
  isPrivate: boolean;
  chosen: boolean;
}
function SimpleCard({ name, desc, isPrivate, chosen }: IProps) {
  return (
    <Container isActive={chosen}>
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
