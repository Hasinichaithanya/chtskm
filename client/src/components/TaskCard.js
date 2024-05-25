// src/components/TaskCard.js
import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskCard = ({ task, onUpdate }) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`http://localhost:3001/tasks/${task._id}`, {
        status: newStatus,
      });
      setStatus(newStatus);
      onUpdate();
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  return (
    <Card className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <p>
        Status:
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="timeout">Timeout</option>
        </select>
      </p>
    </Card>
  );
};

export default TaskCard;
