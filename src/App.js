import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#f8f9fa'); // Initial background color

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const { content, author } = response.data;
      setQuote(content);
      setAuthor(author);
      // Generate a random background color
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      setBackgroundColor(randomColor);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div id="quote-box" className="App" style={{ backgroundColor }}>
      <div className="quote-container">
        <p id="text" className="quote">{quote}</p>
        <p id="author" className="author">- {author}</p>
      </div>
      <div className="button-container">
        <a id="new-quote"><button onClick={handleNewQuote}>New Quote</button></a>
        <button id="tweet-quote" onClick={shareOnTwitter}>Share on Twitter</button>
        <button onClick={shareOnFacebook}>Share on Facebook</button>
      </div>
    </div>
  );
}

export default App;
