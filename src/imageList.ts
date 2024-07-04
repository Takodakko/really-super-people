import crow from './assets/crow.png';
import blue_jay from './assets/blue_jay.png';
import type { setNames } from './App.d.ts';

const imageList: Record<setNames, string> = {
    crow: crow,
    blue_jay: blue_jay,
};
export default imageList;
// export default {
//     crow: crow,
//     blue_jay: blue_jay,
// } as {
//     //[key: setNames]: string;
    
// }