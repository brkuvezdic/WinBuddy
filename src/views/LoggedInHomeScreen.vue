<template>
  <div class="centered-form">
    <h1>My profile</h1>
    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <label for="games">Select a game you want to find a buddy in:</label>
        <br />
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="game1"
            value="game1"
            v-model="selectedGames"
          />
          <label for="game1"> League of Legends</label>
          <br />
          <input
            type="checkbox"
            id="game2"
            value="game2"
            v-model="selectedGames"
          />
          <label for="game2"> Tetris</label>
          <br />
          <input
            type="checkbox"
            id="game3"
            value="game3"
            v-model="selectedGames"
          />
          <label for="game3"> F1@2023</label>
        </div>
      </div>
      <br />
      <div class="form-group">
        <label for="voicePrograms">Select voice communication programs:</label>
        <br />
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="program1"
            value="program1"
            v-model="selectedVoicePrograms"
          />
          <label for="program1">Discord</label>
          <br />
          <input
            type="checkbox"
            id="program2"
            value="program2"
            v-model="selectedVoicePrograms"
          />
          <label for="program2">Skype</label>
          <br />
          <input
            type="checkbox"
            id="program3"
            value="program3"
            v-model="selectedVoicePrograms"
          />
          <label for="program3">Teamspeak</label>
        </div>
      </div>
      <br />
      <div class="form-group">
        <label for="selectedAvailability">Select Availability</label>
        <div class="row">
          <div class="col">
            <input
              type="time"
              v-model="selectedStartTime"
              class="form-control"
              id="selectedStartTime"
            />
          </div>
          <div class="col">
            <input
              type="time"
              v-model="selectedEndTime"
              class="form-control"
              id="selectedEndTime"
            />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="games">Select languages that you can speak</label>
        <br />
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="language1"
            value="language1"
            v-model="selectedLanguage"
          />
          <label for="game1">English</label>
          <br />
          <input
            type="checkbox"
            id="language2"
            value="language2"
            v-model="selectedLanguage"
          />
          <label for="game2"> German</label>
          <br />
          <input
            type="checkbox"
            id="language3"
            value="language3"
            v-model="selectedLanguage"
          />
          <label for="game3"> French</label>
          <br />
          <input
            type="checkbox"
            id="language4"
            value="language4"
            v-model="selectedLanguage"
          />
          <label for="game4"> Spanish</label>
          <br />
          <input
            type="checkbox"
            id="language5"
            value="language5"
            v-model="selectedLanguage"
          />

          <label for="game5"> Croatian</label>
        </div>
      </div>
      <br />
      <div class="form-group">
        <label for="selectedGamerType"
          >Are you a competitive or relaxed gamer?</label
        >
        <select
          v-model="selectedGamerType"
          class="form-control"
          id="selectedGamerType"
        >
          <option value="competitive">Competitive</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
import {
  auth,
  addDoc,
  onAuthStateChanged,
  getAuth,
  signOut,
  db,
  collection,
} from "@/firebase";

export default {
  data() {
    return {
      selectedGames: [],
      selectedVoicePrograms: [],
      selectedStartTime: "",
      selectedEndTime: "",
      selectedLanguage: "",
      selectedGamerType: "",
    };
  },
  methods: {
    submitForm() {
      console.log("Submit stisnut");
      // Prepare the data to be sent to Firebase
      const data = {
        selectedGames: this.selectedGames,
        selectedVoicePrograms: this.selectedVoicePrograms,
        selectedStartTime: this.selectedStartTime,
        selectedEndTime: this.selectedEndTime,
        selectedLanguage: this.selectedLanguage,
        selectedGamerType: this.selectedGamerType,
      };

      console.log("Odabrane igrice " + this.selectedGames);
      console.log("Odabrani programi " + this.selectedVoicePrograms);
      console.log("Odabrano vrijeme " + this.selectedAvailability);
      console.log("Odabrani jezik " + this.selectedLanguage);

      // Send the data to Firebase Firestore
      // Replace 'your-collection' with the actual collection name in your Firebase database
      addDoc(collection(db, "EditUserProfileCollection"), data)
        .then(() => {
          console.log("Form data sent to Firebase.");
          // Reset the form fields
          this.selectedGames = [];
          this.selectedVoicePrograms = [];
          this.selectedAvailability = "";
          this.selectedLanguage = "";
        })
        .catch((error) => {
          console.error("Error sending form data to Firebase:", error);
        });
    },
  },
};
</script>

<style>
.centered-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
}

.form-container {
  width: 300px;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.checkbox-group {
  margin-left: 20px;
}

.submit-button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
