// fullscreen camera screen with frame overlay
import { useRef, useState, useEffect } from 'react'
import './CameraView.css'

export default function CameraView({ frame, onCapture }) {
  var videoRef = useRef(null)
  var canvasRef = useRef(null)
  var [camera, setCamera] = useState('user')
  var [timer, setTimer] = useState(null)


  useEffect(function () {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: camera, width: { ideal: 3840 }, height: { ideal: 2160 }, frameRate: { ideal: 60 } },
      audio: false
    }).then(function (stream) {
      videoRef.current.srcObject = stream
    })

    return function () {
      if (videoRef.current) {
        videoRef.current.srcObject.getTracks().forEach(function (t) { t.stop() })
      }
    }
  }, [camera])

  useEffect(function () {
    if (timer === null) return
    if (timer === 0) {
      var video = videoRef.current
      var canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d').drawImage(video, 0, 0)
      onCapture(canvas.toDataURL('image/jpeg'))
      return
    }
    var countdown = setTimeout(function () {
      setTimer(timer - 1)
    }, 1000)
    return function () { clearTimeout(countdown) }
  }, [timer])

  var videoClass = 'camera-behind'
  if (camera === 'user') {
    videoClass = 'camera-behind mirrored'
  }

  var buttonText = 'Start'
  if (timer !== null && timer > 0) {
    buttonText = timer
  }

  return (
    <div className="camera-page">
      <div className="camera-fullscreen">
        <div className="rotate-message">Please rotate your phone</div>
        <video ref={videoRef} autoPlay playsInline muted className={videoClass} />
        <img src={frame.image} className="frame-ontop" />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <button className="capturebutton" onClick={function () {
          if (timer === null) {
            setTimer(10)
          }
        }}>{buttonText}</button>
        <button className="flipbutton" onClick={function () {
          if (camera === 'user') {
            setCamera('environment')
          } else {
            setCamera('user')
          }
        }}>⟳</button>
      </div>
    </div>
  )
}
