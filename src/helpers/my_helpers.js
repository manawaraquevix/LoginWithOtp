
import { Platform, Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const standardWidth = 375;

export const fonts = {
   
    sizes: {
        title:      20,//scaleFont(20),
        subTitle:   18,//scaleFont(18),
        xs:         9,//scaleFont(9),
        ten:        10,//scaleFont(10),
        sm:         12,//scaleFont(12),
        md:         15,//scaleFont(15),
        lg:         18,//scaleFont(18),
        xl:         21,//scaleFont(21),
        xxl:        24,//scaleFont(24),
        xxxl:       30//scaleFont(30),
    }
};

// const scaleFont = (size) =>  {
//     const scaleRatio = SCREEN_WIDTH / standardWidth;
//     const newSize = size * scaleRatio;
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//     
// }

export const scale = function(size){
  const K = SCREEN_WIDTH / standardWidth;
  return K * size;
}
