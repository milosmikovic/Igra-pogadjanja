function drawBoard(){
    var out = "";
    for(index = 1;index < 7;index++){
            out+= '<div class="mem-card" data-framework="' + index + '">' 
                    + '<img class="front-face" src="images/' + index + '.jpg" alt="?" />' 
                    +  '<img class="back-face" src="images/front-quest-mark.png" alt="1">'
                    + ' </div>';
            out+= '<div class="mem-card" data-framework="' + index + '">' 
                    + '<img class="front-face" src="images/' + index + '.jpg" alt="?" />' 
                    +  '<img class="back-face" src="images/front-quest-mark.png" alt="1">'
                    + ' </div>';
    }
    document.getElementById("memory-game").innerHTML = out;
} 