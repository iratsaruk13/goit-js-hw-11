// import axios from 'axios';
// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '34989371-d98b3f165afd7d2509d6f9eb9';

// // export default async function fetchPictures(searchQuery) {
// //   try {
// //       const response = await axios.get(`${BASE_URL}`, {
// //           params: {
// //               key: API_KEY,
// //               q: searchQuery,
// //               per_page: maxI,
// //               page: maxItemOnPage,
// //               safesearch: true,
// //               orientation: 'horizontal',
// //               image_type: 'photo',
// //           },
// //       });
      
// // return response;  
// //   } catch (error) {
// //     throw new Error(error.message);
// //   }
// // }



// export default async function fetchPictures(searchQuery, currentPage) {
//   try {
//     const response = await axios.get(`${BASE_URL}`, {
//       params: {
//         key: API_KEY,
//         q: searchQuery,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         page: currentPage,
//         per_page: 40,
//         safesearch: true,
//       },
//     });

//     return response.data.hits;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }