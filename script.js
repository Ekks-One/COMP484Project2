$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.study-button').click(clickedStudy);
    $('.doom-scroll-button').click(clickedDoomScrollButton);
    setInterval(movePetRandomly, 5000);
}); 
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"My Pet Name", weight:"??", happiness:"??", iq:"??", stage: 1};

    //Flag to prevent multiple throws at once
    let animation = false; 


    //Display Mood in Activity Logs
    function getMoodComment() {
      if (pet_info.happiness > 80) return "is beaming with joy!";
      if (pet_info.happiness < 30) return "looks a bit tired...";
      if (pet_info.weight > 80) return "is feeling very full!";
      if (pet_info.iq < 30) return "needs brainpower"
      return "is doing great!";
    }

    //Evolve Pokemone based on stats
    function checkEvolution() {
      // Evolve to Stage 1
      if (pet_info.iq >= 50 && pet_info.happiness >= 50 && pet_info.weight >= 10 && pet_info.stage === 1 ) {
        pet_info.stage = 2;
        $('.pet-image').fadeOut(1000, function() {
          // Change the image source to Grotle
          $(this).attr('src', './images/Grotle.jpg').fadeIn(1000);
          addStatusUpdate(`What?! ${pet_info.name} is evolving!`);
          addStatusUpdate(`Congratulations! It evolved into GROTLE!`);
        });
      }
      // Evolve to Stage 2
      if(pet_info.iq >= 70 && pet_info.happiness >= 70 && pet_info.weight >= 30 && pet_info.stage === 2 ) {
        pet_info.stage = 3;
        $('.pet-image').fadeOut(1000, function() {
          // Change the image source to Tortera
          $(this).attr('src', './images/Torterra.png').fadeIn(1000);
          addStatusUpdate(`What?! ${pet_info.name} is evolving!`);
          addStatusUpdate(`Congratulations! It evolved into TORTERRA!`);
        });
      }
    }

    // Function to toggle the visibility of the popup and dim the status log
    function togglePopup() {
      const overlay = document.getElementById('popupOverlay');

      // Toggle the 'log-dimmed' class on the status container to dim it when the popup is active
      $('.status-container').toggleClass('log-dimmed');
      overlay.classList.toggle('show');
    }

    // Function to handle the submission of the pet's name from the popup
    function submitInput() {
      const val = document.getElementById('myInput').value;

      //Create error message if the input is empty and prevent submission
      if(val.trim() === "") {
        document.getElementById('nameError').textContent = "Please enter a name for your pet.";
        return;
      }

      //Set current pet_info name to value of input
      pet_info.name = val;
      
      createPetInfo();
      updatePetInfoInHtml();

      // Close after submit
      togglePopup(); 
    }

    // Function to handle throwing the Pokéball
    function throwPokeball() {
      // If an animation is already in progress, do not allow another throw
      if (animation) return; 

      animation = true;

      const ball = $('#pokeball');
      const pet = $('.pet-image');

      // If the pet's name is still the default, trigger the catch sequence
      if(pet_info.name === "My Pet Name") {

        //Toggle Shake Animation and add status update
        ball.toggleClass('shake');
        addStatusUpdate("You threw a Pokéball!");

        //After the shake (1.5s), catch the pet
        setTimeout(() => {
          //Toggle classes to show the pet is caught and add status update
          ball.toggleClass('shake');
          ball.toggleClass('caught');
          pet.toggleClass('caught-pet');
          
          addStatusUpdate("Gotcha! Turtwig was caught!");

          //Show the dashboard after the catch is confirmed
          $('.dashboard').removeClass('hidden');
          $('.button-container').removeClass('hidden');

          setTimeout(() => {
            togglePopup(); 
          }, 500);
          // Reset animation flag after the entire sequence is done
          animation = false; 
        }, 1500);
      }
      // If the pet is already caught, toggle back to release it
      else {
        ball.toggleClass('caught');
        pet.toggleClass('caught-pet');

        // Add status update based on whether the pet is being released or caught again
        if(ball.hasClass('caught')) {
          addStatusUpdate(`<b>Come back! ${pet_info.name}!`);
        } else {
          addStatusUpdate(`<b>Go! ${pet_info.name}!`);
        }

        // Face right by default when released
        pet.css('transform', 'scaleX(1.2)'); 
        setTimeout(() => {
          // Reset pet scale and animation flag after release
          animation = false;
          pet.css('transform', 'scaleX(1)');
        }, 500);
      }
    }

 
    // Function to move the pet to a random position within the container every 5 seconds
    function movePetRandomly() {
      const container = $('.pet-image-container');
      const pet = $('.pet-image');

      const containerWidth = container.width();
      const containerHeight = container.height();
      const petWidth = pet.width();
      const petHeight = pet.height();

      // Calculate random positions (keeping pet on the grass)
      const randomTop = Math.floor(Math.random() * (containerHeight/2 - petHeight) + containerHeight/2);
      const randomLeft = Math.floor(Math.random() * (containerWidth - petWidth));

      // Flip the pet to face the direction it's moving
      if(randomLeft < pet.position().left) {
        pet.css('transform', 'scaleX(1)'); // Face right
      } else {
        pet.css('transform', 'scaleX(-1)'); // Face left
      }

      // Apply the new position
      pet.css({
        'top': randomTop + 'px',
        'left': randomLeft + 'px'
      });
    }

    //Create new pet info w/ random weight, happiness, and iq when name is submitted
    function createPetInfo() {
      pet_info.happiness = Math.floor(Math.random() * (50 - 0)) + 0;
      pet_info.weight = Math.floor(Math.random() * (50 - 0)) + 0;
      pet_info.iq = Math.floor(Math.random() * (50 - 0)) + 0;
    }

    // Treat button increases happiness and weight
    function clickedTreatButton() {
      pet_info.happiness++;
      pet_info.weight++;
      addStatusUpdate(`${pet_info.name} ate a snack!`);
      addStatusUpdate(`${pet_info.name} ${getMoodComment()}`);
      checkAndUpdatePetInfoInHtml();
    }
    
    // Play button increases happiness and decreases weight
    function clickedPlayButton() {
      pet_info.happiness++;
      pet_info.weight--;
      addStatusUpdate(`${pet_info.name} played their favorite game!`);
      addStatusUpdate(`${pet_info.name} ${getMoodComment()}`);
      checkAndUpdatePetInfoInHtml();
    }
    
    // Exercise button decreases happiness and weight
    function clickedExerciseButton() {
      pet_info.happiness--;
      pet_info.weight--;
      addStatusUpdate(`${pet_info.name} trained hard!`);
      addStatusUpdate(`${pet_info.name} ${getMoodComment()}`);
      checkAndUpdatePetInfoInHtml();
    }

    // Doom Scroll button decreases iq and increases happiness
    function clickedDoomScrollButton() {
      pet_info.iq--;
      pet_info.happiness++;
      addStatusUpdate(`${pet_info.name} doom scrolled on social media!`);
      addStatusUpdate(`${pet_info.name} ${getMoodComment()}`);
      checkAndUpdatePetInfoInHtml();
    }

    // Study button increases iq and decreases happiness
    function clickedStudy() {
      pet_info.iq++;
      pet_info.happiness--;
      addStatusUpdate(`${pet_info.name} studied hard!`);
      addStatusUpdate(`${pet_info.name} ${getMoodComment()}`);
      checkAndUpdatePetInfoInHtml();
    }

    // Function to add a new status update to the top of the status log
    function addStatusUpdate(message) {
      // Prepend (add to the top) a new paragraph with the message to the status log
      $('#status-log').prepend(`<br/><p> > ${message}</p>`);
    }
  
    // Function to check weight and happiness values before updating the HTML to ensure they do not go below 0, then update the HTML with the current pet info
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();
      checkEvolution();
      updatePetInfoInHtml();
      if(pet_info.name === "My Pet Name") {
        addStatusUpdate(`Catch the wild Pokemon`);
      }
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Ensure weight, happiness, and iq do not go below 0
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }

      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }

      if(pet_info.iq < 0) {
        pet_info.iq = 0;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.iq').text(pet_info['iq']);
    }
  