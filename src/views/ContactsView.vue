<template>
    <SearchBar></SearchBar>
    <div class="contacts-view">
      <h1>Project Authors</h1>
      <ul>
        <li>
          <div class="contact">
            <div class="info">
              <h2>David Podeszwa </h2>
              <p>Login: xpodes05</p>
              <p>Email: xpodes05@stud.fit.vutbr.cz</p>
              <a href="https://github.com/Daveid105cz">GitHub</a>
            </div>
          </div>
        </li>
        <li>
          <div class="contact">
            <div class="info">
              <h2>Jana Petráňová</h2>
              <p>Login: xpetra21</p>
              <p>Email: xpetra21@stud.fit.vutbr.cz</p>
              <a href="https://github.com/kafka-mono">GitHub</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">

  import SearchBar from '../components/SearchBar.vue'
  
  export default {
    components: {

      SearchBar
    },

  };
  </script>

  <style>
  .contacts-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 30px;
    font-size: 50px;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .contact {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .contact img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .contact h2 {
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  .contact p {
    margin: 0;
  }
  </style>
  