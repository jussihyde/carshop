import Carlist from "./components/Carlist";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import './App.css';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CarShop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;
