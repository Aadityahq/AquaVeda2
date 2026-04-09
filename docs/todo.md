# Aquaveda TODO

## 🔥 PHASE 1 — FOUNDATION

- [x] Backend setup
- [x] Frontend setup
- [x] Auth system
- [x] Role system (middleware)

## 🌊 PHASE 2 — WIKI SYSTEM

- [x] Article model
- [x] Create or edit article
- [x] Approval system
- [x] Expert verification
- [x] Ownership checks
- [x] User article view

## 🌍 PHASE 3 — GEO ISSUES

- [x] Issue model
- [x] Add issue
- [x] Geo queries (nearby)
- [x] Leaflet integration
- [x] Map filters

## 🤝 PHASE 4 — COMMUNITY

- [x] Comments system
- [x] Discussion threads

## 🧠 PHASE 5 — AI ENGINE

- [x] Rule-based recommendation engine
- [x] API endpoint

## 📊 PHASE 6 — DASHBOARD

- [ ] User dashboard
- [ ] Admin dashboard

## 🏗️ PHASE 7 — PROJECTS

- [x] Project model
- [x] Join project
- [x] Progress tracking (basic)

## 🎮 PHASE 8 — ENGAGEMENT

- [ ] XP system
- [ ] Contribution score
- [ ] Badges

---

## 🧪 FINAL

- [ ] Testing
- [ ] Deployment
- [ ] Documentation updates

---

## Execution Plan (April 2026)

### Sprint 1 (Current) - Access + Data Foundations

Goal: unlock secure user flows and stable data models so feature work can proceed safely.

- [ ] Auth API (register, login, me, logout)
- [x] Auth API (register, login)
- [x] Auth API (me)
- [ ] Auth API (logout)
- [x] JWT middleware + protected route guard
- [x] Role middleware (USER, EXPERT, ADMIN)
- [ ] User model with role and profile basics
- [x] Shared API response + error shape
- [x] Seed script for admin and expert test users

Exit criteria:

- [ ] User can sign up and log in from client
- [ ] Protected endpoint blocks unauthenticated requests
- [ ] Role-restricted endpoint blocks wrong role
- [ ] Postman collection (or equivalent) covers auth happy-path and failures

### Sprint 2 - Wiki MVP

Goal: ship first useful knowledge workflow with moderation hooks.

- [ ] Article model (title, body, tags, region, status, author)
- [x] Create draft article endpoint
- [x] Edit draft article endpoint
- [ ] Submit for review endpoint
- [x] Approve endpoint (EXPERT/ADMIN)
- [x] Reject endpoint (EXPERT/ADMIN)
- [ ] Client pages for article list, detail, create/edit
- [x] User article view endpoint (/mine)

Exit criteria:

- [x] USER can create and edit own draft
- [x] EXPERT/ADMIN can approve or reject
- [x] Only approved articles appear publicly

### Sprint 3 - Geo Issues MVP

Goal: enable issue reporting and map visualization.

- [x] Issue model (location, severity, images, status, owner)
- [x] Add issue endpoint with validation
- [x] List issues endpoint
- [x] Filter issues endpoint (region, severity, status)
- [x] Leaflet map view with markers and filters

Exit criteria:

- [x] Authenticated user can report an issue with coordinates
- [x] Map renders issues and supports basic filters

### Sprint 4 - Community + AI v1

Goal: bring collaboration and first recommendation value.

- [x] Comments on articles/issues
- [x] Thread replies (single depth initially)
- [x] Rule-based recommendation service
- [x] Recommendation endpoint by issue/article context

Exit criteria:

- [x] Users can discuss content via comments
- [x] Recommendation API returns deterministic suggestions from rule set

### Sprint 5 - Dashboards + Projects + Quality

Goal: complete impact loops and harden for release.

- [ ] User dashboard metrics
- [ ] Admin dashboard analytics
- [ ] Project model + join/leave + progress updates
- [ ] XP/badges basics tied to contributions
- [ ] API and UI tests for critical paths
- [ ] Deployment checklist and environment docs

Exit criteria:

