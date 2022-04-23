
import styled from 'styled-components'

const Main = styled.main`
  font-family: "Clear Sans", "Helvetiva Neue", Arial, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 500px;

  justify-content: center;

  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  border-bottom: 1px solid #3a3a3c;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;

  margin: 10;
`;

const GameSection = styled.section`
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

const TileContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 5px;

    height: 320px;
    width: 350px;
`;

const TileRow = styled.div`
    width: 85%;
    justify-content: center;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 5px;
`;

const Tile = styled.div`
    display: inline-flex; 
    justify-content: center;
    align-items: center;

    border: 2px solid black;
    font-size: 3.2rem;
    font-weight: bold;
    line-height: 3.2rem;
    text-transform: uppercase;

    ${({hint}) => {
        // console.log("hint:", hint, hint === "green", hint === "yellow");
        if (hint === 'green') {
            return `background-color: #6aaa64;`
        }
        if (hint === 'yellow') {
            return `background-color: #b59f3b;`
        }
        if (hint === 'grey') {
            return `background-color: #6e6e6e;`
        }
    }}

    user-select: none;
    
`;


const KeyboardSection = styled.section`
    height: 200px;
    width: 100%;

    display: flex;
    flex-direction: column;
    margin: 5px;
`;

const KeyboardRow = styled.div`
    width: 100%;
    margin: 0 auto 8px;

    display: flex;
    align-items: center;
    justify-content:  space-around;
`

const KeyboardButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0 6px 0 0; 
    height: 58px;
    /*flex: 1;*/
     ${({ item }) => (item ? `flex: ${item};` : `flex: 1;`)} /* how the fuck does this really work?!?1 */

    border: 0;
    border-radius: 4px;
    background-color: #4e6564;
    font-weight: bold;
    text-transform: uppercase;
    color: #ffff;

    cursor: pointer;
    user-select: none;

    &:last-of-type {
    margin: 0;
  }
`;

/*
  Okay so If I understand this correctly,
  styled.div takes in a format string as an argument.
  Inside this format string we use the $ operator to format in
  an anonumous function that takes in the agument `item`
  and returns a string with the css attribite `flex` and then it formats in the
  item.
  What a mouthuful.
*/

const Flex = styled.div`
  ${({ item }) => `flex: ${item};`} 
`;

export const ShareModal = styled.div``

export const Row = styled.div`
    align-items: center;
    justify-content: center;
`

export const Heading = styled.div`
    font-size: 3em;

`

export const ShareButton = styled.button`
    flex: 1;
    border: solid;
    width:  100px;
    height: 50px;
    justify-content: center;
    align-self: center;
`

export {
    Main,
    Header,
    GameSection,
    TileContainer,
    TileRow,
    Tile,
    KeyboardSection,
    KeyboardRow,
    KeyboardButton,
    Flex
}