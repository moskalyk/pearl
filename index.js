const giniSS = require('gini-ss');
const population = {
    1: 100,
    2: 100,
    3: 100,
    4: 100,
    5: 100,
    6: 100,
    7: 100,
    8: 100,
    9: 100,
    10: 100,
}
const discounts = {
      0: '🃟_COFFEE_MEAL',
      1: '⚚_TAXIS_MEDECINE_GROCERIES',
      2: '♕_MUSIC_BOOKS_GAMES',
      3: '⚘_FASHION_ELECTRONICS_MOVIES',
      4: '♖_EDUCATION_CARS',
      5: '♔_TRAVEL_HOME',
}

let i = 0;

function jiggle(population_){
    for(let i = 1; i <= Object.values(population_).length; i++){
        if(Math.random() > 0.5) {
            population_[i] = population_[i] * 1.034
        } else {
            population_[i] = population_[i] * 0.964
        }
    }
}

function arrayAverage(arr){
    //Find the sum
    arr = Object.values(arr)
    var sum = 0;
    for(var i in arr) {
        sum += arr[i];
    }
    //Get the length of the array
    var numbersCnt = arr.length;
    //Return the average / mean.
    return (sum / numbersCnt);
}

function discount(population_, connections, max){
    // connections, discount max, take from apwine futures yield
    const multiplier = .07 * connections / max
    const average = arrayAverage(population_)

    for(let i = 1; i <= Object.values(population_).length; i++){
        if(population_[i] < average) {
            population_[i] = population_[i] * (1 + multiplier)
            // send alert to bby
        }
    }
}

setInterval(function() {

  // get number of connections from flu
  const connections = 2**8

  jiggle(population)
  discount(population, connections, 2**8)

  // get gini
  const gini = giniSS(Object.values(population))
  const tresh = .002

  if(gini > 0.001 && gini < tresh){
      console.log(discounts[0])
  }else if(gini > tresh && gini < tresh*2){
      console.log(discounts[1])
  }else if(gini > tresh*2 && gini < tresh*3){
      console.log(discounts[2])
  }else if(gini > tresh*3&& gini < tresh*4){
      console.log(discounts[3])
  }else if(gini > tresh*4 && gini < tresh*5){
      console.log(discounts[4])
  }else if(gini > tresh*5){
      console.log(discounts[5])
  }

  process.stdout.write(giniSS(Object.values(population)) + '\n');
}, 100);