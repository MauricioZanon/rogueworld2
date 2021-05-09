import React from 'react';
import PlayerViewVC from './components/PlayerViewVC';
import SideBarVC from './components/SideBarVC';
import './estilosGameScreen.css';
import PlayerViewController from './controllers/PlayerViewController';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export default class GameScreenVC extends React.Component {
  public componentDidMount(): void {
    window.addEventListener('keypress', PlayerViewController.resolverKeyDown);
  }

  public render(): JSX.Element {
    return (
      <Provider store={ store }>
        <PlayerViewVC />
        <SideBarVC />
      </Provider >
    );
  }
}
