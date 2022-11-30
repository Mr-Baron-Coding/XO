import React, { useState, useEffect } from 'react';
import './StyleXO.css';
import { useSelector } from 'react-redux';

export default function GameTable() {
    const isMobile = useSelector((state) => state.mobile.isMobile);
    const [scores, setScores] = useState({ X: 0, O: 0 });    
    const [gameTable, setGameTable] = useState([            // game table base
        [ '','','' ],
        [ '','','' ],
        [ '','','' ]
    ]);
    const [isX, setIsX] = useState(true);                   // who's turn is it? 
    const [isMessage, setIsMessage] = useState(false);      // display winner or new game button 
    const [drawMess, setDrawMess] = useState(false);

    // check for win/ end on every input
    useEffect(() => {
      winningCombo();
    
    }, [isX]);

    // clearing draw header
    useEffect(() => {
        setTimeout(() => setDrawMess(false), 3000);
        setTimeout(() => clearGame(), 4000);
    
    }, [drawMess]);
    

    // reset game
    const clearGame = (val) => {
        console.log(val);
        setIsMessage(false);
        setGameTable([[ '','','' ],[ '','','' ],[ '','','' ]]);
        setIsX(true);

    };

    // the X/O shapes
    const iconStyle = () => {
        return (
            isX ?
            <div className='xIconStyle'>
                <div className='lineOne'></div>
                <div className='lineTwo'></div>
            </div>
            : 
            <div className='oIconStyle'>
                <div className='sphereOne'></div>
                <div className='sphereTwo'></div>
            </div>
        )
    
    };
    
    // print game table
    const rowOrBox = () => {
        return (
            <>
                { gameTable.map((row,rowI) => {
                    return (
                        <div className='columns' key={`row_${rowI}`}>
                            { row.map((cell, cellI) => {
                                return (
                                    <div 
                                        key={ `cellI_${rowI}${cellI}` } 
                                        className={ `xocol_${rowI+1} xorow_${cellI+1} xoCellContainer` }
                                    >
                                        {/* the players placment */}
                                        <div 
                                            className={`cellsXO ${cell}`}
                                            onClick={ () => inputThis(rowI, cellI) }
                                        >
                                            { cell === '' ? '' : cell === 'X' ? <div className='xIconStyle'><div className='lineOne'></div><div className='lineTwo'></div></div> : <div className='oIconStyle'><div className='sphereOne'></div><div className='sphereTwo'></div></div> }
                                        </div>
                                        {/* hover effect */}
                                        { cell === '' && !isMobile ?
                                        <div 
                                            className={ isX ? `hover_${rowI+1}${cellI+1} display_X` : `hover_${rowI+1}${cellI+1} display_O`}
                                        >
                                            { iconStyle() }
                                        </div>
                                        : null
                                        }
                                        
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </>
        )
                
    };

    // game input on users press
    const inputThis = (rowI, cellI) => {
        let arr = gameTable;
        if ( !isMessage ) {
            if ( arr[rowI][cellI] === '') {
                if ( isX ) { 
                    arr[rowI][cellI] = 'X';
                    setIsX(!isX);
                } else {
                    arr[rowI][cellI] = 'O';
                    setIsX(!isX);
                }
            }
        }
        setGameTable(arr);
        let count=0;
        arr.map((row) => row.map((cell) => {
            if ( cell !== '' ){
                return  count++
            }
        }))
        if( count === 9 && !isMessage ) { setDrawMess(true) }
    };

     // check for posible wining positions
     const winningCombo = () => {
        switch (true) {
            // row win
            case (gameTable[0][0] !== '' && gameTable[0][0] === gameTable[0][1] && gameTable[0][1] === gameTable[0][2]):
                if ( gameTable[0][0] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                }
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[0][0]), 2000);
                break;
            case (gameTable[1][0] !== '' && gameTable[1][0] === gameTable[1][1] && gameTable[1][1] === gameTable[1][2]):
                if ( gameTable[1][0] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                }
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[1][0]), 2000);
                break;
            case (gameTable[2][0] !== '' && gameTable[2][0] === gameTable[2][1] && gameTable[2][0] === gameTable[2][2]):
                if ( gameTable[2][0] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                }
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[2][0]), 2000);
                break;

            // col win
            case (gameTable[0][0] !== '' && gameTable[0][0] === gameTable[1][0] && gameTable[0][0] === gameTable[2][0]):
                if ( gameTable[0][0] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                } 
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[0][0]), 2000);
                break;
            case (gameTable[0][1] !== '' && gameTable[0][1] === gameTable[1][1] && gameTable[0][1] === gameTable[2][1]):
                if ( gameTable[0][1] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                }
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[0][1]), 2000);
                break;
            case (gameTable[0][2] !== '' && gameTable[0][2] === gameTable[1][2] && gameTable[0][2] === gameTable[2][2]):
                if ( gameTable[0][2] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                }
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[2][0]), 2000);
                break;
            
                // alahsonim win
            case (gameTable[0][0] !== '' && gameTable[0][0] === gameTable[1][1] && gameTable[0][0] === gameTable[2][2]):
                if ( gameTable[0][0] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                }
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[2][0]), 2000);
                break;
            case (gameTable[2][0] !== '' && gameTable[2][0] === gameTable[1][1] && gameTable[2][0] === gameTable[0][2]):
                if ( gameTable[2][0] === 'X' ) {
                    setScores({ X: scores.X + 1, O: scores.O});
                } else { 
                    setScores({ X: scores.X, O: scores.O + 1});
                }
                setIsMessage(true);
                setTimeout(() => clearGame(gameTable[2][0]), 2000);
                break;
            default:
                break;
        }

    };

    const displayButton = () => {
        return (
            <div 
                className='newGameButton'
                onClick={ () => clearGame() }
            >
                New Game
            </div>
        )
    };
    const displayMess = () => {
            return !isX ? <span style={{ color: 'red' }}>X Won!</span> : <span style={{ color: 'blue' }}>O Won!</span>;
        
    };
    
  return (
    <div className='tikTackToe'>
        { drawMess ? <div className='drawMessStyle'>Draw</div> : null}
        <div className='bottomDiv'>
            { isMessage ? displayMess() : displayButton() }
            <div onClick={ () => setScores({ X: 0, O: 0 })}>Reset Score</div>
        </div>
        <div className='scoreStyle'>
            <div>Score: </div>
            <div>X: { scores.X }</div>
            <div>O: { scores.O }</div>    
        </div>
        <div className='gameFaceContainer'>{ rowOrBox() }</div>
    </div>
  )
}
