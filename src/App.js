import './App.css';
import AddTodo from './components/AddTodo';
import ShowTodoList from './components/ShowTodoList';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


function App() {
  console.log(process.env.REACT_APP_URL);
  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_URL}`,
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AddTodo />
        <ShowTodoList />
        <p id="dc">Double-click to edit a todo</p>
      </div>
    </ApolloProvider>


  );
}

export default App;
