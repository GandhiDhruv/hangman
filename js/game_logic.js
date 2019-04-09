let result = []
let selected_word = ''
let count=0
function select_word(){
    // selects words and the corresponding definition of the word for guessing and pushes it to an element on the page
            words = {
            COMMITTEE: 'A group of people appointed for a specific function, typically consisting of members of a larger group',
            TATTOO: 'A form of body modification where a design is made by inserting ink',
            ELECTRICITY: 'The set of physical phenomena associated with the presence and motion of electric charge.',
            NARCISSISM:'The pursuit of gratification from vanity or egotistic admiration of one\'s idealised self image and attributes.',
            QUARANTINE:'it is a restraint upon the activities or communication of persons or the transport of goods designed to prevent the spread of disease or pests, for a certain period of time.'
            }
            result = [];
            word_selector = Math.floor((Math.random() * 5));
            selected_word=Object.keys(words)[word_selector]
            meaning = words[selected_word]   
            //console.log(selected_word)
            document.getElementById("definition").innerHTML = meaning
            //console.log(selected_word.length)
            for(let i=0;i<selected_word.length;i++){
                result.push('_ ')
            }
            carrier = document.createElement("p")
            carrier.id = 'rmv'
            carrier.innerHTML=result.join("")
            document.getElementById("playingarea").appendChild(carrier)
            document.getElementById('getname').style.display='none';
        }
                
        function generateButtons(){ 
            // generates buttons and its function              
            let lives =7;
            let player_name = document.getElementById('name').value
            let but_container = document.createElement("p")
            but_container.id = 'dashes'
             for(let i=0;i<26;i++){
                let btn = document.createElement("button")
                btn.id= 'btns'
                but_container.appendChild(btn).innerHTML=String.fromCharCode(i+65) + " "
                document.getElementById("buttons").appendChild(but_container)
                btn.onclick=function game_logic(){
                    // console.log(String.fromCharCode(i+65))
                    //console.log(selected_word)
                    for (let j=0;j<=selected_word.length;j++){
                        if (selected_word[j]==String.fromCharCode(i+65)){
                            //console.log('i='+i+'j='+j)
                            result[j] = String.fromCharCode(i+65)
                            carrier.innerHTML=result.join('')
                            btn.style.backgroundColor = 'green'
                            // console.log('green')
                            btn.disabled = true
                            count++
                            document.getElementById("thescore").innerHTML= player_name  + '\'s score: '+ count
                            
                        }
                    }
                    if(selected_word.includes(String.fromCharCode(i+65))==false)
                    {
                        // console.log('red')
                        btn.style.backgroundColor = 'red'
                        btn.disabled = true
                        count--
                        document.getElementById("thescore").innerHTML= player_name  + '\'s score: '+ count
                        lives--;
                        console.log(lives)
                    }
                    console.log(lives)
                    checker(result, selected_word)
                    endGame(lives); 
                    }            
                } 
            }
        
        function endGame(count){// when player dies in game genrates the score and restart button
            if(count <= 0){
                document.getElementById('characters').style.display = 'none';
                document.getElementById('buttons').style.display = 'none';
                document.getElementById('definition').style.display = 'none'
                document.getElementById('playingarea').style.display = 'none'
                //document.getElementById('displayscore').style.display = 'none'
                document.getElementById('over').innerHTML = 'Game Over' + "<br>" + "The Answer was : " + selected_word

                let restart = document.createElement('P');
                document.getElementById('over').appendChild(restart);
                restart.style.cursor= 'pointer'
                restart.innerHTML = 'Click to Restart'
                restart.onclick = function(){ // reloading the page for restarting the game
                    location.reload();
                };
            }
        }
        function checker(x, y){
            // check if player has guessed the correct word and then calls 
            new_result = x.join('')
            if((new_result == y)== true){
                select_word()
                remove = document.getElementById('rmv')
                remove.parentNode.removeChild(remove);
                z = document.getElementById("dashes")
                z.parentNode.removeChild(z)
                generateButtons()
                return true
            }
            else if((result == select_word)== true){
                    console.log(false)
                    return false
                }
            }
        