import axios from 'axios';
import Datastore from './Datastore';

/**
 * Responsible for sending out api calls and storing responses
 */
export default class ServerConnection {
    constructor(endpoint){
        this.endpoint = endpoint;
    }

    async apiCall(request){
      let cache = Datastore.get(request);
      if(cache.length > 0){
        console.log('returning cached data')
        return cache;
      }
      console.log('no cached data, sending requests')
      const res = await axios.post('/api/getroadobjects', {'request': request});

      let data = res.data
      console.log(data)
  
      Datastore.add(request, data)
      return data;
    }

    async apiCallSingle(request){
      const res = await axios.post('/api/getroadobjecttypes', {'request': request});
  
      let data = res.data;
      Datastore.add(request, data);
      return data;
    }

    async pushChangesToNvdb(changeSet){
      console.log('sender Endringssett')
      const res = await axios.post('/testendring', changeSet);
      console.log(res)
    }
    
    async getChangeSets(){
      console.log('henter Endringssetts oversikt')
      const res = await axios.get('/getChangeSets', {'request': ''});
      console.log(res)
      return res.data;
    }
}