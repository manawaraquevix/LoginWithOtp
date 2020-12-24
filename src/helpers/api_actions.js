

export const api_actions = {
fetchApi:async function(api) {
    let data = {
    method: api.method,
    body: api.data,
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      //'X-CSRFToken':  cookie.load('csrftoken')
        }
    }
   data= api.data?data:false;
        try {
            let response = await fetch(api.url, data);
            let resJson = await response.json();
            
            return resJson;
        } catch(error) {
            
            return error;
        }

//     fetch(api.url, data).then((response) => response.json())
//    .then((responseJson) => {
//         console.log(JSON.stringify(responseJson));
//         return api.success(responseJson);
//    })
//    .catch((error) => {
//        console.log(JSON.stringify(error));
//         return api.failure(error)
//    });
 }
}