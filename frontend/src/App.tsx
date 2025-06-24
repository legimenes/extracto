import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import { BankStatements } from "./pages/BankStatements";

function App() {

  console.log('RENDER App');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="bank-statements" replace />} />
          <Route path="bank-statements" element={<BankStatements />} />
          {/* <Route path="activities" element={<Activities />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App