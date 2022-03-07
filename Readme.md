<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h1 align="center">Express File Manager</h1>

  <p align="center">
    Api for uploading & downloading files
    <br/>
    <a href="https://arcane-river-51599.herokuapp.com/">Demo</a>
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
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project contains APIs for uploading files associated with userIds, storing them locally, and for downloading them given the files' names.

We use mongoDB for storing the files for each user, as well as for storing the metadata for each file (like file's size, upload time, and a reference for the file in the local storage).

You can test the api's endpoints using this [link](https://arcane-river-51599.herokuapp.com/).

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Mongo(Atlas)](https://www.mongodb.com/atlas/database)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Please make sure that you have the following installed on your machine first.

- npm
  ```sh
  npm install npm@latest -g
  ```
- node.js

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Ahmed-ShawkyEgy/Express-Files-Uploader.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a '.env' file in the root folder, and add your mongo db's connection string in a variable called `MONGO_CONNECTION` like below
   ```sh
   MONGO_CONNECTION=mongodb+srv://<username>:<password>@cluster....
   ```
4. Run the server with the following command

   ```sh
   npm run serve
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Below are the descriptions for the 3 api endpoints of this app

### **Upload File(s)**

Uploads one or more files. You can test this endpoint either by using the simple interface on the '/' route, or through postman or any similar tool with the body type being form-data/multipart.

**IMPORTANT** If you're using postman, please note that the order in which you insert your parameters actually matters. It has to be `userName` first, then `randomFiles`.

```sh
POST /api/files
```

| Parameter   |           Description            |
| ----------- | :------------------------------: |
| userName    |     The user's name (or id)      |
| randomFiles | The file or files to be uploaded |

### **Fetch files metadata**

Given a user's name/id, this endpoint returns all of the metadata of the files belonging to him.

```sh
GET /api/files/:userId
```

| Path Parameter |       Description       |
| -------------- | :---------------------: |
| userId         | The user's name (or id) |

_Response Sample_

```json
[
  {
    "fileName": "1646573364166-693291368.jpg",
    "originalName": "51e6dd454d4faa0df7c5d57bc32f3e7b1d3ac3e45551754877297cd69e_640.jpg",
    "fileSize": 183675,
    "uploadTimestamp": 1646573364224,
    "_id": "6224b734d8d48df3b8537e70"
  }
]
```

### **Download a file**

Given a user's name and a file's name, this endpoint downloads the file if it exists.

```sh
GET /api/download?
```

| Query Parameter |                                Description                                |
| --------------- | :-----------------------------------------------------------------------: |
| userName        |                          The user's name (or id)                          |
| fileName        | Either the file's original name, or it's unique name in the local storage |

<p align="right">(<a href="#top">back to top</a>)</p>
