// src/components/SearchBar.js
import React from "react";
import styled from "@emotion/styled";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FilterButton = styled.button`
  margin-left: 8px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const SearchBar = ({ searchQuery, setSearchQuery, filter, setFilter }) => (
  <SearchContainer className="search-bar">
    <Input
      type="text"
      placeholder="Search Project"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <FilterButton onClick={() => setFilter(!filter)}>
      {filter ? "Clear Filter" : "Filter"}
    </FilterButton>
  </SearchContainer>
);

export default SearchBar;
