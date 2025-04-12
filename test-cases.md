# OrangeHRM Test Cases

This document outlines the manual test cases created for the **OrangeHRM Demo Application**.

## Test Case Source
All the test cases are written in the Excel file located here:
https://docs.google.com/spreadsheets/d/102D_4BbzTEg6xk3L_3C6ddkrnRHRQiKM3ADkzp58fUY/edit?usp=sharing

The Excel file includes detailed columns:
- Test Case ID
- Test Case Description
- Pre-condition
- Test Steps
- Expected Result
- Actual Result
- Status

## Covered Test Cases List
The following key functionalities are covered in the test suite:
- Valid Login
- Invalid Login
- Logout Functionality
- View Employee List
- Add Employee
- Update Employee Info
- Delete Employee

Example test case: **User Login**
| Test Case ID | Test Case Description | Test Steps | Expected Result |
| TC_001 | Verify login with valid credentials | 1. Navigate to login page  <br> 2. Enter valid username and password <br> 3. Click the Login button | User is successfully logged in and redirected to dashboard |
