import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IssueMapPage from "./pages/IssueMapPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

function Home() {
  return (
    <section className="page-panel stack-md">
      <h2 className="page-title">Welcome to AquaVeda</h2>
      <p className="muted-text">
        Geo-intelligent water conservation platform foundation is live.
      </p>
      <div className="inline-actions">
        <Link className="button button-secondary" to="/health">
          Check Health
        </Link>
        <Link className="button button-primary" to="/issues-map">
          Open Issues Map
        </Link>
      </div>
    </section>
  );
}

function Health() {
  return (
    <section className="page-panel stack-sm">
      <h2 className="page-title">Client Ready</h2>
      <p className="muted-text">The frontend scaffold is running.</p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/issues-map" element={<IssueMapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}