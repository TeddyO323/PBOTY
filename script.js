document.addEventListener('DOMContentLoaded', function() {
  updateProgressBar(); // Initial update

  // Set interval to update the progress every 1 minute (adjust as needed)
  setInterval(updateProgressBar, 60000); // 60000 milliseconds = 1 minute

  // Set interval to update the current time every second
  setInterval(updateCurrentTime, 1000); // 1000 milliseconds = 1 second
});

function updateProgressBar() {
    var currentDate = new Date();
  
    // Set the start date to the beginning of the current year
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
  
    // Set the end date to the end of 2023
    var endDate = new Date(2023, 11, 31, 23, 59, 59);
  
    // Calculate the percentage of the year that has passed
    var progressPercentage = Math.floor(((currentDate - startDate) / (endDate - startDate)) * 100);
  
    // Update the progress message and progress bar width
    var progressMessage = document.getElementById('progress-message');
    var progressBar = document.getElementById('progress-bar');
    var extraInfo = document.getElementById('extra-info');
    var newYearMessage = document.getElementById('new-year-message');
  
    progressMessage.innerHTML = `
        ${progressPercentage}% of ${currentDate.getFullYear()} has passed
    `;
    progressBar.style.width = progressPercentage + '%';
  
    // Update the extra information below the progress bar
    extraInfo.innerHTML = `
    <br>
    <strong id="new-year-message" class="new-year-message">
      Happy New Year <span class="year">2024</span>!
    </strong>
    `;
  
    // Check if it's New Year and display a special message
// Check if it's New Year and display a special message
if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
    extraInfo.innerHTML += `
      <br>
      <strong id="new-year-message" class="new-year-message">
        Happy New Year <span class="year">2024</span>!
      </strong>`;
    animateNewYearMessage(newYearMessage);
  } else {
    stopAnimation();
  }
  
  }
    
  // Function to animate the "Happy New Year!" message
  function animateNewYearMessage(element) {
    const message = "Happy New Year!";
    let index = 0;
  
    function showNextLetter() {
      element.innerHTML += message[index];
      index++;
  
      if (index < message.length) {
        setTimeout(showNextLetter, 200); // Adjust the delay between letters
      }
    }
  
    element.classList.add('new-year-message'); // Add the class for the glowing effect
    showNextLetter();
  }
  
  // Function to stop the animation
  function stopAnimation() {
    // Clear the animation or perform any cleanup if needed
    // For simplicity, this example does not include specific cleanup
  }
  

function updateCurrentTime() {
  var currentTimeElement = document.getElementById('current-time');
  currentTimeElement.textContent = formatTime(new Date());
}

function formatDate(date) {
  var options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
  var options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleTimeString('en-US', options);
}
window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame =
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };

var fireworksCanvas, fireworksCtx, w, h, particles = [], probability = 0.04,
    xPoint, yPoint;

function onLoad() {
    fireworksCanvas = document.getElementById("fireworks-canvas");
    fireworksCtx = fireworksCanvas.getContext("2d");
    resizeCanvas();

    window.requestAnimationFrame(updateWorld);
}

function resizeCanvas() {
    if (!!fireworksCanvas) {
        w = fireworksCanvas.width = window.innerWidth;
        h = fireworksCanvas.height = window.innerHeight;
    }
}

function updateWorld() {
    update();
    paint();
    window.requestAnimationFrame(updateWorld);
}

function update() {
    if (particles.length < 500 && Math.random() < probability) {
        createFirework();
    }
    var alive = [];
    for (var i=0; i<particles.length; i++) {
        if (particles[i].move()) {
            alive.push(particles[i]);
        }
    }
    particles = alive;
}

function paint() {
    fireworksCtx.globalCompositeOperation = 'source-over';
    fireworksCtx.fillStyle = "rgba(0,0,0,0.2)";
    fireworksCtx.fillRect(0, 0, w, h);
    fireworksCtx.globalCompositeOperation = 'lighter';
    for (var i=0; i<particles.length; i++) {
        particles[i].draw(fireworksCtx);
    }
}

function createFirework() {
    xPoint = Math.random()*(w-200)+100;
    yPoint = Math.random()*(h-200)+100;
    var nFire = Math.random()*50+100;
    var c = "rgb("+(~~(Math.random()*200+55))+","
         +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
    for (var i=0; i<nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        var vy = Math.sqrt(25-particle.vx*particle.vx);
        if (Math.abs(particle.vy) > vy) {
            particle.vy = particle.vy>0 ? vy: -vy;
        }
        particles.push(particle);
    }
}

function Particle() {
    this.w = this.h = Math.random()*4+1;

    this.x = xPoint-this.w/2;
    this.y = yPoint-this.h/2;

    this.vx = (Math.random()-0.5)*10;
    this.vy = (Math.random()-0.5)*10;

    this.alpha = Math.random()*.5+.5;

    this.color;
}

Particle.prototype = {
    gravity: 0.05,
    move: function () {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.01;
        if (this.x <= -this.w || this.x >= screen.width ||
            this.y >= screen.height ||
            this.alpha <= 0) {
                return false;
        }
        return true;
    },
    draw: function (c) {
        c.save();
        c.beginPath();

        c.translate(this.x+this.w/2, this.y+this.h/2);
        c.arc(0, 0, this.w, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;

        c.closePath();
        c.fill();
        c.restore();
    }
};

// // JavaScript to handle the toast animation
// function performToastAnimation() {
//     var glass1 = document.getElementById('glass1');
//     var glass2 = document.getElementById('glass2');
  
//     // Move glasses to a visible position
//     glass1.style.top = '50px';
//     glass2.style.top = '50px';
  
//     // Set a timeout to reset the position after the animation completes
//     setTimeout(function () {
//       resetToastAnimation();
//     }, 2000); // Adjust the timeout duration as needed
//   }
  
//   // Function to reset the glasses to their initial position
//   function resetToastAnimation() {
//     var glass1 = document.getElementById('glass1');
//     var glass2 = document.getElementById('glass2');
  
//     // Move glasses back to their initial position
//     glass1.style.top = '-100px';
//     glass2.style.top = '-100px';
//   }
  
