// src/components/Sidebar.js
import React from "react";
import styled from "@emotion/styled";

const SidebarContainer = styled.div`
  width: 200px;
  padding: 16px;
  background-color: white;
  margin-right: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Sidebar = ({ expiredCount, activeCount, completedCount }) => (
  <SidebarContainer className="sidebar">
    <h3>Tasks Overview</h3>
    <div>Expired Tasks: {expiredCount}</div>
    <div>All Active Tasks: {activeCount}</div>
    <div>Completed Tasks: {completedCount}</div>
  </SidebarContainer>
);

export default Sidebar;
