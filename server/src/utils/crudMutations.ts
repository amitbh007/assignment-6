import * as fs from 'fs';
import { User } from 'src/entities/User';

export const getObjects = ():[User]=>{
    const data = fs.readFileSync("../database/data.json",{encoding:"utf8"});
    const jsonData:[User] = JSON.parse(data);

    return jsonData;
}   

export const addObject = (user:User):[User]=>{
    const data = fs.readFileSync("../database/data.json",{encoding:"utf8"});
    const jsonData:[User] = JSON.parse(data);

    jsonData.push(user);

    fs.writeFileSync("../data.json",JSON.stringify(jsonData));
    
    return jsonData
}

export const readObjects = ():[User]=>{
    const data = fs.readFileSync("../database/data.json",{encoding:"utf8"});
    const jsonData:[User] = JSON.parse(data);
    return jsonData;
}

export const updateObject = (email:string,user:User)=>{
    const data = fs.readFileSync("../database/data.json",{encoding:"utf8"});
    const jsonData:[User] = JSON.parse(data);

    const i = jsonData.findIndex((e)=>e.email==email)
    if(i<0) return jsonData;

    jsonData[i] = user;
    fs.writeFileSync("../database/data.json",JSON.stringify(jsonData));

    return jsonData
}

export const deleteObject = (email:string)=>{
    const data = fs.readFileSync("../database/data.json",{encoding:"utf8"});
    const jsonData:[User] = JSON.parse(data);

    const i = jsonData.findIndex((e)=>e.email==email)
    if(i<0) return jsonData;

    jsonData.splice(i,1);
    fs.writeFileSync("../database/data.json",JSON.stringify(jsonData));

    return jsonData
}