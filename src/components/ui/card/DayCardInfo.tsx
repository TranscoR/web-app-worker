import styled from "styled-components";
import { type Day } from "@/types";

const Card = styled.div`
  background: transparent;
  padding: 2px 20px 6px 10px;
  border-radius: 7px;
  border: 1px solid #ccc;
  & small {
    font-size: 12px;
  }
  & h4 {
    font-size: 15px;
    margin-bottom: 3px;
    color: #2f2f2f;
    font-weight: 500;
  }
  & p {
    font-size: 13px;
  }
`;

const Index = ({ label_day, label_date }: Day) => {
  return (
    <li>
      <Card>
        <small>{label_day}</small>
        <p>{label_date}</p>
      </Card>
    </li>
  );
};

export default Index;
