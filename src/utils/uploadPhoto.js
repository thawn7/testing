import { createClient } from '@supabase/supabase-js'

var supabase = createClient(
  'https://uxobsvewgpviqpsejydw.supabase.co',
  'sb_publishable_tKJA4jSAbFQIknq_icKU_A_BOst5UJS'
)

export default function uploadPhoto(photoData) {
  // convert base64 to file
  var byteString = atob(photoData.split(',')[1])
  var mimeType = photoData.split(',')[0].split(':')[1].split(';')[0]
  var bytes = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i)
  }
  var file = new Blob([bytes], { type: mimeType })
  var fileName = 'USACE_Selfie_' + Date.now() + '.jpg'

  return supabase.storage
    .from('photos')
    .upload(fileName, file, { contentType: mimeType })
    .then(function (result) {
      if (result.error) {
        console.log('Upload error:', result.error)
        return null
      }
      var url = supabase.storage.from('photos').getPublicUrl(fileName)
      return url.data.publicUrl
    })
}
