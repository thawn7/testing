import emailjs from '@emailjs/browser'

var SERVICE_ID = 'service_sgsxgju'
var TEMPLATE_ID = 'template_yjd6uar'
var PUBLIC_KEY = 'wdDfL5IX60-nRUriU'

function compressPhoto(photoData) {
  return new Promise(function (resolve) {
    var img = new Image()
    img.onload = function () {
      var canvas = document.createElement('canvas')
      var maxWidth = 600
      var ratio = maxWidth / img.width
      canvas.width = maxWidth
      canvas.height = img.height * ratio
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.6))
    }
    img.src = photoData
  })
}

export default function sendPhoto(photoData) {
  return compressPhoto(photoData).then(function (smallPhoto) {
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      message: 'A visitor submitted a photo from the Digital Selfie Station.',
      to_email: 'thwvnn@gmail.com',
      photo: smallPhoto
    }, PUBLIC_KEY)
  })
}
