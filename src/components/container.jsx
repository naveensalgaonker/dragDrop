import React, { useEffect, useState } from 'react'

const Container = () => {
  const BOARD_SIZE = [4, 4]
  const [board, setBoard] = useState()

  useEffect(() => {
    generateBoard()
  }, [])

  function generateBoard() {
    const tempBoard = []
    for (let i = 0; i < BOARD_SIZE[0]; i++) {
      if (!tempBoard[i]) {
        tempBoard[i] = []
      }
      for (let j = 0; j < BOARD_SIZE[1]; j++) {
        tempBoard[i].push({
          x: i,
          y: j,
          piece: null,
          id: `${i}_${j}`
        })
      }
    }
    console.log(">>>BoardGenerated", tempBoard);
    setBoard(tempBoard)
  }

  return (
    <div>
      <button type="button">Add +</button>

      {
        board?.length ? <div className='board'>

          {
            board.map((row, i) => (
              <div className='boardRow' key={i}>
                {
                  row.map((cell, j) => (
                    <div className='boardCell' key={cell.id}>
                      Cell
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div> : null
      }
    </div>
  )
}

export default Container;