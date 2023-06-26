<template>
  <div class="find-players">
    <h1 class="PlayersTitle">Filter players</h1>
    <div class="filters">
      <div>
        <label for="gameFilter">Game:</label>
        <div class="selectable-options">
          <span
            v-for="game in games"
            :key="game"
            :class="{ selected: selectedGames.includes(game) }"
            @click="toggleGame(game)"
          >
            {{ game }}
          </span>
        </div>
      </div>

      <div>
        <label for="voiceProgramFilter">Voice Program:</label>
        <div class="selectable-options">
          <span
            v-for="voiceProgram in voicePrograms"
            :key="voiceProgram"
            :class="{ selected: selectedVoicePrograms.includes(voiceProgram) }"
            @click="toggleVoiceProgram(voiceProgram)"
          >
            {{ voiceProgram }}
          </span>
        </div>
      </div>

      <div>
        <label for="startTimeFilter">Start Time:</label>
        <input
          type="text"
          id="startTimeFilter"
          v-model="startTime"
          placeholder="Eg. 17:44"
        />
      </div>

      <div>
        <label for="endTimeFilter">End Time:</label>
        <input
          type="text"
          id="endTimeFilter"
          v-model="endTime"
          placeholder="Eg. 10:43"
        />
      </div>

      <div>
        <label for="languageFilter">Language:</label>
        <div class="selectable-options">
          <span
            v-for="language in languages"
            :key="language"
            :class="{ selected: selectedLanguages.includes(language) }"
            @click="toggleLanguage(language)"
          >
            {{ language }}
          </span>
        </div>
      </div>

      <div>
        <label for="gamerTypeFilter">Gamer Type:</label>
        <div class="selectable-options">
          <span
            v-for="gamerType in gamerTypes"
            :key="gamerType"
            :class="{ selected: selectedGamerType.includes(gamerType) }"
            @click="toggleGamerType(gamerType)"
          >
            {{ gamerType }}
          </span>
        </div>
      </div>
    </div>
    <div class="centered">
      <button class="action-button" @click="applyFilters">Apply Filters</button>
      <button class="action-button" @click="resetFilters">Reset Filters</button>
    </div>

    <div class="player-container">
      <ul class="player-list">
        <li v-for="player in filteredPlayers" :key="player.id">
          <div class="player-card" @click="showPopup(player)"></div>
          <div class="player-card">
            <h3>{{ player.selectedGamertag }}</h3>

            <div class="player-info">
              <div>
                <span class="info-label">Games:</span>
                {{ formatArray(player.games) }}
              </div>
              <div>
                <span class="info-label">Voice Programs:</span>
                {{ formatArray(player.voicePrograms) }}
              </div>
              <div>
                <span class="info-label">Start Time:</span>
                {{ player.startTime }}
              </div>
              <div>
                <span class="info-label">End Time:</span> {{ player.endTime }}
              </div>
              <div>
                <span class="info-label">Languages:</span>
                {{ player.languages }}
              </div>
              <div>
                <span class="info-label">Gamer Type:</span>
                {{ player.gamerType }}
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Popup -->
      <div v-if="showPopupFlag" class="popup">
        <div class="popup-content">
          <h2>{{ selectedPlayer.selectedGamertag }}</h2>
          <p>Additional information: {{ selectedPlayer.additionalInfo }}</p>

          <form @submit.prevent="searchPlayer">
            <input
              v-model="summonerName"
              type="text"
              placeholder="Enter Summoner Name"
            />
            <button type="submit">Enter</button>
          </form>
          <h1 v-if="selectedPlayer.summonerLevel">
            Summoner Level: {{ selectedPlayer.summonerLevel }}
          </h1>

          <h1
            v-if="
              !selectedPlayer.summonerLevel && !selectedPlayer.profileIconUrl
            "
          >
            No user found.
          </h1>

          <h1 v-if="selectedPlayer.profileIconUrl">Profile icon:</h1>

          <img
            v-if="selectedPlayer.profileIconUrl"
            :src="selectedPlayer.profileIconUrl"
            alt="Profile Icon"
          />

          <button @click="closePopup">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_KEY = "RGAPI-af6cf03e-4e08-431a-a8f6-02e75cc2a428";
