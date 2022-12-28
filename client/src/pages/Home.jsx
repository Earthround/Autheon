import React from "react";
import "../App.css";
import logo from "../logo.svg";
import Typography from "@mui/material/Typography";
function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Typography
          component="h1"
          variant="h1"
          fontWeight={"500"}
          alignSelf="center"
        >
          Welcome to Autheon!
        </Typography>
        <Typography variant="h5" sx={{ mt: 3 }}>
          Autheon is made by Jorund Sandnes as a Bachelor's thesis the Fall of
          2022.
          <br></br>
          It is a web application for authors wanting a social base to <br></br>{" "}
          interact with readers or other authors with more direct contact.
        </Typography>
      </header>
    </div>
  );
}

export default Home;
