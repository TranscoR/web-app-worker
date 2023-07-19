import styled from "styled-components";
import { type Children } from "@/types";

const Content = styled.ul`
  margin: 20px 0;
  padding: 0;
  list-style: none;
  & li {
    display: inline-block;
  }
  & li:not(:last-child) {
    padding-bottom: 10px;
    margin-right: 10px;
  }
`;

const Index = ({ children }: Children) => {
  return <Content>{children}</Content>;
};

export default Index;
