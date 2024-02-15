# Cointab Assignment README

## Overview

This repository contains the solution for the assignment given by Cointab. The assignment involves creating a web application with two pages: a homepage and a postpage. The homepage displays user information fetched from a third-party API, allowing users to add new entries to the database. The postpage displays posts fetched from the same third-party API and allows users to download the posts in an Excel format after saving them to the database.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - SQL Database ( MySQL)

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

## Features

- Display all users from a third-party API on the homepage.
- Each user entry has an "Add" button to add the user to the database.
- After adding a user, the "Add" button changes to "Open" to indicate that the user is already in the database.
- Clicking on the "Open" button redirects the user to the postpage.
- Display all posts from a third-party API on the postpage.
- If a post does not exist in the database, display an "Add in Bulk" button to save all posts to the database.
- After saving posts to the database, the "Add in Bulk" button changes to "Download in Excel" to allow users to download the posts in an Excel file.

## Setup and Deployment

### Backend Deployment

1. Clone this repository to your local machine.
2. Navigate to the backend directory.
3. Install dependencies using `npm install`.
4. Configure the database connection in `config.js`.
5. Run the server using `npm start`.

### Frontend Deployment

1. Navigate to the frontend directory.
2. Open `index.html` in a web browser or deploy it to a web server.

## Video Presentation

A video presentation demonstrating the functionality and usage of the application is available [https://drive.google.com/file/d/1A2eHsdba0IUtpryieE_O9jnOvj1Ntvss/view?usp=sharing].

## Contributors

- sauravs4h

## Backend Deployment

https://cointab-derp.onrender.com

## Frontend deployment

https://cointabs4h.netlify.app/