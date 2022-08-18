import { css } from '@emotion/css'
import React, { useCallback, useEffect, useState } from 'react'
import './App.css'

type Props = {
  num: number
}

function useStyles() {
  const container = css`
    margin: 20px;
  `

  const cellContainer = css`
    display: flex;
  `

  const cell = css`
    width: 100px;
    height: 100px;
  `

  return {
    cell,
    container,
    cellContainer,
  }
}

function App() {
  const [square, setSquare] = useState(Array(9).fill(''))
  const [turn, setTurn] = useState<string>('x')
  const [winner, setWinner] = useState<string>('')
  const styles = useStyles()

  const Cell = ({ num }: Props) => {
    return (
      <button onClick={() => onClick(num)} className={styles.cell}>
        {square[num]}
      </button>
    )
  }

  const onClick = (num: any) => {
    if (square[num] !== '' || winner !== '') {
      alert('すでにとられています')
      return
    }
    let board = [...square]
    if (turn === 'x') {
      board[num] = 'x'
      setTurn('o')
    } else {
      board[num] = 'o'
      setTurn('x')
    }
    setSquare(board)
    //eslint-disable-next-line
  }

  useEffect(() => {
    winnerPettern()
  }, [square])

  const winnerPettern = () => {
    let combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < 8; i++) {
      if (
        square[combos[i][0]] === '' ||
        square[combos[i][1]] === '' ||
        square[combos[i][2]] === ''
      ) {
      } else if (
        square[combos[i][0]] === square[combos[i][1]] &&
        square[combos[i][1]] === square[combos[i][2]]
      ) {
        setWinner(square[combos[i][0]])
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1>tic tac toe</h1>
      <div className={styles.cellContainer}>
        <Cell num={0} />
        <Cell num={1} />
        <Cell num={2} />
      </div>
      <div className={styles.cellContainer}>
        <Cell num={3} />
        <Cell num={4} />
        <Cell num={5} />
      </div>
      <div className={styles.cellContainer}>
        <Cell num={6} />
        <Cell num={7} />
        <Cell num={8} />
      </div>
      {winner && (
        <>
          <p>{winner}の勝ち</p>
        </>
      )}
    </div>
  )
}

export default App
