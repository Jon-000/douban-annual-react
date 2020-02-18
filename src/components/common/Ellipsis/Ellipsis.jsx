
import React, { useRef, useState, useEffect } from 'react';

const Ellipsis = ({
  children
}) => {
  console.log(children)
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

let _numOfEllipsisTextRun = 1
export const EllipsisText = React.memo(({
  text = "",
  containerRef
}) => {
  // console.log("Ellipsis run", _numOfEllipsisTextRun++, text)
  const [isOverFlow, setIsOverFlow] = useState(false)

  useEffect(() => {
    let containerScrollHeight = parseFloat(containerRef.current.scrollHeight)
    let containerCompStyles = window.getComputedStyle(containerRef.current)
    let containerHeight = parseFloat(containerCompStyles.height)

    if (containerScrollHeight > containerHeight) {
      setIsOverFlow(true)
      console.log(text, "isOverFlow:", isOverFlow)
    }
  },[])

  return (
    <span>
      {
        isOverFlow ?  
        text.substring(0, 6) + "\u2026"
        :
        text
        }
    </span>
  )
})
const TestUse = () => {
  const containerRef = useRef(null)
  return (
    <div ref={containerRef}>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque architecto laborum est molestiae blanditiis deleniti ipsum eveniet commodi adipisci dolores.</div>
      <Ellipsis
        lineNumber={2}
        renderAfterText={AfterTextElement}
      >Lorem ipsum dolor sit amet consectetur.
        </Ellipsis>
      <EllipsisText containerRef={containerRef} >
        这是几句,中文字体的话语凑字数的.my name is xxx, i live in xxx.
      </EllipsisText>
      <span>read more</span>
    </div>
  )
}

const AfterTextElement = () => {
  return (
    <span>Read more</span>
  )
}