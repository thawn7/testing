// the first page
import './WelcomeScreen.css'
import usaceLogo from '../images/usace-logo.png'

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="app">
      <header className="header">
        <img src={usaceLogo} className="logo" />
        <h1>Digital Selfie Station</h1>
        <p className="subtitle">US Army Corps of Engineers&reg;</p>
        <p className="subtitle">Tulsa District</p>
      </header>

      <main className="screen welcome">
        <p className="welcome-text">Ready to take a photo? Share your visit with USACE!</p>
        <button className="startbutton" onClick={onStart}>Let's Go!</button>
      </main>
    </div>
  )
}
