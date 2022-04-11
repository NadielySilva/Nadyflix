import React from "react";
import styled from 'styled-components';

const HeaderStyle = styled.div`
  width: 100vw;
  height: 25vh;
  background-color: red;
`;

function Header() {
  return (
    <HeaderStyle>
      <h2>Faça seu header aqui</h2>
    </HeaderStyle>
  );
}

export default Header;