// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";

const Container = styled.div`
  display: flex;
  padding: 16px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  &:hover {
    color: #0056b3;
  }
`;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const expiredCount = tasks.filter(
    (task) => new Date(task.deadline) < new Date()
  ).length;
  const activeCount = tasks.filter(
    (task) => task.status !== "done" && task.status !== "timeout"
  ).length;
  const completedCount = tasks.filter((task) => task.status === "done").length;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
      />
      <Navbar>
        <NavLink to="/">To Do</NavLink>
        <NavLink to="/in-progress">In Progress</NavLink>
        <NavLink to="/done">Done</NavLink>
        <NavLink to="/timeout">Timeout</NavLink>
      </Navbar>
      <Container>
        <Sidebar
          expiredCount={expiredCount}
          activeCount={activeCount}
          completedCount={completedCount}
        />
        <Routes>
          <Route
            path="/"
            element={
              <TaskColumn
                title="To Do"
                tasks={filteredTasks.filter((task) => task.status === "to-do")}
                onUpdate={handleUpdateTaskStatus}
              />
            }
          />
          <Route
            path="/in-progress"
            element={
              <TaskColumn
                title="In Progress"
                tasks={filteredTasks.filter(
                  (task) => task.status === "in-progress"
                )}
                onUpdate={handleUpdateTaskStatus}
              />
            }
          />
          <Route
            path="/done"
            element={
              <TaskColumn
                title="Done"
                tasks={filteredTasks.filter((task) => task.status === "done")}
                onUpdate={handleUpdateTaskStatus}
              />
            }
          />
          <Route
            path="/timeout"
            element={
              <TaskColumn
                title="Timeout"
                tasks={filteredTasks.filter(
                  (task) => task.status === "timeout"
                )}
                onUpdate={handleUpdateTaskStatus}
              />
            }
          />
        </Routes>
        <TaskForm onAdd={handleAddTask} />
      </Container>
    </Router>
  );
};

export default App;
