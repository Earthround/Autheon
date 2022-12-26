import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []); 

  return (
    <ThemeProvider theme={theme}>
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!data ? "Loading..." : data}
        </p>
      </header>
    </div>
    
    </ThemeProvider>
  );
}

export default App;
