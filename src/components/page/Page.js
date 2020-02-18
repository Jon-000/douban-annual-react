
import React, { useState, useEffect, useContext, useMemo } from 'react';
import StartPage from './StartPage';
import Top10Page from './Top10Page/Top10Page';
import DialoguePage from './Dialogue/DialoguePage';
import { api_movie2018 } from '../../services/doubanApi';
import Loading from '../common/Loading/Loading';
import { PageDataContext } from '../pages/Pages';

let _numOfPageRun = 1
let _numOfPageMemoRun = 1
const Page =
  React.memo(
    (props) => {

      const {
        innerWidth,
        pageData
      } = props;
      console.log("Page memo run", _numOfPageMemoRun++)

      // if (pageData === undefined) {
      //   return (
      //     <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
      //       <span>Loading...</span>
      //     </div>
      //   )
      // } else 
      if (pageData.kind === 0) {
        return (
          <StartPage pageData={pageData} innerWidth={innerWidth}></StartPage>
        )
      } else if (pageData.kind === 1) {
        return (
          <Top10Page pageData={pageData} innerWidth={innerWidth} ></Top10Page>
        )
      } else if (pageData.kind === 2) {
        return (
          <DialoguePage pageData={pageData} innerWidth={innerWidth} ></DialoguePage>
        )
      }
      else {
        return (
          <div>这个类型的模板没写</div>
        )
      }

    }
  )


const withData = (Page) => {
  return (props) => {
    const { index } = props;
    const { state, dispatch } = useContext(PageDataContext)

    const getOnePage = (pageIndex) => {
      // console.log(`get onepage ${n}'s json`)
      api_movie2018
        .get(`/widget/${pageIndex}.json`)
        .then(res => {
          dispatch({ type: 'FETCH_PAGE_DATA_SUCCESS', payload: { index: index, pageData: res.data.res } })
        })
    }
    useEffect(() => {
      if (state[index]) {
        return;
      }
      getOnePage(index)
    }, [])

    if (state[index]) {
      return (
        <Page pageData={state[index]}  {...props}></Page>
      )
    }
    return (
      <Loading />
    )

  }
}

export default withData(Page);