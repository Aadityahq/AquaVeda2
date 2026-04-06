import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const severityColors = {
  LOW: "#22c55e",
  MEDIUM: "#f59e0b",
  HIGH: "#ef4444",
  CRITICAL: "#991b1b"
};

export default function IssueMap({ issues }) {
  return (
    <MapContainer center={[23.52, 87.32]} zoom={10} className="issue-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {issues.map((issue) => (
        <CircleMarker
          key={issue.id}
          center={[issue.coordinates[1], issue.coordinates[0]]}
          radius={8}
          pathOptions={{
            color: severityColors[issue.severity] || "#0f766e",
            fillOpacity: 0.8
          }}
        >
          <Popup>
            <strong>{issue.title}</strong>
            <br />
            Severity: {issue.severity}
            <br />
            Status: {issue.status}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