- [ ] Core flows covered by tests
- [ ] Staging deployment passes smoke checks
- [ ] Docs updated for onboarding and runbooks

## Immediate Build Order

1. Auth and role middleware
2. User model + seed data
3. API standards (errors/responses/validation)
4. Wiki model and endpoints
5. Geo issue model and endpoints
6. Frontend integration for auth, wiki, and map

## Risks to Track

- Scope creep across phases without sprint cut-lines
- Missing validation and auth checks causing rework
- Map UX complexity (cluster/filter performance)
- Documentation drift if logs/context are not updated per feature

---

## 🎨 UI DEVELOPMENT PLAN (Execution-Ready)

### Sprint 6A - UI Foundation System

Goal: establish a consistent visual and layout foundation for all current and upcoming pages.

- [ ] Define design tokens in `client/src/styles.css`: color palette, spacing scale, typography scale, border radius, and shadows
- [ ] Create global utility classes in `client/src/styles.css`: containers, grids, stacks, section spacing, and responsive helpers
- [ ] Implement shared root layout in `client/src/layouts` and wire it in `client/src/App.jsx`
- [ ] Standardize page wrapper structure in `client/src/App.jsx` for Home, Health, and Issues Map routes
- [ ] Add baseline accessibility rules: visible focus states, minimum tap targets, and readable text contrast

Exit criteria:

- [ ] All active pages use shared spacing and typography rules
- [ ] Layout behavior is consistent across desktop and mobile breakpoints
- [ ] No inline style duplication for common page shell patterns

### Sprint 6B - Reusable Components + Map UX Upgrade

Goal: reduce UI duplication and improve map-page usability and clarity.

- [ ] Build reusable UI primitives (Button, Input, Select, Card, Alert, Loading) and integrate into `client/src/pages/IssueMapPage.jsx`
- [ ] Refactor map filter controls in `client/src/pages/IssueMapPage.jsx` to use common component styles
- [ ] Improve marker popup hierarchy in `client/src/components/IssueMap.jsx`: clearer title, severity or status chips, and action grouping
- [ ] Upgrade comment thread readability in `client/src/components/IssueMap.jsx`: spacing, indentation, and reply affordance
- [ ] Add clear loading, empty, and error UI states for issue, comment, and recommendation actions using `client/src/services/api.js` response patterns

Exit criteria:

- [ ] Map filters, popups, and comment blocks follow common UI components
- [ ] Users receive clear feedback for loading, success, empty, and failure states
- [ ] Existing issue-map behavior remains functionally unchanged

### Sprint 6C - Dashboard UI Foundations + QA Hardening

Goal: prepare UI architecture for dashboard work and lock quality standards.

- [ ] Create dashboard page shells in `client/src/pages`: user dashboard structure and admin dashboard structure
- [ ] Define reusable metric-card and panel patterns for dashboard views
- [ ] Add lightweight reusable hooks in `client/src/hooks` for async UI state handling and filter-state reuse
- [ ] Run accessibility pass across active pages: keyboard flow, labels, focus order, and contrast checks
- [ ] Run responsive pass across key widths: mobile, tablet, and desktop
- [ ] Run regression pass on map, comments, and AI suggestion flow in `client/src/components/IssueMap.jsx`

Exit criteria:

- [ ] Dashboard screens have production-ready UI scaffolding
- [ ] Primary interactions are keyboard-accessible
- [ ] UI is stable across major viewport sizes
- [ ] No regressions in map markers, comment actions, or recommendation retrieval

### Scope Boundary

- [ ] Included: frontend UI architecture, design consistency, accessibility baseline, responsive behavior, and interaction-state quality
- [ ] Excluded: backend API contract changes, auth logic changes, and deferred hybrid AI backend rollout

---

## Deferred Later (Not In Current Scope)

- [ ] Hybrid AI layer: keep rule-based engine as primary and add optional Gemini-powered contextual suggestions
- [ ] Add endpoint design for smart recommendations: ruleBased + aiGenerated response contract
- [ ] Trigger policy: call LLM only on explicit user action (never on every issue fetch)
- [ ] Add safeguards before rollout: rate limiting, caching, fallback behavior when LLM is unavailable
