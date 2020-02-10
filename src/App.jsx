import React, { Component, useState, useEffect, useRef, useLayoutEffect, useReducer } from 'react';
import styled from 'styled-components';
import './App.css';

import { api_movie2018 } from './services/doubanApi';
import Pages, { Slide } from './pages/Pages';
import Page from './pages/Page'
import Header from './header/Header';
import Slides from './pages/Pages';



export const AppContext = React.createContext(null);

const initialState = { menuItems: [], bgAudioList: [], pages: {}, }

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_MENUITEMS_SUCCESS':
      return {
        ...state,
        menuItems: action.payload.menuItems
      }
    case 'FETCH_BGAUDIOLIST_SUCCESS':
      return {
        ...state,
        bgAudioList: action.payload.bgAudioList
      }
    case 'FETCH_PAGE_DATA_SUCCESS':
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.payload.index]: action.payload.pageData,
        }
      }
    case 'FETCH_PAGE_DATA_ERROR':
    default:
      return state;
  }
}

let _numOfAppRun = 1
const App = (props) => {
  console.log("App run", _numOfAppRun++)

  const [state, dispatch] = useReducer(reducer, initialState)

  const slidesRef = useRef();

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


  // updateWindowDimensions = () => {
  //   this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  // }


  const buttonNextHandler = () => {
    // goToPage(currentPageIndex + 1);
    slidesRef.current.goToSlideHoF(p => p + 1, 0)
  }

  return (
    <AppContext.Provider value={{ state, dispatch }} >

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

        <Slides
          num={68}
          ref={slidesRef}
          initSlideIndex={0}
          syncWindowLocationHash={true}
        // transitionTime={_transitionTime.current}
        // transitionTime={0}
        // tempSlideIndex={tempSlideIndex}
        // onWheel={handleWheel}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
        >
          {
            menuItems.map((item, index) => {
              return (
                // <Slide index={index}>
                // <div>item.id: {item.id}</div>

                <Page
                  index={index}
                  key={`page-${index}`}
                // pageData={state.pages[index]}
                // innerWidth={this.state.innerWidth}
                ></Page>
                // </Slide>
              )
            }
            )
          }
          {/* {
          shouldRenderPageIndex(currentPageIndex).map(i => (
            <Slide key={i} index={i}>
              <Page
                pageData={pages[i]}
              // innerWidth={this.state.innerWidth}
              ></Page>
            </Slide>
          ))
        } */}
        </Slides>

        <ButtonNext
          onClick={buttonNextHandler}
        >
          <IconNext width="1.6rem" height="1.6rem"></IconNext>
        </ButtonNext>
      </Container>
    </AppContext.Provider>
  );




}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position:relative;
  background-color: #000;
`



const IconNext = styled.div`
&::before {
  display: block;
  content: '';
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADmwAAA5sBPN8HMQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEOSURBVGiB7dfNToNAFIZhuEZsNLGJS/C2NY2LdmFc0tbXDRNPyAwFhflpvjfphjAz5wllQVUppZRSSim1JOAJ+ALegCb1POOAB+AAfAK70E01cOS3C/AcedZgwH6YyXUC6tDNFpINxoMA+Jha8OhZkBQTQFxu/vWBBuhHC7+BLtLsdpbX4WxbP/v9zQHzb4TZKBlmNYTZMDpmdYTZOBoG6DZBmAM2x2yOMAdthomGMAeujomOMAevhkmGMAOEMO2CPdIizCB/xmSDMAMtxmSHMIPNxmSLcM3BZI9wBTBX4AVoi0C48H87nD3XsvhgmyzwZMp4EuMmMOUgXB5MeQjXgHkffmUilFJKKaXU/fQD/JJjbhigL+0AAAAASUVORK5CYII=);
  background-size: contain;
}
// @media only screen and (max-width: 414px) {
//   width: ${props => props.width};
//   height: ${props => props.height};
//   }
`

const ButtonNext = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  z-index: 2;
  background: transparent;
  border-radius: 50%;
  width: ${props => props.width};
  height: ${props => props.height};
  border: 1px solid #fff;
  padding: 1.5rem;
  background-color: rgba(0,0,0,.2);

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 425px) {
    left: 50%;
    transform: translateX(-50%);
    border: none;
  }
`

const WithInfoPanel = (Component) => {
  return (props) => {
    return (
      <React.Fragment>
        <Component {...props}></Component>

        <div style={{ position: "fixed", minWidth: "150px", height: 50, border: "1px solid red", color: "red", top: "30%", zIndex: 1000 }}>
          <div>{Component}</div>
          {
            props.map((prop) => {
              return (
                <div>
                  {prop}
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
    )
  }
}