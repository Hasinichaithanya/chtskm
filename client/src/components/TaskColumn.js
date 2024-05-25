// src/components/TaskColumn.js
import React from "react";
import styled from "@emotion/styled";
import TaskCard from "./TaskCard";

const Column = styled.div`
  flex: 1;
  padding: 0 10px;
  min-width: 300px;
`;

const ColumnTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const TaskColumn = ({ title, tasks, onUpdate }) => (
  <Column>
    <ColumnTitle>{title}</ColumnTitle>
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
    ))}
  </Column>
);

export default TaskColumn;
