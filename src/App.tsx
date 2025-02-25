import MonsterList from "./components/MonsterList";
import MonsterDetail from "./components/MonsterDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MonsterList />} />
        <Route path="/monster/:monsterIndex" element={<MonsterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