import {
  auth,
  onAuthStateChanged,
  collection,
  getDocs,
  query,
  where,
  db,
  addDoc,
} from "@/firebase.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "FindPlayers",
  data() {
    return {
      playerInfo: [],
      filteredPlayers: [],
      selectedGames: [],
      selectedVoicePrograms: [],
      startTime: "",
      endTime: "",
      selectedLanguages: [],
      selectedGamerType: [],
      showPopupFlag: false,
      selectedPlayer: null,
      summonerName: "",
      selectedPlayer: {
        selectedGamertag: "",
        additionalInfo: "",
        summonerLevel: null,
        profileIconUrl: "",
      },
    };
  },
  mounted() {
    this.getPlayerInfo();
  },
  computed: {
    games() {
      // Extract unique games from player information
      const games = new Set();
      this.playerInfo.forEach((player) => {
        player.games.forEach((game) => games.add(game));
      });
      return Array.from(games);
    },
    voicePrograms() {
      // Extract unique voice programs from player information
      const voicePrograms = new Set();
      this.playerInfo.forEach((player) => {
        player.voicePrograms.forEach((voiceProgram) =>
          voicePrograms.add(voiceProgram)
        );
      });
      return Array.from(voicePrograms);
    },
    languages() {
      // Extract unique languages from player information
      const languages = new Set();
      this.playerInfo.forEach((player) => {
        player.languages.forEach((language) => languages.add(language));
      });
      return Array.from(languages);
    },
    gamerTypes() {
      // Extract unique gamer types from player information
      const gamerTypes = new Set();
      this.playerInfo.forEach((player) => {
        gamerTypes.add(player.gamerType);
      });
      return Array.from(gamerTypes);
    },
  },
  methods: {
    async getPlayerInfo() {
      const querySnapshot = await getDocs(
        collection(db, "EditUserProfileCollection")
      );
      this.playerInfo = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          selectedGamertag: doc.data().selectedGamertag,
          games: doc.data().games,
          voicePrograms: doc.data().voicePrograms,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          languages: doc.data().languages,
          gamerType: doc.data().gamerType,
        };
      });
      this.filteredPlayers = this.playerInfo;
    },

    async getPlayerProfilePicture(profilePictures) {
      if (profilePictures && profilePictures.length > 0) {
        const storagePath = `profilePictures/${profilePictures[0]}`;
        const url = await getDownloadURL(ref(storage, storagePath));
        return url;
      }
      return null;
    },

    formatArray(arr) {
      return arr.length > 0 ? arr.join(", ") : "N/A";
    },
    showPopup(player) {
      this.selectedPlayer = player;
      this.showPopupFlag = true;
    },
    closePopup() {
      this.selectedPlayer = null;
      this.showPopupFlag = false;
    },

    toggleGame(game) {
      if (this.selectedGames.includes(game)) {
        this.selectedGames = this.selectedGames.filter((g) => g !== game);
      } else {
        this.selectedGames.push(game);
      }
    },
    toggleVoiceProgram(voiceProgram) {
      if (this.selectedVoicePrograms.includes(voiceProgram)) {
        this.selectedVoicePrograms = this.selectedVoicePrograms.filter(
          (vp) => vp !== voiceProgram
        );
      } else {
        this.selectedVoicePrograms.push(voiceProgram);
      }
    },
    toggleLanguage(language) {
      if (this.selectedLanguages.includes(language)) {
        this.selectedLanguages = this.selectedLanguages.filter(
          (lang) => lang !== language
        );
      } else {
        this.selectedLanguages.push(language);
      }
    },
    toggleGamerType(gamerType) {
      if (this.selectedGamerType.includes(gamerType)) {
        this.selectedGamerType = this.selectedGamerType.filter(
          (gt) => gt !== gamerType
        );
      } else {
        this.selectedGamerType.push(gamerType);
      }
    },

    async searchPlayer() {
      const summonerName = this.summonerName;
      var podaci = {};
      console.log("POCETAK API FUNKCIJE");
      try {
        this.selectedPlayer.summonerLevel = null;
        const response = await axios.get(
          `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
            summonerName
          )}?api_key=${API_KEY}`
        );
        // Handle the response data here
        podaci = response.data;
        this.selectedPlayer.summonerLevel = podaci.summonerLevel;
        this.selectedPlayer.profileIconUrl = this.getProfileIconUrl(
          podaci.profileIconId
        ); // Add this line
        this.$forceUpdate();
        console.log("SUCCESS", podaci);
      } catch (error) {
        console.log("OVO JE ERROR RESPONSE", error);
        // Handle the error here
      }
      console.log("Ovo je user", summonerName);
    },

    getProfileIconUrl(profileIconId) {
      return `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${profileIconId}.png`; // Replace with the actual URL format for profile icons
    },
    applyFilters() {
      let filteredPlayers = this.playerInfo;

      // Apply game filter
      if (this.selectedGames.length > 0) {
        filteredPlayers = filteredPlayers.filter((player) =>
          this.selectedGames.some((game) => player.games.includes(game))
        );
      }

      // Apply voice program filter
      if (this.selectedVoicePrograms.length > 0) {
        filteredPlayers = filteredPlayers.filter((player) =>
          this.selectedVoicePrograms.some((vp) =>
            player.voicePrograms.includes(vp)
          )
        );
      }

      // Apply start time filter
      if (this.startTime) {
        filteredPlayers = filteredPlayers.filter(
          (player) => player.startTime === this.startTime
        );
      }

      // Apply end time filter
      if (this.endTime) {
        filteredPlayers = filteredPlayers.filter(
          (player) => player.endTime === this.endTime
        );
      }

      // Apply language filter
      if (this.selectedLanguages.length > 0) {
        filteredPlayers = filteredPlayers.filter((player) =>
          this.selectedLanguages.every((lang) =>
            player.languages.includes(lang)
          )
        );
      }

      // Apply gamer type filter
      if (this.selectedGamerType.length > 0) {
        filteredPlayers = filteredPlayers.filter((player) =>
          this.selectedGamerType.includes(player.gamerType)
        );
      }

      this.filteredPlayers = filteredPlayers;
    },
    resetFilters() {
      this.selectedGames = [];
      this.selectedVoicePrograms = [];
      this.startTime = "";
      this.endTime = "";
      this.selectedLanguages = [];
      this.selectedGamerType = [];
      this.filteredPlayers = this.playerInfo;
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
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
  max-height: 80%;
  overflow: auto;
  text-align: center;
}
.expanded-image {
  margin-bottom: 20px;
}
.expanded-image img {
  max-width: 100%;
  height: auto;
}
.article-title {
  font-size: 20px;
  font-weight: bold;
}
.article-description {
  margin-top: 5px;
}
.additional-info {
  margin-top: 10px;
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
.profile-picture {
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 10px;
}

.find-players {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.PlayersTitle {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-transform: uppercase;
}

.filters {
  background-color: rgb(247, 103, 0);
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the filters */
  align-items: center; /* Center the filters */
  margin-bottom: 20px;
}

.filters > div {
  margin-right: 20px;
  margin-bottom: 10px;
}

.selectable-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the selection for filters */
  align-items: center; /* Center the selection for filters */
}

.selectable-options span {
  display: inline-block;
  padding: 5px 10px;
  background-color: #eee;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.selectable-options span.selected {
  background-color: #4caf50;
  color: #fff;
}

.player-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.player-list {
  list-style: none;
  padding: 30px;
  margin: 0;
}
.gameFilter {
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 100px;
  margin-bottom: 10px;
}

.player-card {
  border: 1px solid #d63a13;
  border-radius: 4px;
  padding: 45px;
  margin-bottom: 30px;
  transition: box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  transition: transform 0.3s ease;
}

.player-card:before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0;
  transition: opacity 0.3s ease;
}
.player-card:hover {
  color: red;
  transform: translateY(-20px);
}

.player-card:hover:before {
  padding: 50px;
  opacity: 1;
  top: 0;
}

.info-label {
  font-weight: bold;
}

.player-info {
  margin-top: 10px;
}

.info-label + div {
  margin-top: 5px;
}

.action-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #45a049;
}

.action-button:active {
  background-color: #3e8e41;
}

.action-button:focus {
  outline: none;
}

.input-text {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.input-text:focus {
  border-color: #4caf50;
}

.success-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.success-message {
  padding: 1.5rem;
  background-color: #4caf50;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideFadeOut 3s ease-in forwards;
}

@keyframes slideFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
    display: none;
  }
}

.error-message {
  padding: 1.5rem;
  background-color: #f44336;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideFadeOut 3s ease-in forwards;
}

.success-message,
.error-message {
  position: relative;
  z-index: 9999;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
