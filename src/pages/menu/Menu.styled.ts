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

export const BtnDiv = styled.div`
  width: 60%;
  height: fit-content;
  margin: auto;
  display: flex;
  //flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Btn = styled.div`
  text-align: center;
  color: white;
  width: 130px;
  margin: 7px;
  border-radius: 7px;
  font-size: 15px;
  border: 1px solid white;
  padding: 11px 12px;
  cursor: pointer;
  font-family: ${(props) => props.theme.textFont};
  :hover {
    color: #1c1f2a;
    background: white;
  }
  transition: 0.2s;
  letter-spacing: 1px;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
`;

export const Icon = styled.div`
  font-size: 40px;
  width: 100%;
  height: 70%;
  //border: 1px solid green;
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-left: 6px;
  padding-bottom: 5px;
`;
