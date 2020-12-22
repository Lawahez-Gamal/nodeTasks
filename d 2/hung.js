let word = prompt("Enter your word");

correct =0 

incorrect = 0

inserted = [];
for (var i = 0; i < word.length; i++) {
  inserted[i] = " ";
 }

 status = 'playing'

let getwordLength = function () {
  return word.length;
};

let trialNum = function () {
  return getwordLength() + 2;
};

let checkChar = function(letter){
  if(!word.includes(letter)){ 
    incorrect++
    if(incorrect==trialNum()) status= "lose"
    return
    }
    
    if(inserted.includes(letter)) alert('already exist')

    else {
      inserted.join()

      for (var j = 0; j < word.length; j++) {
       if (word[j] === letter) {
        inserted[j] = letter;
        correct++
        }  
      }
        
    if(correct==getwordLength()) status="win"
    }
    console.log(inserted)
}

let getTrial =function(){
    letter = prompt('Enter a letter')
    if(letter.length>1){
    alert('you must enter one letter')
    getTrial();
    }
 
    checkChar(letter)
    console.log(`
    word: ${word}
    letter: ${letter}
    correct: ${correct}
    incorrect: ${incorrect}
    status: ${status}
    `)
}

while(status=="playing"){
    getTrial()
}
