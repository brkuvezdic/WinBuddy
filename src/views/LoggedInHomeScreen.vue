<template>
  <div class="centered-form">
    <h1>My profile</h1>

    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <label for="selectedGamertag">Enter your gamertag</label>
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

      <div class="form-group">
        <label for="games"
          >Select a game that you want to find a buddy in:</label
        >
        <br />
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="game1"
            value="League of Legends"
            v-model="selectedGames"
          />
          <label for="game1">League of Legends</label>
          <br />
          <input
            type="checkbox"
            id="game2"
            value="Tetris"
            v-model="selectedGames"
          />
          <label for="game2">Tetris</label>
          <br />
          <input
            type="checkbox"
            id="game3"
            value="F1@2023"
            v-model="selectedGames"
          />
          <label for="game3">F1@2023</label>
        </div>
      </div>

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
          <label for="program1ID">Discord</label>
          <br />
          <input
            type="checkbox"
            id="program2ID"
            value="Skype"
            v-model="selectedVoicePrograms"
          />
          <label for="program2ID">Skype</label>
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
        <label for="languages">Select languages that you can speak</label>
        <br />
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="language1"
            value="English"
            v-model="selectedLanguages"
          />
          <label for="language1">English</label>
          <br />
          <input
            type="checkbox"
            id="language2"
            value="German"
            v-model="selectedLanguages"
          />
          <label for="language2">German</label>
          <br />
          <input
            type="checkbox"
            id="language3"
            value="French"
            v-model="selectedLanguages"
          />
          <label for="language3">French</label>
          <br />
          <input
            type="checkbox"
            id="language4"
            value="Spanish"
            v-model="selectedLanguages"
          />
          <label for="language4">Spanish</label>
        </div>
      </div>

      <div class="form-group">
        <label for="selectedGamerType">Select what type of gamer you are</label>
        <select
          v-model="selectedGamerType"
          class="form-control"
          id="selectedGamerType"
        >
          <option value="">Please select</option>
          <option value="Competitive">Competitive</option>
          <option value="Relaxed">Relaxed</option>
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
import { setDoc, doc, db, updateDoc } from "@/firebase";
import { auth } from "@/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

        const user = auth.currentUser;
        const userId = user?.uid;
        const fileName = `${userId}-${user?.displayName}.jpg`;

        // Upload profile picture
        const storageRef = ref(getStorage(), `profilePictures/${fileName}`);
        const uploadTask = uploadBytes(storageRef, this.profilePictures);

        uploadTask
          .then((snapshot) => {
            console.log("Profile picture uploaded to storage.");
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              this.updateProfilePicture(userId, downloadURL);
            });
          })
          .catch((error) => {
            console.error("Error uploading profile picture:", error);
          });

        // Save form data
        const docRef = doc(db, "EditUserProfileCollection", userId);

        const data = {
          selectedGamertag: this.selectedGamertag,
          games: this.selectedGames,
          voicePrograms: this.selectedVoicePrograms,
          startTime: this.selectedStartTime,
          endTime: this.selectedEndTime,
          languages: this.selectedLanguages,
          gamerType: this.selectedGamerType,
        };

        setDoc(docRef, data)
          .then(() => {
            console.log("Form data saved to Firestore.");
            this.isFormSent = true;
          })
          .catch((error) => {
            console.error("Error saving form data:", error);
          });
      } else {
        this.isFormIncomplete = true;
      }
    },
    getProfilePictureUrl(userId) {
      const fileName = `${userId}-${user?.displayName}.jpg`;
      const storageRef = ref(storage, `profilePictures/${fileName}`);

      getDownloadURL(storageRef)
        .then((downloadURL) => {
          this.profilePicturesUrl = downloadURL;
        })
        .catch((error) => {
          console.error("Error fetching profile picture URL:", error);
        });
    },

    updateProfilePicture(userId, downloadURL) {
      const userRef = doc(db, "EditUserProfileCollection", userId);
      updateDoc(userRef, { profilePictures: downloadURL })
        .then(() => {
          console.log("Profile picture URL saved to Firestore.");
          this.profilePicturesUrl = downloadURL; // Update the profile picture URL
        })
        .catch((error) => {
          console.error("Error saving profile picture URL:", error);
        });
    },
  },
  mounted() {
    const user = auth.currentUser;
    const userId = user?.uid;

    if (userId) {
      this.getProfilePictureUrl(userId);
    }
  },
};
</script>

<style scoped>
.centered-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 5px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.error-message,
.success-message {
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>
