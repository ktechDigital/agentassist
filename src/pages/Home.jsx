import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lupa from "../assets/lupa.png";
import axios from "axios";

const Container = styled.div`
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const InputContainer = styled.div`
  width: 90%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  border: 4px solid #095da8;
  border-radius: 10px;
  padding: 8px;
`;
const LupaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const LupaImg = styled.img`
  width: 32px;
`;
const InputPesquisa = styled.input`
  color: #095da8;
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  margin-left: 10px;
  font-size: 1.1rem;
  &:focus {
    border: none;
  }
`;

const SolutionContainer = styled.div`
  margin-top: 1rem;
`;

const SolutionCardContainer = styled.div`
  font-family: sans-serif;
  border: 4px solid #095da8;
  border-radius: 10px;
  font-size: 0.8rem;
  color: #095da8;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-left {
    0% {
      -webkit-transform: translateX(-50px);
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }

  box-shadow: 0 3.2px 7.2px 0 rgb(0 0 0 / 13%), 0 0.6px 1.8px 0 rgb(0 0 0 / 11%);

  transition: 0.1s;
  &:hover {
    scale: 1.009;
  }
`;
const SolutionTitle = styled.h2`
  font-size: 1rem;
`;
const Problema = styled.p`
  font-size: 0.9rem;
`;
const CQElement = styled.h3``;

const ExpandedContainer = styled.div`
  /* height: 300px; */
  background-color: #dbeeff;
  color: black;
  padding: 1rem;
  border-radius: 10px;

  animation: fade-in-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
    0% {
      -webkit-transform: translateY(-50px);
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  .fade-in-top {
    /* animation-delay: 1s; */
  }
`;

const TituloExpanded = styled.p``;
const SolucaoExpanded = styled.p``;
const ProblemaExpanded = styled.p``;
const Fr1Expanded = styled.div`
  max-width: 70vw;
  overflow: hidden;
`;
const Fr2Expanded = styled.div`
  max-width: 70vw;
  overflow: hidden;
`;
const CQExpanded = styled.p``;
const LoadMore = styled.button`
  background-color: #095da8;
  border: none;
  margin: 1rem auto;
  margin-top: 0;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.1s;
  &:hover {
    scale: 1.02;
  }
`;
const LoadMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const options = {
  keys: ["titulo", "descricao"],
  threshold: 0,
};

const CopyButton = styled.button`
  background-color: #095da8;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #074a87;
  }
`;

const CopyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CopyStatus = styled.span`
  color: #095da8;
  font-size: 0.9rem;
`;

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [clicaco, setClicado] = useState(false);
  const [solucoesClicadas, setSolucoesClicadas] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10); // Estado para controlar quantos itens serão renderizados

  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const toggleExpand = (index) => {
    if (solucoesClicadas.includes(index)) {
      setSolucoesClicadas(solucoesClicadas.filter((i) => i !== index));
    } else {
      setSolucoesClicadas([...solucoesClicadas, index]);
    }
  };

  const onSearch = async (e) => {
    const { value } = e.target;
    setQuery(value);
  };
  const makeSearch = async (e) => {
    try {
      const response = await axios.get(`http://localhost:5000/search`, {
        params: { query: query },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Erro ao buscar soluções:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        makeSearch();
      }
    };

    // Adiciona o evento ao pressionar uma tecla
    window.addEventListener("keydown", handleKeyPress);

    // Limpa o evento quando o componente é desmontado
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [makeSearch]);

  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = async (solucao) => {
    try {
      await navigator.clipboard.writeText(solucao);
      setCopySuccess("Copiado!");
      setTimeout(() => setCopySuccess(""), 2000); // Limpa a mensagem após 2 segundos
    } catch (error) {
      setCopySuccess("Erro ao copiar");
    }
  };

  return (
    <Container>
      <InputContainer>
        <LupaContainer onClick={makeSearch}>
          <LupaImg src={Lupa} alt="" />
        </LupaContainer>
        <InputPesquisa
          type="text"
          value={query}
          onChange={onSearch}
          placeholder="Digite sua pergunta..."
        />
      </InputContainer>
      <SolutionContainer>
        {results.slice(0, visibleItems).map((solucao, index) => (
          <SolutionCardContainer
            key={index}
            onClick={() => toggleExpand(index)}
          >
            <SolutionTitle>
              {solucao.SOLUTION} - {solucao.TITULO}
            </SolutionTitle>
            {!solucoesClicadas.includes(index) && (
              <Problema>{solucao.DESCRIPTION}</Problema>
            )}
            {solucoesClicadas.includes(index) && (
              <ExpandedContainer>
                <TituloExpanded>
                  <strong>{solucao.TITULO}</strong>
                </TituloExpanded>
                <SolucaoExpanded>
                  <strong>Solução:</strong> {solucao.SOLUTION}
                </SolucaoExpanded>
                <ProblemaExpanded>
                  <strong>Problema: </strong>
                  {solucao.DESCRIPTION}
                </ProblemaExpanded>
                <Fr1Expanded>
                  <strong>FR1: </strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: solucao.FR1CODE_LONGDESCRIPTION,
                    }}
                  ></div>{" "}
                </Fr1Expanded>
                <Fr2Expanded>
                  <strong>FR2: </strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: solucao.FR2CODE_LONGDESCRIPTION,
                    }}
                  ></div>
                </Fr2Expanded>
                <CQExpanded>
                  <strong>Sem CQ: </strong>
                  {solucao.SEMCQ == "True" ? "Sim" : "Não"}
                </CQExpanded>
                <CopyContainer>
                  <CopyButton onClick={() => handleCopy(solucao.solucao)}>
                    Copiar solução!
                  </CopyButton>
                  {copySuccess && <CopyStatus>{copySuccess}</CopyStatus>}
                </CopyContainer>
              </ExpandedContainer>
            )}
          </SolutionCardContainer>
        ))}
        {visibleItems < results.length && (
          <LoadMoreContainer>
            <LoadMore onClick={loadMoreItems}>Carregar mais</LoadMore>
          </LoadMoreContainer>
        )}
      </SolutionContainer>
    </Container>
  );
};

export default Home;
