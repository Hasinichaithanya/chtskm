// src/components/TaskForm.js
import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const FormContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("to-do");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, deadline, status };
    try {
      const response = await axios.post("http://localhost:3001/tasks", newTask);
      onAdd(response.data);
      setTitle("");
      setDescription("");
      setDeadline("");
      setStatus("to-do");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  return (
    <FormContainer className="form-container">
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="timeout">Timeout</option>
        </select>
        <button type="submit">Add Task</button>
      </Form>
      {showSuccess && (
        <div className="notification success">
          <p>New task has been created successfully</p>
          <button onClick={() => setShowSuccess(false)}>Back</button>
        </div>
      )}
    </FormContainer>
  );
};

export default TaskForm;
