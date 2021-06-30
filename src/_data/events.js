const axios = require('axios');


module.exports = async function run(){
    const { data } = await axios.post('http://localhost:1337/auth/local', {
      identifier: process.env.STRAPI_API_KEY,
      password: process.env.STRAPI_API_PASS,
    });

    const events = await axios.get('http://localhost:1337/events', {
    headers: {
        Authorization:
        `Bearer ${data.jwt}`,
    },
    });

    return events.data;

    //http://localhost:1337/content-manager/collection-types/application::event.event?page=1&pageSize=10&_sort=Title:ASC
    

};
