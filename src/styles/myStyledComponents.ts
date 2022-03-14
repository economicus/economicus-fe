import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const HighlightedTextLink = styled(Link)`
  margin: 10px;
  display: inline-block;
  color: black;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 8px;
    transition: all 0.2s;
    background: rgba(144, 169, 219, 50%);
  }

  &:hover:after {
    width: 100%;
  }
`;

export const HighlightedTextButton = styled("button")`
  border: none;
  background-color: inherit;
  font-size: 16px;
  cursor: pointer;

  margin: 10px;
  padding: 0;
  display: inline-block;
  color: black;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 8px;
    transition: all 0.2s;
    background: rgba(144, 169, 219, 50%);
  }

  &:hover:after {
    width: 100%;
  }
`;
