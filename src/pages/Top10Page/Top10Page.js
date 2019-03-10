
import React from 'react';
import styled from 'styled-components';
import Top1Card from './Top1Card';
import Top29Card from './Top29Card';

// interface props {
//   pageData
// }

function Top10Page(props) {
  const {
    innerWidth,
    pageData,
  } = props
  const {subjects} = pageData

  let bgUrl, top29CardWidth, coverHeight
  innerWidth > 425 ?
    [bgUrl,top29CardWidth, coverHeight] = [pageData.payload.background_img, "94px", "131px" ] :
    [bgUrl,top29CardWidth, coverHeight] = [pageData.payload.mobile_background_img, "80px", "111px"]

  return (
    <Container cc="green" bgUrl={bgUrl}>

    <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
      <div style={{
        flex:"0 1 1024px", // 将这个盒子默认宽度设为1024,默认不填充空隙,可shrink
        display:"flex", // 以下定位盒子内元素的位置,即card的位置
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: `${ props.pageData.payload.left === "on" ? "flex-end" : "flex-start"}`, 
        }}>
        {
          innerWidth < 425 ? 
            <Top1Card
              payloadTitle={pageData.payload.title}
              background_color={pageData.payload.background_color}
              {...props.pageData.subject}
              ></Top1Card>
          :
            <Top1Card
              payloadTitle={pageData.payload.title}
              background_color={pageData.payload.background_color}
              {...props.pageData.subject}
              baseFontSize={15.9} //414*10/260
              description={pageData.payload.description}
              ></Top1Card>
        }
      </div>
    </div>
      <BottomContainer>
        <Bottom>
          {
            subjects.map((s, index) => {
              if (index === 0 ) return
              return (
                <StyledTop29Card topN={index + 1}
                  coverUrl={s.cover}
                  title={s.title}
                  playable={s.playable}
                  rating={s.rating.toFixed(1)}
                  width={top29CardWidth}
                  coverHeight={coverHeight}
                  key={s.id} />
                )
              })
            }
        </Bottom>
      </BottomContainer>
    </Container>
  )
}


export default Top10Page;

const Container = styled.div`
width: 100%;
height: 100%;
padding: 40px 0 50px;
box-sizing: border-box;
display: relative;
background: ${props => props.cc || "red"};
background-image: url(${props => props.bgUrl});
background-size: cover;
background-position: 50%;
// z-index: 0;
display: flex;
flex-direction: column;
`


const Top = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
`
const BottomContainer = styled.div`
width: 100%;
max-width: 1024px;
margin: 0 auto;
overflow: hidden;
`

const Bottom = styled.div`
width: 100%;
display: flex;
flex-direaction: row;
overflow: auto;
 &::-webkit-scrollbar {
  display: none;
}
height: 180px;
`

const StyledTop29Card = styled(Top29Card)`
margin-left: 2.2rem;
  &:first-child {
    margin-left: 0;
  }

  @media only screen and (max-width: 425px) {
    margin-left: 1.5rem;
    &:first-child {
    
      margin-left: 1.5rem;
    }
    &:last-child {
      padding-right: 1.5rem;
    }
  }

`