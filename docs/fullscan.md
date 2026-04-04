# CyberShield Full Scan

## Status

This report captures the highest-signal findings from a deep scan of the CyberShield repository.

## Critical Findings

1. Auth middleware can emit duplicate responses.
- File: [server/src/middlewares/authMiddleware.js](../server/src/middlewares/authMiddleware.js)
- Risk: response handling bug can produce "headers already sent" errors.
- Fix: return immediately in the missing-token branch and preserve a single response path.

2. Encryption utility uses a weak fallback secret.
- File: [server/src/utils/encryption.js](../server/src/utils/encryption.js)
- Risk: sensitive report data is protected with a default secret when ENCRYPTION_KEY is missing.
- Fix: fail fast if the env variable is missing or too short.

3. Public report listing can expose sensitive data.
- File: [server/src/routes/reportRoutes.js](../server/src/routes/reportRoutes.js)
- Risk: unauthenticated access to reports can leak user-generated content and metadata.
- Fix: protect the route or split public read from private ownership views.

## High Findings

4. OTP values are stored in plaintext.
- File: [server/src/models/User.js](../server/src/models/User.js)
- Risk: DB compromise can reveal live verification codes.
- Fix: hash OTPs or store only a verification token fingerprint.

5. Password reset tokens are emailed in plaintext.
- File: [server/src/controllers/authController.js](../server/src/controllers/authController.js)
- Risk: anyone with mailbox access can reset passwords.
- Fix: shorten token TTL, avoid exposing raw tokens where possible, and consider one-time reset links.

6. Password reset clears suspension state.
- File: [server/src/controllers/authController.js](../server/src/controllers/authController.js)
- Risk: admin suspension can be bypassed.
- Fix: keep suspension separate from password recovery.

7. Upload handling lacks a file-size limit.
- File: [server/src/middlewares/uploadMiddleware.js](../server/src/middlewares/uploadMiddleware.js)
- Risk: denial-of-service via oversized uploads.
- Fix: set multer limits and validate file types.

8. AI endpoints need explicit input caps.
- File: [server/src/controllers/aiController.js](../server/src/controllers/aiController.js)
- Risk: oversized text can cause memory pressure and slow processing.
- Fix: validate length on all incoming text fields.

## Medium Findings

9. Auth routes need rate limiting.
- File: [server/src/routes/authRoutes.js](../server/src/routes/authRoutes.js)
- Risk: brute force, OTP spam, and account abuse.
- Fix: add route-specific limiters for register, resend-otp, forgot-password, and reset-password.

10. JWT expiry is relatively long.
- File: [server/src/utils/generateToken.js](../server/src/utils/generateToken.js)
- Risk: leaked tokens stay valid for too long.
- Fix: shorten expiry or introduce refresh-token flow.

11. Forum listing may need pagination.
- File: [server/src/controllers/forumController.js](../server/src/controllers/forumController.js)
- Risk: large datasets can slow the response.
- Fix: add paging and query limits.

12. Frontend relies too much on localStorage for auth state.
- File: [client/src/components/PrivateRoute.jsx](../client/src/components/PrivateRoute.jsx)
- Risk: tampering with client state can mislead UI authorization.
- Fix: add token validation or session refresh checks.

13. Dashboard duplication exists.
- File: [client/src/pages/dashboard/UserDashboard.jsx](../client/src/pages/dashboard/UserDashboard.jsx)
- Risk: dead code and future maintenance confusion.
- Fix: delete or archive legacy component; the active dashboard is [client/src/pages/dashboard/Dashboard.jsx](../client/src/pages/dashboard/Dashboard.jsx).

14. Logout behavior is inconsistent.
- Files: [client/src/components/layout/Navbar.jsx](../client/src/components/layout/Navbar.jsx), [client/src/components/layout/AdminNavbar.jsx](../client/src/components/layout/AdminNavbar.jsx)
- Risk: mixed localStorage cleanup can create stale UI state.
- Fix: centralize logout utility.

## Low Findings and Improvements

15. Missing .env.example files.
- Risk: new contributors lack configuration guidance.
- Fix: add example env files for server, client, and ai-service.

16. Client API URL is undocumented.
- File: [client/src/services/api.js](../client/src/services/api.js)
- Risk: developers may not realize VITE_API_URL is configurable.
- Fix: document it in onboarding and env setup files.

17. Multiple startup scripts need a canonical recommendation.
- Files: root launcher scripts and npm entry points.
- Risk: contributor confusion.
- Fix: document one recommended launch path per OS.

## Positive Findings

- Security middleware exists and is reasonably layered.
- OTP attempt limiting is already implemented.
- The dashboard architecture is modular.
- The codebase already has strong docs discipline compared with typical student projects.

## Recommended First Fixes

1. Fix auth middleware response flow.
2. Remove weak encryption fallback.
3. Add file-size and text-length limits.
4. Protect sensitive report access.
5. Replace plaintext reset-token flow with safer reset-link design.
