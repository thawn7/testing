import emailjs from '@emailjs/browser'

var SERVICE_ID = 'service_sgsxgju'
var TEMPLATE_ID = 'template_yjd6uar'
var PUBLIC_KEY = 'wdDfL5IX60-nRUriU'

export default function sendEmail(photoUrl) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    message: 'A visitor submitted a photo from the Digital Selfie Station.',
    to_email: 'thwvnn@gmail.com',
    photo: photoUrl
  }, PUBLIC_KEY)
}
