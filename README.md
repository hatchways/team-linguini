<img src="client\public\images\logo.png" alt="Kanban logo" title="Kanban" align="right" height="50" />

# Kanban Boards
A web app that helps users visualize their projects all in one place. You can create different boards containing columns and cards and drag cards across columns. In each of the task cards you can set deadlines, add descriptions and notes/comments about the task. You can color coat the tasks by different categories (e.g. red= urgent, blue= revist, green = easy etc.). You can also see a calendar view of your tasks, organized by deadlines.

## Tech Stack
### Frontend
* React.js - The frontend library used
* Context/Reducer Hooks - Application state management
* Material UI - Design components used for rapid prototyping with CSS-in-JS
* React Beautiful DND - The library used for drag and drop functionality
* Fullcalendar.io - The library used for the calendar component
### Backend
* Express/Node.js - The backend framework and language
* MongoDB - The database in action
* JWT & Bcrypt - Authentication mechanism along with password salting and hashing
* Twilio SendGrid - Email Delivery Service
* Amazon AWS S3 - Cloud data storage for photos and attachments

## Installations
### Prerequisites
Node.js, NPM/YARN and MongoDB

### Setting up API Keys and .env variables
This application requires API keys from:
* [Twilio SendGrid](https://sendgrid.com/)
    * Set up an account and create an API key in settings
    * Validate the account from which you will be sending emails in settings
* Add a .env file in the `server` directory with the key-value pairs matching the `.env.example` file