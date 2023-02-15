const router = require(`express`).Router()


const fetch = require('node-fetch');



let url = "https://github.com/iffi96/Shoe-store-data-json/blob/master/data001.json";

let settings = { method: "Get" };

fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        let a  = json
        console.log(a[0])
    });
