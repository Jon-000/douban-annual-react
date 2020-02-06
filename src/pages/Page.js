
import React from 'react';
import styled from 'styled-components';
import StartPage from './StartPage';
import Top10Page from './Top10Page/Top10Page';
import DialoguePage from './Dialogue/DialoguePage';

function Page(props) {
  const {
    innerWidth,
  } = props;
  
  if (props.pageData === undefined) {
    return (
      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent:"center", color: "white"}}>
        <span>Loading...</span>
      </div>
    )
  } else if (props.pageData.kind === 0) {
      return(
          <StartPage pageData={props.pageData} innerWidth={innerWidth}></StartPage>
      )
    } else if (props.pageData.kind ===1) {
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

export default Page;