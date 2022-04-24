import './App.css'
import {
    Main,
    Header,
    GameSection,
    TileContainer,
    TileRow,
    Tile,
    KeyboardSection,
    KeyboardRow,
    KeyboardButton,
    Flex,
    ShareModal,
    Heading,
} from "./styled"

import BackspaceIcon from "./icons"
import { useEffect, useRef } from 'react'
import { useState } from 'react';
import  Modal from 'react-modal'

const Keyboard = [
    Array.from('qwertyuiop'),
    Array.from('asdfghjkl'),
    'enter,z,x,c,v,b,n,m,backspace'.split(',') // Yes I am the lazy

];

const keys = Keyboard.flat();
const wordlength = 6;
let wordOfTheDay = "bendik";

function App() {

    // modals 
    const [isModalVisible, setModalVisible] = useState(false);
    const [isShared, setIsShared] = useState(false);


    // Track guesses
    const [guesses, setGuesses] = useState({
        0: Array.from({length : wordlength}).fill(""),
        1: Array.from({length : wordlength}).fill(""),
        2: Array.from({length : wordlength}).fill(""),
        3: Array.from({length : wordlength}).fill(""),
        4: Array.from({length : wordlength}).fill(""),
    });

    const [markers, setMarkers] = useState({
        0 : Array.from({length : wordlength}).fill(""),
        1 : Array.from({length : wordlength}).fill(""),
        2 : Array.from({length : wordlength}).fill(""),
        3 : Array.from({length : wordlength}).fill(""),
        4 : Array.from({length : wordlength}).fill(""),
    })

    let letterIndex = useRef(0);
    let round = useRef(0);

    const enterGuess = (pressedKey) => {
        if (pressedKey === 'backspace') {
            erase()
        } else if (pressedKey !== 'enter') {
            publish(pressedKey)
        } else if (pressedKey === 'enter') {
            submit()
        }
    };

    const erase = () => {
        const _letterIndex = letterIndex.current;
        const _round = round.current;

  
        if (_letterIndex >= 1) {
            setGuesses((prev) => {
                const newGuesses = {...prev};
                newGuesses[_round][_letterIndex - 1] = "";
                return newGuesses
            });
            letterIndex.current = _letterIndex - 1
        }
    };

    const publish = (pressedKey) => {
        const _letterIdex = letterIndex.current;
        const _round  = round.current;
        
        if (_letterIdex <= wordlength - 1) {
            setGuesses((prev) => {
                const newGuesses = {...prev}
                newGuesses[_round][_letterIdex] = pressedKey.toLowerCase();
                return newGuesses
            });
            letterIndex.current = _letterIdex + 1
        }  
       
    };

    const submit = () => {
        const _round = round.current;
        const updatedMarkers = {
            ...markers,
        };

        const tempWord = wordOfTheDay.split("");
        const leftoverIndices = [];

        // find the green letters ;) 
        tempWord.forEach((letter, index) => {
            const guessedLetter = guesses[_round][index];

            if (guessedLetter === letter) {
                updatedMarkers[_round][index] = 'green';
                tempWord.index = "";
            } else {
                leftoverIndices.push(index);
            };
        });
        
        // Very neat!
        if (updatedMarkers[_round].every((guess) => guess === 'green')) {
            setMarkers(updatedMarkers);
            win()
            return
        }

        if (leftoverIndices.length) {
            leftoverIndices.forEach((index) => {
                const guessedLetter = guesses[_round][index]
                const correctPositionOfLetter = tempWord.indexOf(guessedLetter);

                if (tempWord.includes(guessedLetter) && correctPositionOfLetter !== index) {
                    updatedMarkers[_round][index] = "yellow";
                    tempWord[correctPositionOfLetter] = "";
                } else {
                    updatedMarkers[_round][index] = "grey";
                    tempWord[index] = ""
                }
            })
        }

        setMarkers(updatedMarkers);
        round.current = _round + 1;
        letterIndex.current = 0;
    };


    // keyboard event
    const handleKeyDown = (e) => {
        const key = e.key.toLowerCase()
        if (keys.includes(key)) {
            enterGuess(key)
        }
    }
    useEffect(() => {
        /*
        Moved upstairs ;)
        const handleKeyDown = (e) => { ... 
        */

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, []);

    const handleClick = (e) => {
        console.log(e)
        const pressedKey = e.toLowerCase();
        if (keys.includes(pressedKey)) {
            enterGuess(pressedKey);
        }
    }

    const today = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24
        return Math.floor(diff /oneDay)
    }

    const copyMarkers = () => {
        let shareGuess = ""

        const ammountOfGuesses = Object.entries(markers)
                                .filter(([_, guesses]) => !guesses.includes(""))
                                .map((round) => {
                                    const [ _ , guesses] = round;
                                    console.log(guesses)
                                    guesses.forEach((guess) => {
                                        if (guess === "green") {
                                            shareGuess += ":green_square:"
                                        } else if (guess === "yellow") {
                                            shareGuess += ":yellow_square:"
                                        } else if (guess === "grey") {
                                            shareGuess += ":black_large_square:"
                                        }
                                    });
                                    shareGuess += '\n'
                                    return ""
                                });
        let shareText = `Bendikle ${today()} ${ammountOfGuesses.length}/5\n`;
        navigator.clipboard.writeText(shareText + '\n' + shareGuess)
    }

    const win = () => {
        document.removeEventListener("keydown", handleKeyDown);
        setModalVisible(true);
        copyMarkers();

    }

    function ShareButton(props) {
        return <button onClick={copyMarkers}>Share score!</button>
    }
    
    return (
        <>
        <Main>
            <Header>Bendikle</Header>
            <GameSection>
                <TileContainer> 
                    {
                        Object.values(guesses).map((word, wordIndex) => (
                            <TileRow key={wordIndex}>
                                {
                                    word.map((letter, i) => (
                                        <Tile key={i} hint={markers[wordIndex][i]}>{letter}</Tile>
                                    ))
                                }
                            </TileRow>
                        ))
                    }

                </TileContainer>
            </GameSection>
            <KeyboardSection>
                <KeyboardRow>
                    {[Array.from('qwertyuiop').map((e) => (
                        <KeyboardButton onClick={() => handleClick(e)}>{e}</KeyboardButton>
                    ))]}
                </KeyboardRow>
                <KeyboardRow>
                    <Flex item={0.5}/>
                    {Array.from("asdfghjkl").map((e) => (
                        <KeyboardButton onClick={() => handleClick(e)}>{e}</KeyboardButton>
                    ))}
                    <Flex item={0.5}/>
                </KeyboardRow>
                <KeyboardRow>
                    {['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'].map((e) => (
                        <KeyboardButton onClick={() => handleClick(e)} flex={['enter', 'backspace'].includes(e) ? 1.5 : 1}>
                            {e === 'back' ? <BackspaceIcon/> : e}
                        </KeyboardButton>
                    ))}
                </KeyboardRow>
            </KeyboardSection>
        </Main>
        <div>
            <Modal
                 isOpen={isModalVisible} 
                 onRequestClose={() => setModalVisible(false)}
                 style={{
                     content: {
                         top: "50%",
                         left: "50%",
                         right: "auto",
                         bottom: "auto",
                         marginRight: "-50%",
                         transform: "translate(-50%, 50%)",
                     },
                 }}
                 conentLabel="Share">
                     <Heading>You win!</Heading>
                     <ShareButton/>
            </Modal>
        </div>
        </>
      
    )
}


export default App
