<template>
  <div class="centered-form">
    <h1>My profile</h1>
    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <div class="form-group">
          <label for="selectedAvailability">Enter your gamertag</label>
          <div class="row">
            <div class="col">
              <input
                type="text"
                v-model="selectedGamertag"
                class="form-control"
                id="selectedGamertag"
              />
            </div>
          </div>
        </div>
        <label for="games">Select a game you want to find a buddy in:</label>
        <br />
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="game1"
            value="League of Legends"
            v-model="selectedGames"
          />
          <label for="game1"> League of Legends</label>
          <br />
          <input
            type="checkbox"
            id="game2"
            value="Tetris"
            v-model="selectedGames"
          />
          <label for="game2"> Tetris</label>
          <br />
          <input
            type="checkbox"
            id="game3"
            value="F1@2023 "
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
            id="program1ID"
            value="Discord"
            v-model="selectedVoicePrograms"
          />
          <label for="programmmmmLABEL">Discord</label>
          <br />
          <input
            type="checkbox"
            id="program2ID"
            value="Skype"
            v-model="selectedVoicePrograms"
          />
          <label for="program2">Skype</label>
          <br />
          <input
            type="checkbox"
            id="program3"
            value="Teamspeak"
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
            value="English"
            v-model="selectedLanguages"
          />
          <label for="game1">English</label>
          <br />
          <input
            type="checkbox"
            id="language2"
            value="German"
            v-model="selectedLanguages"
          />
          <label for="game2"> German</label>
          <br />
          <input
            type="checkbox"
            id="language3"
            value="French"
            v-model="selectedLanguages"
          />
          <label for="game3"> French</label>
          <br />
          <input
            type="checkbox"
            id="language4"
            value="Spanish"
            v-model="selectedLanguages"
          />
          <label for="game3"> Spanish</label>
        </div>
      </div>

      <div class="form-group">
        <label for="selectedGamerType">Select what type of gamer are you</label>
        <select
          v-model="selectedGamerType"
          class="form-control"
          id="selectedGamerType"
        >
          <option value="">Please select</option>
          <option value="competitive">Competitive</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </div>

      <button type="submit" class="submit-button">Submit</button>

      <div v-if="isFormIncomplete" class="error-message">
        Please fill in all the required fields.
      </div>
      <div v-if="isFormSent" class="success-message">
        Form submitted successfully!
      </div>
    </form>
  </div>
</template>

<script>
import { addDoc, collection, db } from "@/firebase";

export default {
  data() {
    return {
      selectedGamertag: "",
      selectedGames: [],
      selectedVoicePrograms: [],
      selectedStartTime: "",
      selectedEndTime: "",
      selectedLanguages: [],
      selectedGamerType: "",
      isFormIncomplete: false,
      isFormSent: false,
    };
  },
  methods: {
    submitForm() {
      if (
        this.selectedGamertag !== "" &&
        this.selectedGames.length > 0 &&
        this.selectedVoicePrograms.length > 0 &&
        this.selectedStartTime !== "" &&
        this.selectedEndTime !== "" &&
        this.selectedLanguages.length > 0 &&
        this.selectedGamerType !== ""
      ) {
        this.isFormIncomplete = false;

        const data = {
          selectedGamertag: this.selectedGamertag,
          games: this.selectedGames,
          voicePrograms: this.selectedVoicePrograms,
          startTime: this.selectedStartTime,
          endTime: this.selectedEndTime,
          languages: this.selectedLanguages,
          gamerType: this.selectedGamerType,
        };

        addDoc(collection(db, "EditUserProfileCollection"), data)
          .then(() => {
            console.log("Form data sent to Firebase.");
            this.isFormSent = true;

            setTimeout(() => {
              this.isFormSent = false;
            }, 3000);
          })
          .catch((error) => {
            console.error("Error sending form data to Firebase:", error);
          });
      } else {
        this.isFormIncomplete = true;
      }
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
  width: 500px; /* Adjust the width as desired */
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

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
    opacity: 1;
    transform: translateY(-100%);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
    display: none;
  }
}
.error-message {
  background-color: rgb(247, 103, 0);
  color: black;
}
</style>
