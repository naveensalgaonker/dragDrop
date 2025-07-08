import React, { useEffect, useState } from 'react'

const Container = () => {
  const BOARD_SIZE = [4, 4]
  const [board, setBoard] = useState()
  const [dragging, setDragging] = useState();

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
    // console.log(">>>BoardGenerated", tempBoard);
    setBoard(tempBoard)
  }

  function addPiece(){
    let action = false;
    let tempB = board.map(r=>{
      r.map(c=>{
        if(!c.piece && !action){
          c.piece = true;
          action = true;
        }
      })
      return r;
    })
    setBoard(tempB)
  }

  function removePiece(){
    let action = false;
    let tempB = board.map(r=>{
      r.map(c=>{
        if(c.piece && !action){
          c.piece = null;
          action = true;
        }
      })
      return r;
    })
    setBoard(tempB)
  }

  const handleDragStart = (e,cell) => {
    // console.log(">>>>handleDragStart",e);
    setDragging(cell);
  };

  const handleDrop = (e,cell) => {
    e.preventDefault();
    console.log(">>>>handleDrop",e,cell);
    movePiece(dragging,cell)
    setDragging(null)
  };

  const movePiece=(from,to)=>{
    // console.log(">>>>MOVE",from,to);
    const mBoard = board;
    let {piece,x,y} = from;
    if(piece){
      mBoard[x][y].piece = null
      mBoard[to.x][to.y].piece = piece
      setBoard(mBoard)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault(); // This is required to allow dropping
  };


  return (
    <div className='boardContainer'>
      <button type="button" onClick={()=>addPiece()}>Add +</button>
      <button type="button" className='removeBtn' onClick={()=>removePiece()}>Remove</button>
      {
        board?.length ? <div className='board'>
          {
            board.map((row, i) => (
              <div className='boardRow' key={i}>
                {
                  row.map((cell, j) => (
                    <div className='boardCell' key={cell.id} 
                      onDragOver={handleDragOver}
                      onDrop={e=>handleDrop(e, cell)}
                    >
                      {cell?.piece ? 
                        <div 
                          className='piece' 
                          draggable onDragStart={(e) => handleDragStart(e,cell)}
                        ></div>
                        :null}
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