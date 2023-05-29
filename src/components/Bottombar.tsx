import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { tokenValidate } from "../util/api";

const Container = styled.div`
  width: 100%;
  height: 90px;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  //background-color: grey;
  display: flex;
  justify-content: center;
  font-family: ${(props) => props.theme.textFont};
  background: ${(props) => props.theme.bgColor};
  z-index: 10;
`;

const IconDiv = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 3px;
  //background-color: rgba(50, 50, 50, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
  align-content: center;
`;

const Icon = styled.span<{ isActive: boolean }>`
  height: 45px;
  color: white;
  font-size: 30px;
  width: 45px;
  /* background: ${(props) =>
    props.isActive ? props.theme.gradient : props.theme.bgColor}; */
  border-radius: 7px;
  text-align: center;
  font-family: ${(props) => props.theme.titleFont};
  cursor: pointer;
`;

const TextDiv = styled.div`
  width: 100%;
  height: 15px;
  position: absolute;
  bottom: 30px;
  //background-color: green;
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
`;

const Text = styled.span`
  color: white;
  font-size: 12px;
  font-weight: 100;
  width: 45px;
  //background-color: blue;
  text-align: center;
`;

interface IBarProps {
  first: boolean;
  second: boolean;
  third: boolean;
}
function Bottombar({ first, second, third }: IBarProps) {
  const navigate = useNavigate();

  const LinktoAdmin = async () => {
    const response = await tokenValidate(localStorage.getItem("token"));
    //console.log(response);
    if (response) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const LinktoMenu = async () => {
    navigate("/menu");
  };

  return (
    <>
      <Container>
        <IconDiv>
          {/* <Icon isActive={first}>
            <Link to="/">
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "32px",
                  lineHeight: "140%",
                  paddingLeft: "2px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                how_to_reg
              </span>
            </Link>
          </Icon> */}
          <Icon isActive={first} onClick={LinktoMenu}>
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "32px",
                lineHeight: "140%",
                paddingLeft: "0px",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              widgets
            </span>
          </Icon>
          <Icon
            isActive={second}
            style={{
              fontSize: "28px",
              lineHeight: "152%",
              /* transform: "scaleY(-1)", */
            }}
          >
            <Link to="/">♣</Link>
          </Icon>
          <Icon isActive={third} onClick={LinktoAdmin}>
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "32px",
                lineHeight: "140%",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              manage_accounts
            </span>
          </Icon>
        </IconDiv>
        <TextDiv>
          <Text style={{ paddingLeft: "1px" }}>메뉴</Text>
          <Text>홈으로</Text>
          <Text>관리자</Text>
        </TextDiv>
      </Container>
    </>
  );
}

export default Bottombar;
