import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CallList from './components/CallList';
import CallForm from './components/CallForm';
import CallDetails from './components/CallDetails';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Video Call App</h1>
          <div className="nav-links">
            <Link to="/">Calls</Link>
            <Link to="/add">Add Call</Link>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<CallList />} />
            <Route path="/add" element={<CallForm />} />
            <Route path="/edit/:id" element={<CallForm />} />
            <Route path="/call/:id" element={<CallDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;