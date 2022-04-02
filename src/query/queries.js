import { gql } from "@apollo/client";

const getTodoQuery = gql`
query MyQuery {
    todo {
      id
      text
      active
    }
  }
`;

const addNewTodo = gql`
mutation MyMutation($text: String!) {
    insert_todo_one(object: {text: $text}) {
      id
    }
  }
`;

const deleteTodo = gql`
mutation MyMutation($id: Int!) {
    delete_todo_by_pk(id: $id) {
      id
    }
  }
`;

const toogleActive = gql`
mutation MyMutation($id: Int!,$active: Boolean!){
    update_todo_by_pk(pk_columns: {id: $id}, _set: {active: $active}) {
      active
    }
  }
`
const getNonCompleteCount = gql`
query MyQuery {
    todo_aggregate(where: {active: {_eq: true}}) {
      aggregate {
        count(columns: id)
      }
    }
  }
`
const deleteCompletedTodo = gql`
mutation MyMutation {
    delete_todo(where: {active: {_eq: false}})
    {
        affected_rows
    }
  }
`
const updateTodo = gql`
mutation MyMutation($id: Int!, $text: String!) {
  update_todo_by_pk(pk_columns: {id: $id}, _set: {text: $text}) {
    text
  }
}
`

const setActiveMutation=gql`
mutation MyMutation($active: Boolean!) {
  update_todo(where: {}, _set: {active: $active}){
    affected_rows
  }
}
`

export { getTodoQuery, addNewTodo, deleteTodo, toogleActive, getNonCompleteCount, deleteCompletedTodo, updateTodo, setActiveMutation };