# Ems System — Employee Management System

A beginner-friendly React + Vite employee management dashboard. All demo records and preferences are saved in the browser's `localStorage`; no backend or real authentication is configured.

## Run locally

1. Install Node.js 20.19+ (or 22.12+).
2. Open this folder in VS Code or a terminal.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite.
5. For a production build, run `npm run build` and optionally `npm run preview`.

## Included modules

- Dashboard: live totals for employees, active employees, departments and pending leave requests.
- Employee directory: add, edit, view and delete; name/ID/email search; department and status filters; sorting and pagination.
- Employee profile: personal and employment details with a working edit shortcut.
- Departments: add, edit and delete; employee counts; prevents deletion while employees are assigned; renaming a department updates linked employee records.
- Leave requests: search, status filters, approve/reject confirmation and live counts.
- Attendance: date selection, search, status filters, daily summary and editable attendance status.
- Settings: administrator profile, light/dark theme and saved notification preferences.
- Responsive layout: collapsible desktop sidebar, mobile navigation drawer, scrollable tables and responsive forms.

## Demo data and reset

Demo employees, departments, leave requests and attendance are loaded the first time the app runs. Updates are stored under `ems_employees`, `ems_departments`, `ems_leaves`, `ems_attendance`, `ems_admin_profile`, `ems_theme` and `ems_notifications` in browser localStorage.

To reset the demo, open browser DevTools → Application (or Storage) → Local Storage, delete the keys beginning with `ems_`, then refresh.

## Notes

- This is a frontend demonstration. Data is local to the browser and does not sync between users or devices.
- Notification preferences are saved as settings; the app does not send emails or push notifications.
- There is no server-side authentication, authorization or database integration.
