import { createGlobalStyle } from "styled-components";
import { COLORS } from "../constants/colors";

export default createGlobalStyle`

    @import url("https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600&display=swap");

    body {
      margin: 0;
      background-color: #F5F8FC;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p,
    a,
    button, li, a, span, small, label {
    margin: 0;
    font-family: "Prompt";
    }

    a {
    color: #000;
    text-decoration: none;
    }

    button .gm-ui-hover-effect {
    margin: 5px !important;
    }

    textarea::placeholder {
    color: #aab5be;
    padding-bottom: 10px;
    }

    hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
    }
    .css-9gjnh6-MuiPaper-root-MuiAccordion-root, .css-h9554r {
        box-shadow: none !important;
        border: none !important;
    }
    .css-9gjnh6-MuiPaper-root-MuiAccordion-root:last-of-type {
      border-bottom-left-radius: 7px !important;
      border-bottom-right-radius: 7px !important;
    }
    .css-9gjnh6-MuiPaper-root-MuiAccordion-root:first-of-type {
      border-top-left-radius: 7px !important;
      border-top-right-radius: 7px !important;
    }
`;
