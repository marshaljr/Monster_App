import MonsterList from "./components/MonsterList";
import MonsterDetail from "./components/MonsterDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MonsterList />} />
          <Route path="/monster/:monsterIndex" element={<MonsterDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
