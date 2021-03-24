import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Word from './word.jsx';


const Content = styled.div`
grid-template-areas:
"top"
"center"
"bottom";
width:calc(100vw-20px);
height:50vh;    
background-color: orange;
`

const Top = styled.header`
width: calc(100vw-20px);
height: 10vh;
grid-area: top;
justify-content:center;
display:flex;
align-items: center;
font-size:2rem;
background-color:#e59400;
`

const Center = styled.div`
width: calc(100vw-20px);
height: 30vh;
grid-area: center;
`
const Centerword = styled.div`
width: 60vw;
height: 20vh;
margin: 0 auto;
text-align: center;
`
const Answers = styled.div`
width: 60vw;
height: 10vh;
margin: 0 auto;
text-align: center;
letter-spacing: 5px;
font-size: 1.4rem;
`
const Bottom = styled.footer`
width:calc(100vw-20px);
height:10vh;
justify-content:center;
display:flex;
align-items: center;
grid-area: bottom;
font-size:1.5rem;
background-color:#e59400;
`
const Button = styled.button`
width: 12vw;
height: 6vh;
background-color: cyan;
border-radius: 10px;
margin-left:20px;
font-size:1.5rem;
`

function App(){
    const [newKey, setNewKey] = useState(" ");
    const secretWords = ['Amsterdam', 'Boston', 'Cannes', 'Londyn', 'Berlin', 'Warszawa', 'Oslo', 'Tokio', 'Seul', 'Pekin', 'Sztokholm', 'Lima', 'Moskwa', 'Vancouver', 'Waszyngton', 'Osaka', 'Wiedeń', 'Baku', 'Olsztyn', 'Sofia', 'Praga', 'Kopenhaga', 'Paryż', 'Madryt', 'Bagdad', 'Hawana', 'Luksemburg', 'Meksyk', 'Lizbona', 'Dakar', 'Tajpej', 'Rzym'];
    const [chosenWord, setChosenWord] = useState(secretWords[Math.floor(Math.random()*secretWords.length)].toUpperCase());
    const [knownLetters, setKnownLetters] = useState([]);
    const [knownLettersNum, setKnownLettersNum] = useState(0);
    const [lives, setLives] = useState(10);
    const [letterHistory, setLetterHistory] = useState([]);
    const [gameState, setGameState] = useState("Spróbuj zgadnąć wpisując litery z klawiatury");
    const correctInput = /^[\s\p{L}]+$/u;

    const handleKeyPress = (e) => {
        const nextKey = e.key;
        const isValid = correctInput.test(nextKey);
        if(isValid){
            setNewKey(nextKey.toUpperCase());
            setLetterHistory(prev=>[...prev,nextKey.toUpperCase()]);
        }
    }

    const resetGame = () => {
        setChosenWord(secretWords[Math.floor(Math.random()*secretWords.length)].toUpperCase());
        setNewKey(" ");
        setLives(10);
        setGameState("Spróbuj zgadnąć wpisując litery z klawiatury");
        setKnownLettersNum(0);
        setLetterHistory(new Array());
    }

    const unfoldUnknown = () => {
        let splitWord = [...knownLetters];
        for(let i=0;i<chosenWord.length;i++){
            if(splitWord[i]=='?'&&chosenWord.charAt(i)==newKey){
                splitWord[i]=newKey;
                setKnownLettersNum(prev=>prev+1);
            }
            else splitWord[i]=splitWord[i];
        }
        setKnownLetters(splitWord);
    }
    useEffect(()=>{
        if(knownLettersNum==chosenWord.length){setGameState("Gratulacje");}
    },[knownLettersNum]);

    useEffect(()=>{
        if(lives==0||gameState=="Gratulacje"){
            resetGame();
        }
        else if(chosenWord.includes(newKey)||newKey===" "){
            unfoldUnknown();
        }
        else{
            setLives(lives-1);
        }
    }, [newKey])

    useEffect(()=>{
        if(lives==0){
            setGameState("Przegrana!");
        }
    },[lives])

    useEffect(()=>{
        window.addEventListener('keypress', handleKeyPress);
        return()=>{
            window.removeEventListener('keypress',handleKeyPress);
        }
    },[]);

    useEffect(()=>{
        let splitWord = new Array();
        for(let i=0;i<chosenWord.length;i++){
            splitWord.push("?");
        }
        setKnownLetters([...splitWord]);
    },[chosenWord]);

    return (
        <Content>
            <Top> Zostało {lives} żyć
            <Button onClick={resetGame}>Restart</Button>
            </Top>
            <Center>
                <Centerword>
                    <Word letters={knownLetters} />
                </Centerword>
                <Answers> 
                        {letterHistory}
                </Answers>           
            </Center>
            <Bottom>
                {gameState}
            </Bottom>
        </Content>
    )
}

ReactDOM.render(<App />,document.getElementById('app'));