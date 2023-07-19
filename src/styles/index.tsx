import styled from "styled-components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Forms
export const Field = styled(Box)`
  width: 100%;
  margin: 15px 0;
  & label {
    display: inline-block;
    margin-bottom: 5px;
    font-size: 13px;
    font-weight: 500;
    font-family: "Prompt";
  }
`;

// Modal
export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  padding: 40px;
  @media screen and (max-width: 820px) {
    width: 350px;
  }
`;

export const ContentTitle = styled(Box)`
  padding: 0 35px 16px;
`;

export const ModalTitle = styled(Typography)`
  margin: 0;
  font-size: 20px !important;
  font-weight: 500;
  text-align: center;
  line-height: 25px;
  font-family: "Prompt" !important;
`;
