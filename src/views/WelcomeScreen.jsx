// the first page
import './WelcomeScreen.css'
import usaceLogo from '../images/usace-logo.png'
import nsuLogo from '../images/nsu-logo.png'

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="app">
      <header className="header">
        <div className="logo-row">
          <img src={nsuLogo} className="logo nsu-logo" />
          <img src={usaceLogo} className="logo" />
        </div>
        <h1>Digital Selfie Station</h1>
        <p className="subtitle"><strong>US Army Corps of Engineers&reg;</strong></p>
        <p className="subtitle">Tulsa District</p>
      </header>

      <main className="screen welcome">
        <p className="welcome-text">Ready to take a photo? Share your visit with USACE!</p>
        <button className="startbutton" onClick={onStart}>Let's Go!</button>
      </main>
    </div>
  )
}
