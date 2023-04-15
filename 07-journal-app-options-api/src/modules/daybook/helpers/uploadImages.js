import axios from 'axios'


export const uploadImages = async (file) => {
  try {
  if(!file) return
    
    const formData = new FormData()

    formData.append('upload_preset', 'vue-course')
    formData.append('file', file)

    const url = 'https://api.cloudinary.com/v1_1/dggt7avhc/image/upload'

    const { data } = await axios.post(url, formData)

    return data.secure_url

  } catch (error) {
    console.log('Error al cargar la imagen');
    console.log(error);
  }
}