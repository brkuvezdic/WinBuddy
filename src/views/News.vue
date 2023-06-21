<template>
  <div>
    <h1 class="section-title">Latest eSports News</h1>

    <div class="news-section">
      <h2 class="section-heading">Featured News</h2>
      <div class="articles">
        <!-- Featured news articles -->
        <div class="article">
          <h3 class="article-title">Article 1 Title</h3>
          <p class="article-description">Article 1 Description</p>
        </div>
        <div class="article">
          <h3 class="article-title">Article 2 Title</h3>
          <p class="article-description">Article 2 Description</p>
        </div>
      </div>
    </div>

    <div class="news-section">
      <h2 class="section-heading">Tournaments</h2>
      <div class="articles">
        <!-- Tournament articles -->
        <div class="article">
          <h3 class="article-title">Tournament 1 Title</h3>
          <p class="article-description">Tournament 1 Description</p>
        </div>
        <div class="article">
          <h3 class="article-title">Tournament 2 Title</h3>
          <p class="article-description">Tournament 2 Description</p>
        </div>
      </div>
    </div>

    <div class="news-section">
      <h2 class="section-heading">Player Profiles</h2>
      <div class="articles">
        <!-- Player profile articles -->
        <div class="article">
          <h3 class="article-title">Player 1 Profile</h3>
          <p class="article-description">Player 1 Description</p>
        </div>
        <div class="article">
          <h3 class="article-title">Player 2 Profile</h3>
          <p class="article-description">Player 2 Description</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
}

.section-heading {
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
}

.articles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.article {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
}

.article-description {
  margin-top: 5px;
}

/* Additional styling based on your existing styles */

.news-section {
  margin-top: 30px;
}

.news-section:first-child {
  margin-top: 0;
}
</style>
