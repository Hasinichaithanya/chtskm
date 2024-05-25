import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: #f5f5f5;
`;

const UISlider = () => (
  <Nav>
    <Link to="/">To Do</Link>
    <Link to="/in-progress">In Progress</Link>
    <Link to="/done">Done</Link>
    <Link to="/timeout">Timeout</Link>
  </Nav>
);

export default UISlider;
