import React, { useReducer, useRef } from "react";
import styled from '@emotion/styled';
import Slides from "../slides/Slides";
import Page from "../page/Page";
export const PageDataContext = React.createContext(null);

const pages = {}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_PAGE_DATA_SUCCESS':
      return {
        ...state,
        [action.payload.index]: action.payload.pageData
      }
    // return {
    //   ...state,
    //   pages: {
    //     ...state.pages,
    //     [action.payload.index]: action.payload.pageData,
    //   }
    // }
    case 'FETCH_PAGE_DATA_ERROR':
    default:
      return state;
  }
}
const Pages =
  (props) => {
    const {
      menuItems
    } = props;
    const [state, dispatch] = useReducer(reducer, pages)
    const slidesRef = useRef();


    const buttonNextHandler = () => {
      // goToPage(currentPageIndex + 1);
      slidesRef.current.goToSlideHoF(p => p + 1, 0)
    }
    
    return (
      <PageDataContext.Provider value={{ state, dispatch }}>
        <Slides
          ref={slidesRef}
          initSlideIndex={0}
          syncWindowLocationHash={true}
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
        </Slides>
        <ButtonNext
          onClick={buttonNextHandler}
        >
          <IconNext width="1.6rem" height="1.6rem"></IconNext>
        </ButtonNext>
      </PageDataContext.Provider >
    )
  }


export default Pages;

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