<template>
  <div>
    <h1 class="section-title">Cloud9: Best eSports Team 2023</h1>

    <div class="news-section">
      <div class="articles">
        <div
          v-for="profile in playerProfiles"
          :key="profile.id"
          class="article"
          :class="{ expanded: profile.expanded }"
          @click="expandProfile(profile)"
        >
          <div class="article-image">
            <img
              :src="require(`../assets/${profile.image}`)"
              alt="Profile Image"
            />
            <div class="article-overlay">
              <h3 class="article-title">
                {{ profile.title }}
                <span class="country-emoji">{{ profile.countryEmoji }}</span>
              </h3>
            </div>
          </div>
          <div class="expanded-content" v-if="profile.expanded">
            <p class="article-description">
              {{ profile.description }}
              <span class="country-emoji">{{ profile.countryEmoji }}</span>
            </p>
            <p class="additional-info">{{ profile.additionalInfo }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="expandedArticle"
      class="expanded-article"
      @click="closeExpandedArticle"
    >
      <div class="expanded-content" @click.stop>
        <div class="expanded-image">
          <img
            :src="require(`../assets/${expandedArticle.image}`)"
            alt="Expanded Image"
          />
        </div>
        <h3 class="article-title">{{ expandedArticle.title }}</h3>
        <p class="article-description" v-if="expandedArticle.expanded">
          {{ expandedArticle.description }}
          <span class="country-emoji">{{ expandedArticle.countryEmoji }}</span>
        </p>
        <p class="additional-info" v-if="expandedArticle.expanded">
          {{ expandedArticle.additionalInfo }}
        </p>
        <button class="close-button" @click="closeExpandedArticle">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerProfiles: [
        {
          id: 1,
          title: "Fudge",
          description: "Ibrahim Allami",
          additionalInfo: "KDA 9.6 | Most played champion: Riven",
          image: "igrac1.png",
          expanded: false,
        },
        {
          id: 2,
          title: "Imenko",
          description: "Robert Huang",
          additionalInfo: "KDA 5.2 | Most played champion: Sejuani",
          image: "igrac2.png",
          expanded: false,
        },
        {
          id: 3,
          title: "Emenes",
          description: "Jang Min-Soo",
          additionalInfo: "KDA 5.5 | Most played champion: Kassadin",
          image: "igrac3.png",
          expanded: false,
        },
        {
          id: 4,
          title: "Berserker",
          description: "Min Kim",
          additionalInfo: "KDA 7.3 | Most played champion: Jinx",
          image: "igrac4.png",
          expanded: false,
        },
        {
          id: 5,
          title: "Zven",
          description: "Jesper Svenningsenn",
          additionalInfo: "KDA 1.9 | Most played champion: Thresh",
          image: "igrac5.png",
          expanded: false,
        },
        {
          id: 6,
          title: "Mithy",
          description: "Mithoel Swag",
          additionalInfo: "Coach experience: 8 years",
          image: "coach.png",
          expanded: false,
        },
      ],
      expandedArticle: null,
    };
  },
  methods: {
    expandArticle(article) {
      if (!this.expandedArticle) {
        article.expanded = true;
        this.expandedArticle = article;
      }
    },
    expandTournament(tournament) {
      if (!this.expandedArticle) {
        tournament.expanded = true;
        this.expandedArticle = tournament;
      }
    },
    expandProfile(profile) {
      if (!this.expandedArticle) {
        profile.expanded = true;
        this.expandedArticle = profile;
      }
    },
    closeExpandedArticle() {
      if (this.expandedArticle) {
        this.expandedArticle.expanded = false;
        this.expandedArticle = null;
      }
    },
  },
};
</script>

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
  max-height: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.article {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.article.expanded {
  transform: scale(0);
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
}

.article-description {
  margin-top: 5px;
}
.article-image {
  position: relative;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: auto;
}

.article-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article:hover .article-overlay {
  opacity: 1;
}

.article .article-title {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

.additional-info {
  margin-top: 10px;
}

.expanded-article {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 999;
  animation: expand 0.3s ease;
}

.expanded-content {
  text-align: center;
}

.close-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #e0e0e0;
}

@keyframes expand {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
.article {
  position: relative;
}

.article-image {
  position: relative;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: auto;
}

.article .article-title,
.expanded-article .article-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
}

.expanded-article .expanded-image {
  text-align: center;
  margin-bottom: 20px;
}

.expanded-article .expanded-image img {
  max-width: 100%;
  height: auto;
}

.expanded-article .article-title {
  position: static;
  transform: none;
}
</style>
