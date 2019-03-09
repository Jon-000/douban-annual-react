
import React, {useState} from 'react';
import './Header.scss';

export default function Header(props) {

  const  {
    menu_infos,
    active_index,
    onBtnMenuClick,
    background_musics,
  } = props

  const [showNav, setShowNav] = useState(false);

  const onNavLiClick = (index) => {
    window.location.hash = `#${index}`
    // 重新添加事件handler
    onBtnMenuClick({showNav: false})
    setShowNav(false)
  }

  return (
    <header className="c">
      <div className="left">
        <img className="icon" src="https://img3.doubanio.com/view/activity_page/raw/public/p3065.jpg" />
        <img className="icon" src="data:image/png;base64,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" />
        <div>豆瓣2018年度电影榜单</div>
        <div className="share">分享</div>
      </div>

      <div className="right">
        <div>
        <img className="music" src="data:image/gif;base64,R0lGODlhHAAcAPABAP///wAAACH5BAkeAAEAIf8LTkVUU0NBUEUyLjADAQAAACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJPjI+py+0BIngUyvrkxE3zfn2LJypkiZyooaah0x6x+SazXbsRdd/6RttlcjJiEIgTwowWZVKD/DGgzB41WnT+rNosdFq9grss8ShMXqkZBQAh+QQJHgABACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJGjI+py+0PDZggPlptw3rTznCgIo5IaUrYZ67s6E5pnMHxfLe57eL9gjrtEsEDLfQiDoUy4NKYZK6QTdJTVVX+rFlp6qspAAAh+QQJHgABACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJQjI+py+1vgAQQTlrdzXrytn1LKCZkeZxooKbe00ZvJzGxOeM1nCO333PtaBjFT1jUXZLAofIGXTqbTGR0ag3KsNulTcuSVrtfaXkc5q7WjAIAOw==" />
        </div>
        <button className="btn-menu"
          onClick={() => {
            setShowNav(!showNav);
            onBtnMenuClick({showNav: true})
          }}
          >
          <div className="icon-doulist">
            目录
          </div>
        </button>
      </div>
      <nav className="nav-container" style={{
        visibility: showNav? "visible" : "hidden",
        }}>
        <ol className="nav-list">
          {
            menu_infos ? (
              menu_infos.map((i, index )=> {
                return (
                  <li className="nav-li" key={"nav-li" + index}
                    style={{color: active_index === index ? "#fff": null }}
                    >
                    {
                    i.show_divider ? (
                      <div className="li-divider">
                        <span >{i.show_divider_txt}</span><hr/>
                      </div>): null
                    }
                    <div><a onClick={onNavLiClick.bind(this, index)}>{i.title}</a></div>  
                  </li>
                )
              })
            ) : <Loading></Loading>
          }
        </ol>
        <div className="nav-close">
          <button onClick={() => {
            setShowNav(false)
            onBtnMenuClick({showNav: false})
            }}></button>
        </div>
      </nav>
    </header>
  )
}

function Loading(props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <span>Loading</span>
    </div>
  )
}