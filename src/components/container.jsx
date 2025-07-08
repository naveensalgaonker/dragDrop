import React, { useEffect, useState } from 'react'

const Container = () => {
  const BOARD_SIZE = [4, 4]
  const CELL_SIZE = 50;
  // const BOARD_SIZE = [1, 1]
  // const CELL_SIZE = 500;

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
          piece: (i===0 && j===0)? {top:50,left:50}:null,
          id: `${i}_${j}`
        })
      }
    }
    console.log(">>>BoardGenerated", tempBoard);
    setBoard(tempBoard)
  }

  function addPiece(){
    let action = false;
    let tempB = board.map(r=>{
      r.map(c=>{
        if(!c.piece && !action){
          c.piece = {
            top:50,
            left:50
          };
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
    movePiece(dragging,cell,e)
    setDragging(null)
  };

  const movePiece=(from,to,event)=>{
    console.log(">>>>MOVE",event);
    const mBoard = board;
    let {piece,x,y} = from;
    
    if(piece){
      const cellRect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - cellRect.left;
      const offsetY = event.clientY - cellRect.top;

      const leftPercent = (offsetX / CELL_SIZE) * 100;
      const topPercent = (offsetY / CELL_SIZE) * 100;

      mBoard[x][y].piece = null
      mBoard[to.x][to.y].piece = {
        left:leftPercent,
        top:topPercent
      }
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
                      style={{
                        width:CELL_SIZE,
                        height:CELL_SIZE
                      }}
                    >
                      {cell?.piece ? 
                        <div 
                          className='piece' 
                          style={{
                            ...(cell?.piece?.top && { top: `${cell.piece.top}%` }),
                            ...(cell?.piece?.left && { left: `${cell.piece.left}%` }),
                            ...(cell?.piece?.top && cell?.piece?.left && {
                              transform: `translate(-${cell.piece.top}%, -${cell.piece.left}%)`
                            })
                          }}
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