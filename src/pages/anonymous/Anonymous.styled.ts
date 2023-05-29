import styled from "styled-components";

export const Wrap = styled.div`
  width: 360px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
`;

export const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TalkDiv = styled.div`
  height: calc(100vh - 165px);
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 65px;
`;

export const Top = styled.div`
  height: 55px;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ClubName = styled.div`
  width: fit-content;
  font-size: 22px;
  font-family: ${(props) => props.theme.textFont};
  color: white;
  margin: auto;
`;

export const Left = styled.div`
  position: absolute;
  font-family: ${(props) => props.theme.textFont};
  font-weight: lighter;
  left: 25px;
  color: white;
  font-size: 17px;
  .material-symbols-outlined {
    font-size: 23px;
    vertical-align: middle;
    margin-right: 3px;
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 38;
  }
`;

export const Right = styled.div`
  position: absolute;
  font-family: ${(props) => props.theme.textFont};
  font-weight: lighter;
  right: 25px;
  color: white;
  font-size: 17px;
  cursor: pointer;
  .material-symbols-outlined {
    font-size: 23px;
    vertical-align: middle;
    margin-right: 3px;
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 38;
  }
`;

export const InputDiv = styled.div`
  height: 55px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  .material-symbols-outlined {
    cursor: pointer;
    font-size: 35px;
    vertical-align: middle;
    margin-left: 5px;
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 38;
  }
`;

export const Input = styled.input`
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 84%;
  border-radius: 10px;
  font-family: ${(props) => props.theme.textFont};
  font-weight: lighter;
  color: white;
  background: transparent;
  height: 30px;
  margin-left: 10px;
  padding-left: 10px;
  font-size: 14px;
`;

export const Btn = styled.button`
  background: transparent;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  width: fit-content;
  padding: 0;
  .material-symbols-outlined {
    :hover,
    :active {
      font-size: 30px;
      margin-left: 7px;
      font-variation-settings: "FILL" 1;
    }
  }
`;

export const ListDiv = styled.div`
  width: 99%;
  height: calc(100% - 110px);
  position: absolute;
  top: 55px;
  overflow-y: scroll;
  display: flex;
  font-family: ${(props) => props.theme.textFont};
  font-weight: lighter;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 7px;
  }
  padding: 10px;
`;

export const ChatDiv = styled.div`
  display: inline-block;
  color: white;
  width: fit-content;
  max-width: calc(360px * 0.8);
  height: auto resize;
  border: 1px solid transparent;
  font-size: 14px;
  border-radius: 10px;
  //padding: 8px 10px;
  margin-bottom: 13px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(
      ${(props) => props.theme.boxColor},
      ${(props) => props.theme.bgColor},
      ${(props) => props.theme.boxColor}
    ),
    ${(props) => props.theme.gradient};
  padding: 0;
`;

export const Chat = styled.div`
  margin: 8px 10px;
  width: calc(100% - 18px);
`;

export const ChatDate = styled.div`
  display: inline-block;
  width: fit-content;
  //height: 100%;
  font-size: 10px;
  font-family: ${(props) => props.theme.textFont};
  font-weight: lighter;
  color: rgba(255, 255, 255, 0.5);
  //line-height: 400%;
  margin-left: 5px;
  bottom: 0;
`;
