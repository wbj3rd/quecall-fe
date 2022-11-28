const fs = require('fs');

let rawdata = fs.readFileSync('./assets/openapi.json');
let apiSpec = JSON.parse(rawdata);

var keys = apiSpec.components.schemas ;
//console.log(keys)
Object.entries(apiSpec.components.schemas).forEach((schema)=>{
    //console.log(schema)
    let model = {
        api:{url:apiSpec.servers[0].url+"/"+schema[0].toLowerCase()}
    };
    model.title =  schema[1].title;
    model.entity = schema[1].title.toLowerCase()
    //model.api.url = apiSpec.servers[0].url+`/${schema[1].title.toLowerCase()}`;
    model.filter = [] ;
    model.api.url = apiSpec.servers[0].url;
    let k2  = Object.keys(schema[1].properties);
    let props =[];
    k2.forEach((key)=>{

            prop = schema[1].properties[key]
            //console.log(prop)
            let o = {};
            o.name = key.toLowerCase();
            o.type = prop.type;
            o.label = key[0].toUpperCase()+key.slice(1);
            if(key === "id"){
                o.isId = true
            }
           // console.log(o)
            props.push(o)
           })

           //console.log(props)
           model.fields = props;

        console.log(model)
        fs.mkdir(`./angular-crud/${schema[1].title.toLowerCase()}`, { recursive: true }, (err) => {
            if (err) throw err;
            fs.writeFile(`./angular-crud/${schema[1].title.toLowerCase()}/model.json`, JSON.stringify(model), err => {
                if (err) {
                  console.error(err);
                }
          });

            // file written successfully
          });
    
})