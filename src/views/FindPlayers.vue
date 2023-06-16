<template>
  <div class="find-players">
    <div v-if="playerInfo.length > 0">
      <ul>
        <li v-for="player in playerInfo" :key="player.id">
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
              <span class="info-label">Start Time:</span> {{ player.startTime }}
            </div>
            <div>
              <span class="info-label">End Time:</span> {{ player.endTime }}
            </div>
            <div>
              <span class="info-label">Languages:</span>
              {{ formatArray(player.languages) }}
            </div>
            <div>
              <span class="info-label">Gamer Type:</span> {{ player.gamerType }}
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
      playerInfo: [], // Array to store player information
    };
  },
  mounted() {
    this.getPlayerInfo();
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
    },
    formatArray(arr) {
      return arr.length > 0 ? arr.join(", ") : "N/A";
    },
  },
};
</script>

<style>
.find-players {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.PlayersTitle {
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
}

.player-info {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.info-label {
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}
</style>
