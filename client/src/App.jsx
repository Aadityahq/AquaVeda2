import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Aquaveda</h1>
      <p>Geo-intelligent water conservation platform foundation is live.</p>
      <Link to="/health">Check health</Link>
    </main>
  );
}

function Health() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Client Ready</h1>
      <p>The frontend scaffold is running.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </BrowserRouter>
  );
}