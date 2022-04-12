<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">hex-node-todoList</h3>

  <p align="center">
    練習 TodoList RESTful API
    <br />
    <br />
    <a href="https://serene-hamlet-24967.herokuapp.com">View Demo</a>
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
    <a href="#usage">Usage</a>
    <ul>
        <li><a href="#取得所有待辦事項">取得所有待辦事項</a></li>
        <li><a href="#新增單筆待辦事項">新增單筆待辦事項</a></li>
        <li><a href="#刪除所有待辦事項">刪除所有待辦事項</a></li>
        <li><a href="#刪除單筆待辦事項">刪除單筆待辦事項</a></li>
        <li><a href="#編輯單筆待辦事項">編輯單筆待辦事項</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

初學 Node.js 不使用框架建立 TodoList RESTful API

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nextjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### **取得所有待辦事項**

- **URL**

  /todos

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```
    {
      "status":"SUCCESS",
      "data":[
        {
          "id":"uuid",
          "title":"example"
        }
        ,...
      ]
    }
    ```

- **Sample Call:**

  ```c
  curl --location --request GET 'https://serene-hamlet-24967.herokuapp.com/todos'
  ```

### **新增單筆待辦事項**

- **URL**

  /todos

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  - **Content-Type**: application/json

  ```
  {
      "title":"example"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```
    {
      "status":"SUCCESS",
      "data":[
        {
          "id":"uuid",
          "title":"example"
        }
        ,...
      ]
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```
    {
      "status":"ERROR",
      "massage":"json parser error or other error"
    }
    ```

  OR

  - **Code:** 415 Unsupported Media Type <br />
    **Content:**
    ```
    {
     "status":"ERROR",
     "massage":"資料結構錯誤"
    }
    ```

- **Sample Call:**

  ```c
  curl --location --request POST 'https://serene-hamlet-24967.herokuapp.com/todos' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "title":"example"
  }'
  ```

### **刪除所有待辦事項**

- **URL**

  /todos

- **Method:**

  `DELETE`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```
    {
      "status":"SUCCESS",
      "data":[]
    }
    ```

- **Sample Call:**

  ```c
  curl --location --request DELETE 'https://serene-hamlet-24967.herokuapp.com/todos'
  ```

### **刪除單筆待辦事項**

- **URL**

  /todos/:id

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `id=[todoId]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```
    {
      "status":"SUCCESS",
      "data":[
        {
          "id":"uuid",
          "title":"example"
        }
        ,...
      ]
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```
    {
      "status":"ERROR",
      "massage":"json parser error or other error"
    }
    ```

  OR

  - **Code:** 404 Not Found <br />
    **Content:**
    ```
    {
     "status":"ERROR",
     "massage":"待辦事項不存在"
    }
    ```

- **Sample Call:**

  ```c
  curl --location --request DELETE 'https://serene-hamlet-24967.herokuapp.com/todos/f35f2a71-e3f6-407c-a287-eff76f27c224'
  ```

### **編輯單筆待辦事項**

- **URL**

  /todos/:id

- **Method:**

  `PATCH`

- **URL Params**

  **Required:**

  `id=[todoId]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```
    {
      "status":"SUCCESS",
      "data":[
        {
          "id":"uuid",
          "title":"example"
        }
        ,...
      ]
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**
    ```
    {
      "status":"ERROR",
      "massage":"json parser error or other error"
    }
    ```

  OR

  - **Code:** 404 Not Found <br />
    **Content:**

    ```
    {
     "status":"ERROR",
     "massage":"待辦事項不存在"
    }
    ```

  OR

  - **Code:** 415 Unsupported Media Type <br />
    **Content:**
    ```
    {
     "status":"ERROR",
     "massage":"資料結構錯誤"
    }
    ```

- **Sample Call:**

  ```c
  curl --location --request PATCH 'https://serene-hamlet-24967.herokuapp.com/todos/f0ad588a-c931-4612-8cad-ba5f6c969ff7' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "title":"example"
  }'
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Node.js API Docs](https://nodejs.org/dist/latest-v16.x/docs/api/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Albertnotes/Hex-Node-TodoList.svg?style=for-the-badge
[contributors-url]: https://github.com/Albertnotes/Hex-Node-TodoList/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Albertnotes/Hex-Node-TodoList.svg?style=for-the-badge
[forks-url]: https://github.com/Albertnotes/Hex-Node-TodoList/network/members
[stars-shield]: https://img.shields.io/github/stars/Albertnotes/Hex-Node-TodoList.svg?style=for-the-badge
[stars-url]: https://github.com/Albertnotes/Hex-Node-TodoList/stargazers
[issues-shield]: https://img.shields.io/github/issues/Albertnotes/Hex-Node-TodoList.svg?style=for-the-badge
[issues-url]: https://github.com/Albertnotes/Hex-Node-TodoList/issues
