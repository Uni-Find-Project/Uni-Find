UniFind - UI-matched frontend prototype

HOW TO RUN
1. Extract the ZIP file.
2. Open the UniFind_Website folder.
3. Double-click index.html.

ACCOUNT DEMO
- Choose Login > Create an account.
- Enter your name, email and a password (minimum 8 characters).
- Log out from the top navigation, then log in using the same email and password.
- Forgot Password is a local demo reset; it does NOT verify email ownership or send a reset link.

IMPORTANT LIMITATIONS
This is a frontend-only prototype. Accounts, reports and claims are stored in this browser's localStorage; they are not shared across devices and can be cleared by the user. Passwords are hashed in the browser for demo purposes, but this is NOT production authentication. For a real public deployment, implement backend authentication, server-side password hashing (e.g. Argon2id/bcrypt), secure HttpOnly sessions, email verification, rate limiting, CSRF protections as appropriate, and a verified password-reset email flow. Do not use a real/reused password in this prototype. University emails are not verified.
