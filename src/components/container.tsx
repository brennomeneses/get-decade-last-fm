import styled from "styled-components";

const Background = styled.div`
  width: 1080px;
  height: 1920px;
  background-image: linear-gradient(#640D5F, #56004e) !important;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Title = styled.h1`
  color: white !important;
  font-size: 4em;
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: 400;
`

const Subtitle = styled.h2`
  color: white !important;
  font-size: 0.5em !important;
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: 400;
`

const Podium = styled.div`
  display: flex;
  font-size: 2.5em;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  color: white !important;
`

const Footer = styled.footer`
  color: white !important;
  font-size: 2em;
  text-align: center;
  margin: 0;
  padding: 0;
`

export { Background, Title, Footer, Subtitle, Podium }