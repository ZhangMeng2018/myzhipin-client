import axios from 'axios'

export default (url = "",data = {},method = "GET") =>{
  if(method === 'GET'){
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr +=key+'='+data[key]+'&';
      if(dataStr){
        dataStr = dataStr.substr(0,dataStr.length-1);
        url = url + '?' + dataStr
      }
    });
    return axios.get(url)
  }else {
    return axios.post(url,data)
  }
}