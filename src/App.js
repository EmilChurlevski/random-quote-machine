import React, {useState, useEffect} from 'react';
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
      const {content, author} = response.data;
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

  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote}" - ${author}`
  )}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}`;

  return (
    <div id="quote-box" className="App" style={{backgroundColor}}>
      <div className="quote-container">
        <p id="text" className="quote">{quote}</p>
        <p id="author" className="author">- {author}</p>
        <br/>
        <div className="button-container">
          <span>
            <a
              id="tweet-quote"
              href={twitterIntentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className='icon'
            >
              <i className="fab fa-twitter"></i>
              Share on Twitter
          </a>
          </span>
          <span>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className='icon'
          ><i className="fab fa-facebook"></i>
            Share on Facebook
          </a>
          </span>
        </div>
      </div>
      <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
    </div>
  );
}

export default App;
