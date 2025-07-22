// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LessonsPage from "./pages/LessonsPage";
import UploadPage from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LessonsPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analysis/:id" element={<AnalysisPage />} />

      </Routes>
    </BrowserRouter>
  );
}
