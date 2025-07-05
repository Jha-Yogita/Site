import React from 'react';
import Hero from './components/Hero';
import AwesomeCard from './components/AwesomeCard';
import TodoList from './components/TodoList';
import WithVarsha from './components/WithVarsha';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Hero />
      <AwesomeCard />
     <TodoList listName="varsha" title="Things Varsha Has Done" done={true} />
      <TodoList listName="yashi" title="Things To Do With Yashi" done={false} />
      <WithVarsha />
      <Footer />
    </div>
  );
};

export default App;