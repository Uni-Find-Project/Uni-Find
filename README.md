# 🎓 Uni-Find – Lost and Found Campus Application

**A Web-Based Lost and Found Campus Application with Image Matching Support**

Uni-Find is a university-focused Lost and Found web application designed to help students and staff report, search for, and recover lost belongings within the campus environment.

The project aims to provide a centralized platform that simplifies lost-and-found management and improves communication between campus members.

---

## 📌 Project Overview

Losing personal belongings within a university campus can be frustrating. Traditional lost-and-found processes often make it difficult to identify missing items and connect them with their owners.

Uni-Find aims to address this problem through a centralized web-based platform.

### 🎯 Project Objectives

- Provide a centralized lost-and-found management system.
- Allow users to report lost and found items.
- Make searching for missing belongings easier.
- Support image-based item identification.
- Simplify the item claiming process.
- Improve communication among university students and staff.

---

## ✨ Main Features

### 👤 User Management
- User Registration
- User Login
- Password Management
- OTP-related functionality
- User Activity Management

### 🔍 Lost and Found Management
- Report Lost Items
- Report Found Items
- Search for Items
- View Item Information
- Image Matching Support
- Claim Found Items

### 📋 User Activities
- View Personal Activities
- Track Submitted Reports
- Manage Item-related Activities

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Frontend Structure |
| CSS3 | User Interface Design |
| JavaScript | Client-side Functionality |
| PHP | Backend Development |
| MySQL | Database Management |
| XAMPP | Local Development Environment |
| phpMyAdmin | Database Administration |
| Git | Version Control |
| GitHub | Source Code Hosting |

---

## 📂 Project Structure

```text
UniFind_Website/
│
├── BA Documentation/
│   ├── UniFind_Website_Sitemap.pdf
│   ├── UniFind_User_Flow_Diagrams.pdf
│   ├── UniFind_BA_Requirements_Document_v1.4_Approved.docx
│   └── UniFind_BA_Requirements_Document_v1.4_Approved.pdf
│
├── Backend/
│   ├── change_password.php
│   ├── claim.php
│   ├── db.php
│   ├── login.php
│   ├── my_activity.php
│   ├── register.php
│   ├── report.php
│   └── send_otp.php
│
├── Frontend/
│   ├── app.js
│   ├── index.html
│   ├── styles.css
│   └── START_HERE.bat
│
├── README.md
│
└── UniFind_QA_Report_18_Oct_new.xlsx
```

---

## 🚀 Getting Started

### Prerequisites

- Windows 10/11
- Google Chrome or another modern web browser
- Visual Studio Code (recommended)
- XAMPP (for PHP and MySQL backend development)

### Step 1 – Download the Project

Clone the repository:

```bash
git clone https://github.com/Uni-Find-Project/Uni-Find.git
```

Alternatively, download the repository as a ZIP file from GitHub.

### Step 2 – Extract the Project

Extract the downloaded ZIP file into your preferred directory.

### Step 3 – Run the Frontend

Navigate to the `Frontend` folder.

You can run the application by:

1. Double-clicking `START_HERE.bat`.
2. Alternatively, opening `index.html` using a web browser.

### Step 4 – Backend Development Environment

For PHP backend development:

1. Install and open XAMPP.
2. Start Apache and MySQL.
3. Place the project in the XAMPP `htdocs` directory.
4. Configure the PHP database connection.
5. Import the appropriate database SQL backup when available.

**Note:** The frontend prototype and PHP backend components should be configured and tested together before treating the complete application as a production-ready integrated system.

---

## 🗄️ Database

The project includes PHP database connectivity components.

Database configuration is managed through:

```text
Backend/db.php
```

Database setup requires:

- MySQL Server
- phpMyAdmin
- A compatible Uni-Find SQL database backup

Update database connection settings according to your local environment.

---

## 🔐 Security Considerations and Limitations

The original frontend prototype uses browser `localStorage` to store demo accounts, reports, and claims.

Important limitations:

- Local data is stored within the browser.
- Data is not automatically shared across different devices.
- Browser data can be cleared by users.
- Demo password hashing is not equivalent to production authentication.
- The demo password-reset process does not verify email ownership or send a real reset link.
- University email addresses are not verified in the original prototype.

For a real public deployment, implement:

- Secure server-side authentication.
- Server-side password hashing (e.g. Argon2id or bcrypt).
- HTTPS connections.
- Secure session management.
- Email verification.
- Rate limiting.
- CSRF protection.
- Verified password-reset functionality.

Do not use real or reused passwords in the demo prototype.

Never commit actual database passwords, API keys, or other sensitive credentials to a public repository.

---

## 🧪 Quality Assurance

Quality Assurance documentation is maintained as part of the project.

Testing areas include:

- User Registration
- User Login
- Password Management
- Lost Item Reporting
- Found Item Reporting
- Item Searching
- Item Claiming
- User Activity Management

Refer to the Excel QA report in the repository for detailed test cases and results.

---

## 📚 Project Documentation

The `BA Documentation` folder contains:

- Website Sitemap
- User Flow Diagrams
- Approved Business Requirements Document (Version 1.4)

These documents describe the project requirements, system structure, and user workflows.

---

## 👥 Project Information

| Field | Details |
|---|---|
| Project Name | Uni-Find |
| Project Type | Web Application |
| Application Domain | University Lost and Found Management |
| Repository | Uni-Find |
| Hosting Platform | GitHub |

### GitHub Repository

https://github.com/Uni-Find-Project/Uni-Find

---

## 📄 License

This project is developed for educational and academic purposes.

---

⭐ **Uni-Find – Making Lost Things Easier to Find!**