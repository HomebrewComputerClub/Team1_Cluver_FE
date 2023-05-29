import styled from "styled-components";

export const Wrap = styled.div`
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
`;

export const Bg = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Logo = styled.img`
  width: 180px;
  margin-top: calc(var(--vh, 1vh) * 30);
`;

export const Text = styled.div`
  color: white;
  font-size: 14px;
  font-family: ${(props) => props.theme.textFont};
  margin-bottom: 10px;
`;

export const SearchBox = styled.div`
  width: 230px;
  border: 1px solid white;
  border-radius: 6px;
  height: 37px;
  border-radius: 7px;
  /* border: 1px solid transparent; */
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(
      ${(props) => props.theme.bgColor},
      ${(props) => props.theme.bgColor}
    ),
    ${(props) => props.theme.gradient};
`;

export const Search = styled.input`
  width: 230px;
  border: 1px solid white;
  border-radius: 7px;
  height: 35px;
  color: white;
  text-align: left;
  padding-left: 12px;
  padding-right: 37px;
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

export const SearchIcon = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  color: white;
  margin-top: -28px;
  margin-left: 199px;
`;

export const ResDiv = styled.div`
  width: 230px;
  height: 180px;
  margin-top: 7px;
  opacity: 0;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.gradient};
    border-radius: 5px;
  }
`;

export const Res = styled.div`
  width: 230px;
  height: 47px;
  color: white;
  font-size: 12px;
  font-family: ${(props) => props.theme.textFont};
  cursor: pointer;
  position: relative;
  display: flex;
`;

export const ResImg = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  line-height: 170%;
  font-family: ${(props) => props.theme.titleFont};
  margin: 5px;
  margin-top: 8px;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  //position: absolute;
  :hover {
    cursor: pointer;
  }
`;

export const ResText = styled.div`
  width: 155px;
  height: 46px;
  display: inline-block;
  display: flex;
  flex-direction: column;
  padding-left: 3px;
`;

export const ResName = styled.div`
  width: 150px;
  height: fit-content;
  height: 13px;
  font-size: 13px;
  //margin-left: 45px;
  margin-bottom: 3px;
  margin-top: 8px;
  display: inline-block;
  :hover {
    cursor: pointer;
  }
`;

export const ResAbout = styled.div`
  width: 150px;
  //margin-left: 45px;
  height: fit-content;
  font-weight: lighter;
  display: inline;
`;

export const ResLock = styled.div`
  width: 20px;
  height: 20px;
  //position: absolute;
  //margin-left: 200px;
  //margin-top: -25px;
  margin-top: 10px;
`;

export const InputDiv = styled.div`
  width: 260px;
  height: 125px;
  border: 1px solid white;
  margin-top: 80px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: -1;
  background: ${(props) => props.theme.bgColor};
  position: absolute;
  top: 22vh;
`;

export const InputText = styled.div`
  color: white;
  font-size: 14px;
  font-family: ${(props) => props.theme.textFont};
  margin-bottom: 10px;
  margin-top: 15px;
  display: flex;
`;

export const InputBox = styled.div`
  width: 180px;
  border: 1px solid white;
  border-radius: 6px;
  height: 30px;
  border-radius: 7px;
  /* border: 1px solid transparent; */
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(
      ${(props) => props.theme.bgColor},
      ${(props) => props.theme.bgColor}
    ),
    ${(props) => props.theme.gradient};
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 180px;
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

export const Btn = styled.div`
  width: 180px;
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
