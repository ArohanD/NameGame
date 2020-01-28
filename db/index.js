const axios = require('axios')

axios.get('https://willowtreeapps.com/api/v1.0/profiles')
  .then(({ data }) => console.log(Array.isArray(data)))
