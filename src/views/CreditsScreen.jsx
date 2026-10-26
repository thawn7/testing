// credits screen - shows after consent
import './CreditsScreen.css'
import nsuLogo from '../images/nsu-logo.png'
import usaceLogo from '../images/usace-full.png'

export default function CreditsScreen({ onDone }) {
  return (
    <div className="credits-page">
      <h2 className="credits-title">This Digital Selfie Station<br />was created through a<br />Partnership with</h2>
      <div className="credits-logos">
        <img src={nsuLogo} className="credits-logo" />
        <img src={usaceLogo} className="credits-logo" />
      </div>
      <p className="credits-thanks"><strong>Special Thanks to:</strong><br />Professor Rad Alrifai<br />&amp;<br />Student Developer Thawn Sang</p>
      <button className="credits-homebutton" onClick={onDone}>Home</button>
    </div>
  )
}
