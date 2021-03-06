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
            QUARANTINE:'It is a restraint upon the activities or communication of persons or the transport of goods designed to prevent the spread of disease or pests, for a certain period of time.',
            JINX:'A person or thing that brings bad luck.',
            OXYGEN: 'A colorless, odorless reactive gas, the chemical element of atomic number 8 and the life-supporting component of the air.',
            YACHT: 'A medium-sized sailboat equipped for cruising or racing.',
            ZOMBIE: 'A corpse said to be revived by witchcraft, especially in certain African and Caribbean religions.',
            NEWTON: 'Discoverer of Gravity.',
            DEMIGOD: 'Offspring of a god and human.',
            ZEUS: 'Greek God of lightning.',
            ADAMANTIUM: 'A substance bonded to the character Wolverine\'s skeleton and claws',
            BLACKHOLE:'A region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it',
            MESSI: 'God of Football, plays for FC Barcalona.',
            RONALDO: 'Second best Soccer player on earth, plays for Juventus FC',
            ALOHOMORA: 'A spell that is used to opens locks on doors and windows in Harry Potterverse.',
            MINATONAMIKAZE: 'Naruto\'s father\'s name', 
            }
            result = [];
            word_selector = Math.floor((Math.random() * (Object.keys(words).length)));
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
                            document.getElementById("thescore").innerHTML= player_name  + '\'s score: '+ count + '; Lives left: ' + lives
                            
                        }
                    }
                    if(selected_word.includes(String.fromCharCode(i+65))==false)
                    {
                        // console.log('red')
                        btn.style.backgroundColor = 'red'
                        btn.disabled = true
                        count--
                        lives--;
                        document.getElementById("thescore").innerHTML= player_name  + '\'s score: '+ count + '; Lives left: ' + lives 
                      
                        console.log(lives)
                    }
                    console.log(lives)
                    checker(result, selected_word)
                    endGame(lives, count); 
                    }            
                }
                document.getElementById("thescore").innerHTML= player_name  + '\'s score: '+ count + '; Lives left: ' + lives 
            }
        
        function endGame(count, score){// when player dies in game genrates the score and restart button
            if(count <= 0){
                document.getElementById('characters').style.display = 'none';
                document.getElementById('buttons').style.display = 'none';
                document.getElementById('definition').style.display = 'none'
                document.getElementById('playingarea').style.display = 'none'
                //document.getElementById('displayscore').style.display = 'none'
                document.getElementById('over').innerHTML = 'Game Over'+ "<br>"+"Your Score is"+ score + "<br>" + "The Answer was : " + selected_word

                let restart = document.createElement('P');
                document.getElementById('over').appendChild(restart);
                restart.style.cursor= 'pointer'
                restart.innerHTML = 'Click to Restart'
                restart.onclick = function(){ // reloading the page for restarting the game
                    location.reload();
                };
                save_score(score)
                display_board()
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
        function save_score(score){
            let player_name = document.getElementById('name').value
            let firebaseRef = firebase.database().ref().child("players")
            firebaseRef.child(player_name).set({"name": player_name, "score": score})   
        }
        function display_board(){
            let rootRef = firebase.database().ref().child('players');
            rootRef.on("child_added", snap => {
                let name = snap.child("name").val()
                let score = snap.child("score").val()
                let table = document.createElement("table")
                document.body.appendChild(table)
                table.id = "tabl"
                document.getElementById('tabl').append("<tr><td>"+name+"</td><td>"+score+"</td></tr>");
            })
        }
        