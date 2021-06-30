const axios = require('axios');


module.exports = async function run(){
    console.log(`------------------------------------`)
    console.log(process.env.STRAPI_URL)
    console.log(process.env.STRAPI_API_KEY)
    console.log(process.env.STRAPI_API_PASS)
    console.log(`------------------------------------`)
    const { data } = await axios.post(`${process.env.STRAPI_URL}/auth/local`, {
      identifier: process.env.STRAPI_API_KEY,
      password: process.env.STRAPI_API_PASS,
    });

    const events = await axios.get(`${process.env.STRAPI_URL}/events`, {
    headers: {
        Authorization:
        `Bearer ${data.jwt}`,
    },
    });

    return events.data;

    //http://localhost:1337/content-manager/collection-types/application::event.event?page=1&pageSize=10&_sort=Title:ASC
    

};
