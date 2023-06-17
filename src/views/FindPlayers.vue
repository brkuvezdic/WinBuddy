<template>
  <div class="find-players">
    <h1 class="PlayersTitle">Players</h1>
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
          placeholder="Enter start time"
        />
      </div>

      <div>
        <label for="endTimeFilter">End Time:</label>
        <input
          type="text"
          id="endTimeFilter"
          v-model="endTime"
          placeholder="Enter end time"
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
    <button class="action-button" @click="applyFilters">Apply Filters</button>
    <button class="action-button" @click="resetFilters">Reset Filters</button>

    <div class="player-container">
      <ul class="player-list">
        <li v-for="player in filteredPlayers" :key="player.id">
          <div class="player-card">
            <div class="player-info">
              <div>
                <div>
                  <span class="info-label">Gamertag:</span>
                  {{ player.selectedGamertag }}
                </div>
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
                {{ formatArray(player.languages) }}
              </div>
              <div>
                <span class="info-label">Gamer Type:</span>
                {{ player.gamerType }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { collection, db, getDocs } from "@/firebase";

export default {
  name: "FindPlayers",
  data() {
    return {
      playerInfo: [], // Array to store all player information
      filteredPlayers: [], // Array to store filtered player information
      selectedGames: [], // Selected games filter
      selectedVoicePrograms: [], // Selected voice program filter
      startTime: "", // Start time filter
      endTime: "", // End time filter
      selectedLanguages: [], // Selected languages filter
      selectedGamerType: [], // Selected gamer type filter
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
    formatArray(arr) {
      return arr.length > 0 ? arr.join(", ") : "N/A";
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

<style scoped>
.find-players {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.PlayersTitle {
  text-align: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filters > div {
  margin-right: 20px;
  margin-bottom: 10px;
}

.selectable-options {
  display: flex;
  flex-wrap: wrap;
}

.selectable-options span {
  display: inline-block;
  padding: 5px 10px;
  background-color: #eee;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}

.selectable-options span.selected {
  background-color: #ccc;
}

.player-container {
  display: flex;
  flex-wrap: wrap;
}

.player-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.player-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
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

button {
  margin-top: 10px;
}

button + button {
  margin-left: 10px;
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
  border-radius: 4px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #45a049;
}

.input-text {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
