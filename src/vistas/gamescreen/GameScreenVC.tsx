import React from 'react';
import PlayerViewVC from './components/PlayerViewVC';
import SideBarVC from './components/SideBarVC';
import PlayerViewController from './controllers/PlayerViewController';
import './estilosGameScreen.css';
import { useStore } from '../../store/store';

export default function GameScreenVC(): JSX.Element {

  window.addEventListener('keypress', PlayerViewController.resolverKeyDown);
  const centroPantalla = useStore(state => state.centroPantalla);

  return (
    <>
      <PlayerViewVC centroPantalla={ centroPantalla } />
      <SideBarVC />
    </>
  );

}
