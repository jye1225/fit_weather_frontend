// CodiStore.js
import { create } from 'zustand';
import { url } from "./ref";


// 체감날씨 태그 종류 스토어 
const useFeltOptionsStore = create(() => ({
    feltOptions: ["포근해", "구름이 예뻐", "눅눅해", "더워", "햇빛이 따가워", "딱 좋아", "선선해", "청량해", "쌀쌀해"]
}));

// const codiEditStore = create(() => ({
//     // // 상태 정의 
//     // logId: null,

//     // codiLogEdit 함수 정의
//     codiLogEdit: (logId) => {
//         if (logId) {
//             fetch(`${url}/codiEdit/${logId}`)//
//                 .then(() => { console.log('======codiEdit 요청함'); });
//         }
//     }
// }));

export { useFeltOptionsStore };


