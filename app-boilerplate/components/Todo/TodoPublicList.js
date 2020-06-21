import React, { Fragment } from "react";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

import TaskItem from "./TaskItem";

// Run a subscription to get the latest public todo
const NOTIFY_NEW_PUBLIC_TODOS = gql`
  subscription notifyNewPublicTodos {
    todos(
      where: { is_public: { _eq: true } }
      limit: 1
      order_by: { created_at: desc }
    ) {
      id
      created_at
    }
  }
`;

const TodoPublicListSubscription = () => {
  const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);
  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error</span>;
  }
  return (
    <TodoPublicList latestTodo={data.todos.length ? data.todos[0] : null} />
  );
};

const TodoPublicList = (props) => {
  const state = {
    olderTodosAvailable: true,
    newTodosCount: 1,
    todos: [
      {
        id: "1",
        title: "This is public todo 1",
        user: {
          name: "someUser1",
        },
      },
      {
        id: "2",
        title: "This is public todo 2",
        is_completed: false,
        is_public: true,
        user: {
          name: "someUser2",
        },
      },
      {
        id: "3",
        title: "This is public todo 3",
        user: {
          name: "someUser3",
        },
      },
      {
        id: "4",
        title: "This is public todo 4",
        user: {
          name: "someUser4",
        },
      },
    ],
  };

  const loadNew = () => {};

  const loadOlder = () => {};

  let todos = state.todos;

  const todoList = (
    <ul>
      {todos.map((todo, index) => {
        return <TaskItem key={index} index={index} todo={todo} />;
      })}
    </ul>
  );

  let newTodosNotification = "";
  if (state.newTodosCount) {
    newTodosNotification = (
      <div className={"loadMoreSection"} onClick={loadNew}>
        New tasks have arrived! ({state.newTodosCount.toString()})
      </div>
    );
  }

  const olderTodosMsg = (
    <div className={"loadMoreSection"} onClick={loadOlder}>
      {state.olderTodosAvailable ? "Load older tasks" : "No more public tasks!"}
    </div>
  );

  return (
    <Fragment>
      <div className="todoListWrapper">
        {newTodosNotification}

        {todoList}

        {olderTodosMsg}
      </div>
    </Fragment>
  );
};

export default TodoPublicListSubscription;
