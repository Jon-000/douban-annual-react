
import React from 'react';

import quotePNG from "./quote.png";

export default function DialoguePage(props) {
  const {
    pageData,
    innerWidth,
    // bgUrl,
    // dialogueText,
    // movieTitle,
  } = props;

  let bgUrl, dialogueText, movieTitle
  innerWidth < 425 ?
    bgUrl = pageData.payload.mobile_background_img :
    bgUrl = pageData.payload.background_img

  dialogueText = pageData.payload.text;
  movieTitle = pageData.subject.title;

  return (
    <div style={{
      width: "100%", height: "100%",
      backgroundColor: "#000",
      backgroundImage: `url(${bgUrl})`,
      backgroundPosition: "50%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      position: "relative",
      }}>
      <div style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: innerWidth > 425 ? "20px 0 80px" : "25px 0 70px",
        backgroundColor: "#000",
      }}>
        <div style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: innerWidth > 425 ? 0 : "0 1.95rem"
        }}>
          <div style={{
            fontSize: innerWidth > 425 ? "calc(2.21rem + 3.3 * (100vw - 414px) / 952)" : "17px", // 不知道豆瓣这么算是什么个意思,rem不同所以我该了下
            textAlign: innerWidth > 425 ? "center" : "left",
            lineHeight: "1.5",
            paddingLeft: innerWidth < 425 ? "40px" : 0,
            position: "relative",
            }}>
            {
              innerWidth < 425 ? 
                <div style={{
                  content: '',
                  display: "inline-block",
                  position: "absolute",
                  left: 0,
                  width: "20px",
                  height: "20px",
                  background: `url(${quotePNG}) 50%/contain no-repeat`,
                }}></div>
                : null
            }
            {dialogueText}
          </div>
          <div style={{
            fontSize: "calc(1.69rem + 2.7 * (100vw - 414px) / 952)", // 不知道豆瓣这么算是什么个意思,rem不同所以我该了下
            textAlign: "right",
            marginTop: "1.95rem",
          }}>
            &mdash;&mdash;《{movieTitle}》
          </div>
        </div>
      </div>
    </div>
  )
}