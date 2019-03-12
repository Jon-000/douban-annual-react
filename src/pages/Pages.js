
import React from 'react';
import styled from 'styled-components';

function Pages(props) {
  return (
    <Outer ref={props.setOuterRef}>
      <div ref={props.setInnerRef} 
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: "100%",
          position: "relative",
          transition: `transform ${props.transitionTime || "1s"}`,
          transform: `translate3d(0,${props.innerTranslateY || "0"},0)`,
        }}
        // translateY={props.innerTranslateY}
        // transitionTime={props.transitionTime}
        >
        {props.children}
      </div>
    </Outer>
  )
}

export default Pages;

const Outer = styled.div`
width: 100%;
height: 100%;
overflow: hidden;
// transform: translate(0, 
//   ${props => (props.tY * -100) || 0}%
//   );
`
const Inner = styled.div`
background-color: #000;
width: 100%;
height: 100%;
position: relative;
transition: all ${props => props.transitionTime || "2s"};
// transform: translate(0, 
//   ${props => props.translateY || 0}
//   );

`