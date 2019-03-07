
import React from 'react';
import styled from 'styled-components';
import StartPage from './StartPage';
import Top10Page from './Top10Page/Top10Page';

function Page(props) {
  console.log('page component')
  if (props.pageData === undefined) {
    return (
      <Container>Loading...</Container>
    )
  } else if (props.pageData.kind === 0) {
      return(
        <Container pageIndex={props.pageIndex}>
          <StartPage pageData={props.pageData}></StartPage>
        </Container>
      )
    } else if (props.pageData.kind ===1) {
      return (
        <Container pageIndex={props.pageIndex}>
          <Top10Page pageData={props.pageData}></Top10Page>
        </Container>
      )
    } else {
      return (
        <Container pageIndex={props.pageIndex}>
          <div>这个类型的模板没写</div>
        </Container>
      )
    }

}

export default Page;

const Container = styled.div`
width:100%;
height:100%;
position: absolute;
transform: translate(0, ${
  props => props.pageIndex * 100
}%);
`