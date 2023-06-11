<template>
    <div class="landing-page">
      <h1>Welcome to the Landing Page</h1>
      <p>Thank you for visiting!</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
  };
  </script>
  
  <style scoped>
  .landing-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
  }
  </style>