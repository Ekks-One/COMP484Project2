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
    var pet_info = {name:"My Pet Name", weight:"??", happiness:"??", iq:"??"};

    function togglePopup() {
      const overlay = document.getElementById('popupOverlay');
      $('.status-container').toggleClass('log-dimmed');
      overlay.classList.toggle('show');
    }

    function submitInput() {
      const val = document.getElementById('myInput').value;

      if(val.trim() === "") {
        document.getElementById('nameError').textContent = "Please enter a name for your pet.";
        return;
      }

      pet_info.name = val;
      createPetInfo();
      updatePetInfoInHtml();
      togglePopup(); // Close after submit
    }

    function throwPokeball() {
      const ball = $('#pokeball');
      const pet = $('.pet-image');

      if(pet_info.name === "My Pet Name") {
        //Toggle Shake Animation and add status update
        ball.toggleClass('shake');
        addStatusUpdate("You threw a Pokéball!");

        //After the shake (1.5s), catch the pet
        setTimeout(() => {
          ball.toggleClass('shake');
          ball.toggleClass('caught');
          pet.toggleClass('caught-pet');
          
          addStatusUpdate("Gotcha! Turtwig was caught!");

          
          $('.dashboard').removeClass('hidden');
          //Show the naming popup after the catch is confirmed
          setTimeout(() => {
            togglePopup(); 
          }, 500);
          
        }, 1500);
      }
      else {
        ball.toggleClass('caught');
        pet.toggleClass('caught-pet');

        if(ball.hasClass('caught')) {
          addStatusUpdate(`Come back! ${pet_info.name}!`);
        } else {
          addStatusUpdate(`Go! ${pet_info.name}!`);
        }

        pet.css('transform', 'scaleX(1.2)'); // Face right by default when released
        setTimeout(() => pet.css('transform', 'scaleX(1)'), 500); // Reset to normal size after a brief moment  
      }
    }

 
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

    function createPetInfo() {
      pet_info.happiness = Math.floor(Math.random() * (100 - 0)) + 0;
      pet_info.weight = Math.floor(Math.random() * (100 - 0)) + 0;
      pet_info.iq = Math.floor(Math.random() * (100 - 0)) + 0;
    }

    function clickedTreatButton() {
      pet_info.happiness++;
      pet_info.weight++;
      addStatusUpdate(`${pet_info.name} ate a snack!`);
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      pet_info.happiness++;
      pet_info.weight--;
      addStatusUpdate(`${pet_info.name} played their favorite game!`);
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      pet_info.happiness--;
      pet_info.weight--;
      addStatusUpdate(`${pet_info.name} trained hard!`);
      checkAndUpdatePetInfoInHtml();
    }

    function clickedDoomScrollButton() {
      pet_info.iq--;
      pet_info.happiness++;
      addStatusUpdate(`${pet_info.name} doom scrolled on social media!`);
      checkAndUpdatePetInfoInHtml();
    }

    function clickedStudy() {
      pet_info.iq++;
      pet_info.happiness--;
      addStatusUpdate(`${pet_info.name} studied hard!`);
      checkAndUpdatePetInfoInHtml();
    }

    function addStatusUpdate(message) {
      // Prepend (add to the top) a new paragraph with the message to the status log
      $('#status-log').prepend(`<p> > ${message}</p>`);
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
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
  