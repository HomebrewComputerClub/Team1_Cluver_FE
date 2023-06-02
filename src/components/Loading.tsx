import React from "react";
import styled from "styled-components";
import spinner from "../assets/images/loading.gif";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const S = styled.img`
  width: 35px;
  height: 35px;
`;

function Loading() {
  return (
    <>
      <Container>
        <Circle>
          <S src={spinner} alt=""></S>
        </Circle>
      </Container>
    </>
  );
}
export default Loading;
