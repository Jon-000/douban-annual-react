
import React from 'react';
import styled from 'styled-components';

// interface props {
//   pageData
// }

function StartPage(props){
  const {
    innerWidth,
    pageData
  } = props;

  let bgUrl
  if ( innerWidth < 425 ) {
    bgUrl = pageData.payload.mobile_background_img;

  } else {
    bgUrl = pageData.payload.mask_img;
  }

  const BgVideoComponent = () => (
    <div style={{width: "100%", height: "100%"}}>
      <video loop autoPlay style={{width: "100%"}}>
        <source src={pageData.payload.video} type="video/mp4"></source>
      </video>
    </div>
  )

  return (
    <Container>
      <TitleImage src={props.pageData.payload.mobile_title_img}></TitleImage>
      <BgImage style={{backgroundImage: `url(${bgUrl})`}}></BgImage>
      {
        innerWidth > 425 ? <BgVideoComponent></BgVideoComponent> : null
      }

      <BottomInfo>
        <Description>{props.pageData.payload.description}</Description>
      </BottomInfo>
    </Container>
  )
}

export default StartPage

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
`

const TitleImage = styled.img`
display: block;
max-width: 100%;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 2;
width: 55vh;

  @media only screen and (max-width: 425px) {
    width: 45vh;
  }

`
const BgImage = styled.div`
position: absolute;
top:0;
bottom:0;
left:0;
right:0;
background-size: cover;
background-position: 50%;
background-repeat: no-repeat;
z-index: 1;
`

const BottomInfo = styled.div`
width: 100%;
color: hsla(0,0%, 100%, .6);
text-align: center;
position: absolute;
bottom: 0;
z-index: 3;
`

const Description = styled.div`
  padding: 3.2rem;
  font-size: 1.3rem;
  line-height: 2rem;
`

