
export const fetchCNNodeJS = () => {
  return new Promise((resolve, reject) => {
    return fetch('https://cnodejs.org/api/v1/topics?limit=100').then(res=>res.json()).then(resolve).catch(reject)
  });
}