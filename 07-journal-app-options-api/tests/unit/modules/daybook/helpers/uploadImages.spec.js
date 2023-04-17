import axios from 'axios';
import cloudinary from 'cloudinary';

import { uploadImages } from '@/modules/daybook/helpers/uploadImages';

cloudinary.config({
  cloud_name: 'mystoreforcourses',
  api_key: '577683724719432',
  api_secret: 'WzXQRP-044kZi-hxekPyAZ7Rb-I',
  secure: true,
});

describe('Tests on uploadImage ', () => {
  test('should load file and return imageURL', async (done) => {
    const { data } = await axios.get(
      'https://m.media-amazon.com/images/I/71ALAbuh5mL._SL1500_.jpg',
      {
        responseType: 'arraybuffer',
      }
    );

    const file = new File([data], 'foto.jpg');

    const url = await uploadImages(file);

    expect(typeof url).toBe('string');

    // Tomar el ID
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    console.log({ imageId });
    cloudinary.v2.api.delete_resources(['journal-app/' + imageId], {}, () => {
      done();
    });
  });
});
