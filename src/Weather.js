import axios from "axios"

let url = 'http:localhost/3000'

let url = `{process.env.REACT_APP_SERVER}/weather?city=${this.StaticRange.species}`

let weather = await axios.get(url);
