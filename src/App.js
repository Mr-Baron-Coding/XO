import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { changeScreenSize } from './Features/mobileSlice';
import './App.css';
import GameTable from './Comp/GameTable';

function App() {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(max-width:1000px)');

  useEffect(() => {
    dispatch(changeScreenSize(matches));

  }, [matches, dispatch]);

  return (
    <div className="App">
      <GameTable />
    </div>
  );
}

export default App;
