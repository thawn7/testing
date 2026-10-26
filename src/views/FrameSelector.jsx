import { useRef, useState, useEffect } from 'react'
import './FrameSelector.css'
import usaceLogo from '../images/usace-logo.png'
import nsuLogo from '../images/nsu-logo.png'

import cantonLake from '../images/canton-lake.png'
import fortSupplyLake from '../images/fort-supply-lake.png'
import keystoneLake from '../images/keystone-lake.png'
import lock18Rfh from '../images/lock-18-rfh.png'
import mkarns from '../images/mkarns.png'
import mountCorpsmore from '../images/mount-corpsmore.png'

var frames = [
  { name: 'Canton Lake', image: cantonLake },
  { name: 'Fort Supply Lake', image: fortSupplyLake },
  { name: 'Keystone Lake', image: keystoneLake },
  { name: 'Lock 18 RFH', image: lock18Rfh },
  { name: 'MKARNS', image: mkarns },
  { name: 'Mount Corpsmore', image: mountCorpsmore },
]

export default function FrameSelector({ onSelect }) {
  var [selected, setSelected] = useState(0)
  var stripRef = useRef(null)
  var cardRefs = useRef([])

  useEffect(function () {
    var strip = stripRef.current
    if (!strip) return

    function handleScroll() {
      var stripCenter = strip.scrollLeft + strip.offsetWidth / 2
      var closest = 0
      var closestDist = 99999

      for (var i = 0; i < cardRefs.current.length; i++) {
        var card = cardRefs.current[i]
        if (!card) continue
        var cardCenter = card.offsetLeft + card.offsetWidth / 2
        var dist = Math.abs(stripCenter - cardCenter)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      }
      setSelected(closest)
    }

    strip.addEventListener('scroll', handleScroll)
    return function () {
      strip.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="app second-page">
      <header className="header">
        <div className="logo-row">
          <img src={nsuLogo} className="logo nsu-logo" />
          <img src={usaceLogo} className="logo" />
        </div>
        <h1>Choose a Frame</h1>
        <p className="subtitle"><strong>US Army Corps of Engineers&reg;</strong></p>
        <p className="subtitle">Tulsa District</p>
      </header>

      <p className="swipe-hint">Swipe to select a frame!</p>
      <div className="scroll-strip" ref={stripRef}>
        <div className="scroll-spacer" />
        {frames.map(function (frame, i) {
          var className = 'scroll-card'
          if (i === selected) {
            className = 'scroll-card scroll-card-selected'
          }
          return (
            <div
              key={frame.name}
              className={className}
              ref={function (el) { cardRefs.current[i] = el }}
            >
              <img src={frame.image} className="scroll-thumb" />
              <p className="scroll-name">{frame.name}</p>
            </div>
          )
        })}
        <div className="scroll-spacer" />
      </div>

      <button className="selectbutton" onClick={function () { onSelect(frames[selected]) }}>
        Tap to Select
      </button>
    </div>
  )
}
