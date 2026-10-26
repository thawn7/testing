// consent screen - ask visitor if USACE can use their photo
import './ConsentScreen.css'

export default function ConsentScreen({ onAllow, onDecline }) {
  return (
    <div className="consent-page">
      <h2 className="consent-title">Share Your Photo?</h2>
      <p className="consent-text">
        Do we have your permission to use this photo on our website and social media?
      </p>
      <div className="consent-buttons">
        <button className="allowbutton" onClick={onAllow}>Allow</button>
        <button className="declinebutton" onClick={onDecline}>No Thanks</button>
      </div>
    </div>
  )
}
