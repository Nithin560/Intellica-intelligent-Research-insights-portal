# 📡 Intellica — API Reference & Architecture Documentation

This document describes the backend RESTful API architecture, authentication flow, and endpoint specifications for the **Intellica Research Insights Portal**.

---

## 🔐 Authentication & Authorization Flow

The API utilizes JSON Web Tokens (JWT) for stateless authentication and Role-Based Access Control (RBAC).

### Roles Supported:
1. `FACULTY` — Submit research entries, upload proof documents, view personal credit ledger and ranking.
2. `HOD` — Approve or comment on department faculty uploads, review department analytics and rankings.
3. `ADMIN` — Institutional overview, approve HOD uploads, configure appraisal credit weightings, download college-wide reports.

### Header Requirement:
All protected endpoints require the following Bearer token header:
```http
Authorization: Bearer <jwt_token>
```

---

## 📋 API Endpoints Summary

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new faculty or HOD user | Public |
| `POST` | `/api/auth/login` | Initiate OTP-based login for an employee ID or email | Public |
| `POST` | `/api/auth/verify-otp` | Verify 6-digit OTP and receive JWT | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile details | Authenticated |
| `PUT` | `/api/auth/update-profile-image` | Upload profile image | Authenticated |

### 2. Research Uploads (`/api/uploads`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/uploads/create/:category` | Create research submission with PDF proof attachment | Faculty / HOD |
| `GET` | `/api/uploads/mine` | Retrieve authenticated user's submissions | Authenticated |
| `PUT` | `/api/uploads/update/:id/:category` | Update submission details or resubmit | Owner |
| `GET` | `/api/uploads/hod/pending` | List submissions awaiting HOD approval | HOD |
| `PUT` | `/api/uploads/hod/approve/:id` | Approve faculty research submission | HOD |
| `GET` | `/api/uploads/admin/pending` | List HOD submissions awaiting Admin approval | Admin |
| `PUT` | `/api/uploads/admin/approve/:id` | Approve HOD submission | Admin |
| `PUT` | `/api/uploads/discussion/:id` | Post review comment / request clarification | HOD / Admin |

### 3. Department & Faculty Management (`/api/hod` & `/api/faculty`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/hod/department-uploads` | Department-wide research activity ledger | HOD / Admin |
| `GET` | `/api/hod/faculty-list` | List all faculty members in department | HOD |
| `PUT` | `/api/hod/update-profile` | Update HOD academic IDs (Vidwan, Scopus, Google Scholar) | HOD |
| `GET` | `/api/faculty/profile` | View profile and calculated credits | Faculty |
| `PUT` | `/api/faculty/update-profile` | Update faculty academic profiles and IDs | Faculty |

### 4. Administration & Configuration (`/api/admin`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/admin/departments` | Total active departments overview | Admin |
| `GET` | `/api/admin/top-departments` | Ranked departments by cumulative research points | Admin |
| `GET` | `/api/admin/activity-stats` | Category-wise research counts across college | Admin |
| `GET` | `/api/admin/pending-uploads` | Global pending approval queue | Admin |
| `GET` | `/api/admin/all-users` | Directory of all faculty and HOD accounts | Admin |
| `PUT` | `/api/admin/approve-hod/:id` | Verify and activate pending HOD registration | Admin |

### 5. Credit Configuration & Reports (`/api/credit-config` & `/api/reports`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/credit-config` | Fetch active credit point rules across all categories | Authenticated |
| `PUT` | `/api/credit-config/update` | Update category credit point multipliers | Admin |
| `GET` | `/api/reports/faculty-excel` | Export individual faculty appraisal sheet (.xlsx) | Faculty / Admin |
| `GET` | `/api/reports/department-excel` | Export consolidated department research report | HOD / Admin |

---

## 🛡️ Security Middlewares
- **`securityMiddleware.js`**: Adds XSS protection, anti-clickjacking headers, and MIME sniffing protection.
- **`authMiddleware.js`**: Validates JWT validity and session state.
- **`normalizeCategory.js`**: Standardizes category slugs across URL params.
- **`uploadMiddleware.js`**: Multer disk storage validation ensuring PDF-only mime types up to 20MB.
