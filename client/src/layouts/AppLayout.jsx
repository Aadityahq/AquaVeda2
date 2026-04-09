import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/health", label: "Health" },
  { to: "/issues-map", label: "Issues Map" }
];

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header-inner">
          <div>
            <p className="brand-kicker">AquaVeda</p>
            <h1 className="brand-title">Geo-Intelligent Water Conservation</h1>
          </div>

          <nav className="app-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link${isActive ? " nav-link-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container page-shell">
        <Outlet />
      </main>
    </div>
  );
}