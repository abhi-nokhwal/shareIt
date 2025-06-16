import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import DownloadPage from "./components/DownloadPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/download/:uuid" element={<DownloadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
