
import React from 'react';
import styled from 'styled-components';

// interface props {
//   pageData
// }

function Top10Page(props) {

  return (
    <Container cc="green" bgUrl={props.pageData.payload.mobile_background_img}>
  
    </Container>
  )
}


export default Top10Page;

const Container = styled.div`
width: 100%;
height: 100%;
display: relative;
background: ${props => props.cc || "red"};
background-image: url(${props => props.bgUrl});
background-size: cover;
background-position: 50%;
// z-index: 0;
`