<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/cmpt322-2025sp/project-404-not-found/">
    <img src="frontend/public/icon.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">Bob's Math Adventure</h3>

  <p align="center">
    Documentation of the Project
    <br />
    <a href="https://bobs-math-adventure.onrender.com"><strong>View Demo »</strong></a>
    <br />
    <br />
    Contributors' GitHub
    <br />
    <a href="https://github.com/uparogya">Arogya</a>
    &middot;
    <a href="https://github.com/Evball">Evan</a>
    &middot;
    <a href="https://github.com/Scottd28">Scott</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project was developed as part of the `Software Engineering` class (`CMPT 322`) at `Westminster University` during the `Spring 2025 semester`. Created by the team `404 Not Found`, the project served as a semester-long collaborative effort focused on applying software engineering principles to a real-world-style educational platform.

The system is designed for a hypothetical elementary school environment. Teachers log in as administrators to create classrooms, add students, and assign homework tasks. Students can be enrolled in multiple classes and may receive multiple assignments across subjects. They log in separately to complete educational games, collecting virtual eggs as part of their learning activities. Scores are automatically submitted to the backend, where teachers can view detailed reports on each student's historical progress, assignment performance, and class engagement over time. Students can also view their own past performance to track their learning growth.

Project Start Date: 17th Feb 2025
Project End Date: 23rd May 2025

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![MongoDB][MongoDB]][MongoDB-url]
* [![Express][Express.js]][Express-url]
* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

The backend server was built with Node.js and Express, managed using npm.
The frontend application was bootstrapped with Create React App and also managed using npm.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/cmpt322-2025sp/project-404-not-found/.git
   ```
2. Install NPM packages
   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Create `.env` files
   ```sh
   cd ../frontend && touch .env
   cd ../backend && touch .env
   ```
4. Add and modify the following secrets to `.env` files
   ```sh
   #frontend/.env:
   REACT_APP_PROCESSURL=http://localhost:3001/
   ```
   ```sh
   #backend/.env:
   EXPRESS_PORT=3001
   MONGODB_URI=your_mongo_db_url
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   ```
5. Run the server and app
   ```sh
   cd frontend && npm start
   cd backend && node index.js
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Login Page:
[![Login Page Screen Shot][product-screenshot-2]](https://bobs-math-adventure.onrender.com)
Game Page:
[![Game Page Screen Shot][product-screenshot-4]](https://bobs-math-adventure.onrender.com)
Student Assignments Page:
[![Student Page Screen Shot][product-screenshot-3]](https://bobs-math-adventure.onrender.com)
Admin Controls Page:
[![Admin Page Screen Shot][product-screenshot-1]](https://bobs-math-adventure.onrender.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

### Contributors:

<a href="https://github.com/cmpt322-2025sp/project-404-not-found/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=cmpt322-2025sp/project-404-not-found" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [README.md](https://github.com/othneildrew/Best-README-Template/blob/main/README.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/cmpt322-2025sp/project-404-not-found/.svg?style=for-the-badge
[contributors-url]: https://github.com/cmpt322-2025sp/project-404-not-found/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/cmpt322-2025sp/project-404-not-found/.svg?style=for-the-badge
[forks-url]: https://github.com/cmpt322-2025sp/project-404-not-found/network/members
[product-screenshot-1]: frontend/public/screenshots/ss_1.png
[product-screenshot-2]: frontend/public/screenshots/ss_2.png
[product-screenshot-3]: frontend/public/screenshots/ss_3.png
[product-screenshot-4]: frontend/public/screenshots/ss_4.png
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/