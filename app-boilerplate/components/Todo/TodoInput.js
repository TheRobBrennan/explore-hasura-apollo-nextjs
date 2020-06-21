import React from "react";
import gql from "graphql-tag";

export const ADD_TODO = gql`
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`;

const TodoInput = ({ isPublic = false }) => {
  return (
    <form
      className="formInput"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input className="input" placeholder="What needs to be done?" />
      <i className="inputMarker fa fa-angle-right" />
    </form>
  );
};

export default TodoInput;
