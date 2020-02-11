import React, { Component, useState, useEffect, useRef, useLayoutEffect, useReducer } from 'react';
import styled from '@emotion/styled';
import './App.css';

import { api_movie2018 } from './services/doubanApi';
import Slides from './components/slides/Slides';
import Page from './components/page/Page';
import Header from './components/header/Header';
import Pages from './components/pages/Pages';



export const AppContext = React.createContext(null);

let _numOfAppRun = 1
const App = (props) => {
  console.log("App run", _numOfAppRun++)

  // const [state, dispatch] = useReducer(reducer, initialState)


  const [isHeaderDataLoaded, setIsHeaderDataLoaded] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [bgAudioList, setBgAudioList] = useState();


  useEffect(() => {
    //获取目录数据
    getHeaderData();
  }, [])

  function getHeaderData() {
    api_movie2018
      .get('summary.json')
      .then(res => {
        // dispatch({
        //   type: 'FETCH_MENUITEMS_SUCCESS', 
        //   payload: {
        //     menuItems: res.data.res.widget_infos,
        //   }
        // })
        // dispatch({
        //   type: 'FETCH_BGAUDIOLIST_SUCCESS',
        //   payload: {
        //     bgAudioList: JSON.parse(res.data.res.payload.background_musics)
        //   }
        // })
        setMenuItems(res.data.res.widget_infos)
        setBgAudioList(
          JSON.parse(res.data.res.payload.background_musics)
        )
        setIsHeaderDataLoaded(true)
      })
  }

  return (
    // <AppContext.Provider value={{ state, dispatch }} >

      <Container>
        {
          isHeaderDataLoaded ? (
            <Header
              // innerWidth={this.state.innerWidth}
              height="40px"
              menu_infos={menuItems}
              bgAudioList={bgAudioList}
            // active_index={slidesRef.current.currentSlideIndex}
            // onMenuItemClick={MenuItemClickHandler}
            ></Header>
          ) : null
        }

        <Pages menuItems={menuItems}></Pages>

      </Container>
    // </AppContext.Provider>
  );




}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position:relative;
  background-color: #000;
`





