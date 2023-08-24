var image = ["w1.png", "w2.png", "w3.png", "w4.png"];

// creating random function
function generateRandomNumber() {
  return Math.floor(Math.random() * 4); //
}

const randomNumber = generateRandomNumber();
// document.body.style.backgroundImage = `url(${image[randomNumber]})`;
