export const rules = [
  {
    condition: (issue) =>
      issue.severity === "CRITICAL" &&
      issue.title.toLowerCase().includes("contamination"),
    result: [
      "Isolate water source immediately",
      "Use filtration systems",
      "Notify local authorities"
    ]
  },
  {
    condition: (issue) =>
      issue.severity === "HIGH" && issue.title.toLowerCase().includes("shortage"),
    result: [
      "Implement rainwater harvesting",
      "Use drip irrigation",
      "Reduce water wastage"
    ]
  },
  {
    condition: (issue) => issue.severity === "LOW",
    result: ["Monitor situation", "Promote water-saving habits"]
  }
];
