
import React, { useState, useEffect, useContext } from 'react';
import StartPage from './StartPage';
import Top10Page from './Top10Page/Top10Page';
import DialoguePage from './Dialogue/DialoguePage';
import { api_movie2018 } from '../services/doubanApi';
import { AppContext } from '../App';
import Loading from '../common/Loading/Loading';

function Page(props) {
  const {
    innerWidth,
  } = props;


  // if (props.pageData === undefined) {
  //   return (
  //     <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
  //       <span>Loading...</span>
  //     </div>
  //   )
  // } else 
  if (props.pageData.kind === 0) {
    return (
      <StartPage pageData={props.pageData} innerWidth={innerWidth}></StartPage>
    )
  } else if (props.pageData.kind === 1) {
    return (
      <Top10Page pageData={props.pageData} innerWidth={innerWidth} ></Top10Page>
    )
  } else if (props.pageData.kind === 2) {
    return (
      <DialoguePage pageData={props.pageData} innerWidth={innerWidth} ></DialoguePage>
    )
  }
  else {
    return (
      <div>这个类型的模板没写</div>
    )
  }

}

const WidthData = (Page) => {
  return (props) => {
    const { index } = props;
    const { state, dispatch } = useContext(AppContext)

    const getOnePage = (pageIndex) => {
      // console.log(`get onepage ${n}'s json`)
      api_movie2018
        .get(`/widget/${pageIndex}.json`)
        .then(res => {
          dispatch({ type: 'FETCH_PAGE_DATA_SUCCESS', payload: { index: index, pageData: res.data.res } })
        })
    }
    useEffect(() => {
      if (state.pages[index]) {
        return;
      }
      getOnePage(index)
    }, [])

    if (state.pages[index]) {
      return (
        <Page pageData={state.pages[index]}  {...props}></Page>
      )
    }
    return (
      <Loading />
    )

  }
}

export default WidthData(Page);