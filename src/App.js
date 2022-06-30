import React from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false); //It represents wether the user has won the game or not
  console.log(dice);

  React.useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.held); //Every returns a boolean if the condition is true for all the elements in the array
    const allSameNumber = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameNumber) {
      setTenzies(true);
    }
  }, [dice]);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      held: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const newDie = generateDie();
      newDice.push(newDie);
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      // To only change the dices that aren't being held
      setDice((oldDice) =>
        oldDice.map((die, i) => (die.held ? die : generateDie()))
      );
    } else {
      // To reset the game
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, held: !die.held } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
