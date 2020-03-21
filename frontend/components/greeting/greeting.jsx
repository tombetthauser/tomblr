import React from 'react';
import { Link } from 'react-router-dom';

const GREETINGS = [["welcome back ", ""]];

const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <div>
      <div className="background-animation-div"></div>
      <header>
        <Link to="/" className="header-link">
          <h1>tomblr</h1>
        </Link>
      </header>
      <nav className="login-signup">
        <p>Come for what you love.<br/>Stay for what you discover.</p>
        <Link to="/signup">Get Started</Link>
        <Link to="/login">Log In</Link>
      </nav>
    </div>
  );
  const randGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  const personalGreeting = () => (
    <div>
      <header>
        <Link to="/" className="header-link">
          <h1>tomblr</h1>
        </Link>
      </header>
      <hgroup className="header-group">
        <h2 className="header-name">{randGreeting[0]}{currentUser.username.toLowerCase()}{randGreeting[1]}</h2>
        <Link to="/"><button className="header-button" onClick={logout}>logout</button></Link>
      </hgroup>
    </div>
  );
  return currentUser ? personalGreeting() : sessionLinks();
};

export default Greeting;