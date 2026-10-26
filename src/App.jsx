// main page, controls which screen to show
import { useState } from 'react'
import WelcomeScreen from './views/WelcomeScreen'
import FrameSelector from './views/FrameSelector'
import CameraView from './views/CameraView'
import ConsentScreen from './views/ConsentScreen'
import CreditsScreen from './views/CreditsScreen'
import './App.css'

export default function App() {
  var [screen, setScreen] = useState('welcome')
  var [frame, setFrame] = useState(null)
  var [photo, setPhoto] = useState(null)

  function handleStart() {
    setScreen('frames')
  }

  function handleFrameSelect(selectedFrame) {
    setFrame(selectedFrame)
    setScreen('camera')
  }

  function handleCapture(photoData) {
    setPhoto(photoData)
    setScreen('preview')
  }

  function handleRetake() {
    setPhoto(null)
    setScreen('camera')
  }

  function handleSend() {
    setScreen('consent')
  }

  function handleAllow() {
    // TODO: email photo to USACE
    setScreen('credits')
  }

  function handleDecline() {
    setScreen('credits')
  }

  function handleCredits() {
    setPhoto(null)
    setFrame(null)
    setScreen('welcome')
  }

  if (screen === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />
  }

  if (screen === 'frames') {
    return <FrameSelector onSelect={handleFrameSelect} />
  }

  if (screen === 'camera') {
    return <CameraView frame={frame} onCapture={handleCapture} />
  }

  if (screen === 'preview') {
    return (
      <div className="preview-screen">
        <div className="preview-frame">
          <img src={frame.image} className="preview-frameimg" />
          <img src={photo} className="preview-photo" />
        </div>
        <div className="preview-buttons">
          <button className="savebutton" onClick={function () {
            var canvas = document.createElement('canvas')
            var photoImg = new Image()
            var frameImg = new Image()
            photoImg.src = photo
            frameImg.src = frame.image
            photoImg.onload = function () {
              canvas.width = frameImg.naturalWidth || 1920
              canvas.height = frameImg.naturalHeight || 1080
              var ctx = canvas.getContext('2d')
              ctx.drawImage(photoImg, 0, 0, canvas.width, canvas.height)
              ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height)
              var link = document.createElement('a')
              link.download = 'USACE_Selfie_' + Date.now() + '.png'
              link.href = canvas.toDataURL('image/jpeg', 0.95)
              link.click()
            }
          }}>Save</button>
          <button className="retakebutton" onClick={handleRetake}>Retake</button>
          <button className="sendbutton" onClick={handleSend}>Send</button>
        </div>
      </div>
    )
  }

  if (screen === 'consent') {
    return <ConsentScreen onAllow={handleAllow} onDecline={handleDecline} />
  }

  if (screen === 'credits') {
    return <CreditsScreen onDone={handleCredits} />
  }
}
