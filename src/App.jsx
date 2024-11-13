import React from "react";
import Home from "./pages/Home";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 1rem;
`;

function App() {
  return (
    <Container>
      <Home />
    </Container>
  );
}

export default App;
