//generic CRUD class
class CRUD <T>{

    //read
    items:Array<T>;

    constructor(items:T[]){
        this.items = items;
    }

    //create 
    create(e:T):void{
        this.items.push(e)
    }

    //update
    async update(i:number,e:T){
        //api call to update the user
        const p = await updateData(users.items[i].email,e);
        //update ui only if call was succesfull
        if(p?.data?.updateUser){
            //if success then change Ui
            this.items = p?.data?.updateUser;
            renderTable();
        }
    }

    //delete
    async delete(i:number){
        //do changes in db
        const p = await deleteData(users.items[i]?.email);
        if(p?.data?.deleteUser){
            //if success then change in UI
            this.items = p.data.deleteUser;
            renderTable();
        }
    }

}

//initial data fetching and setting
$(document).ready(()=>{
    console.log("ready")
    
    $("#loadBtn").click(async ()=>{

        $("table").html("");
        //show loader when fetching
        $("#loader").css("display","block");
        try{
            // get data from db
            const response = await getData()
            const finalData:Array<User> = response?.data?.getUsers
            $("#loader").css("display","none");
            $("#loadBtn").html("Reload Data")
            
            //create class instance
            users = new CRUD<User>(finalData)
            renderTable();

            //show the table
            $("table").css("display","block");
            console.log(finalData);
        }
        catch(err){
            $("#loader").css("display","none");
    
            console.log(err)
        }
    })
})


//helper functions for DOM
async function saveInit(i:number){

    //iniilaize data which needs to be saved
    const roleInput = Number($(`#i_role${i}`).val())
    const e:User = {
        firstName:$(`#i_fName${i}`).val()?.toString()||"",
        middleName:$(`#i_mName${i}`).val()?.toString()||"",
        lastName:$(`#i_lName${i}`).val()?.toString()||"",
        email:$(`#i_email${i}`).val()?.toString()||"",
        phone:$(`#i_phone${i}`).val()?.toString()||"",
        address:$(`#i_address${i}`).val()?.toString()||"",
        role:roleInput==0?Role.SUPER_ADMIN:roleInput==1?Role.ADMIN:Role.SUBSCRIBER
    }
    
    users.update(i,e);
}

function cancel(i:number){
    $("table").find(`tr[id$="row${i}"]`).html(addRow({type:"data",e:users.items[i],i}))
}

function edit(i:number){
    $("table").find(`tr[id$="row${i}"]`).html(addRow({type:"input",e:users.items[i],i}));
}

function renderTable(){
    console.log(users.items);
    $("table").html(addRow({type:"title"}));
    users.items.forEach((e:User,i:number)=>{
        $("table").append(`<tr id="row${i}">`+addRow({type:"data",e,i})+`</tr>`);
    })
}

function addRow({type,e,i}:{type:string,e?:User,i?:number}):string{
    if(type=="data"&&e){
        return `
        <td class="${cellClass}">${e.firstName}</td>
        <td class="${cellClass}">${e.middleName}</td>
        <td class="${cellClass}">${e.lastName}</td>
        <td class="${cellClass}">${e.email}</td>
        <td class="${cellClass}">${e.phone}</td>
        <td class="${cellClass}">${e.address}</td>
        <td class="${cellClass}">${Role[e.role]}</td>
        <td class="${cellClass}">
            <button type="button" class="${buttonClass}" onClick="edit(${i})">edit</button>
            <button type="button" class="${buttonClass}" onClick="users.delete(${i})" >delete</button>
        </td>`
    }
    
    if(type=="input"&&e){
        
        console.log('input',e);
        return `
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_fName${i}" value="${e.firstName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_mName${i}" value="${e.middleName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_lName${i}" value="${e.lastName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_email${i}" value="${e.email}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_phone${i}" value="${e.phone}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_address${i}" value="${e.address}" type=""text /></td>
        <td class="${cellClass}" >
            <select id="i_role${i}">
                <option value="0" ${e.role==0?'selected':""} >${Role[0]}</option>
                <option value="1" ${e.role==1?'selected':""} >${Role[1]}</option>
                <option value="2" ${e.role==2?'selected':""} >${Role[2]}</option>
            </select>
        </td>
        <td class="${cellClass}" >
            <button type="button" class="${buttonClass}" onClick="saveInit(${i})">save</button> 
            <button type="button" class="${buttonClass}" onClick="cancel(${i})">cancel</button>
        </td>`
    }

    if(type=="title"){
        return`
        <tr>
            <th class="${titleClass}">firstName</th>
            <th class="${titleClass}">middleName</th>
            <th class="${titleClass}">lastName</th>
            <th class="${titleClass}">email</th>
            <th class="${titleClass}">number</th>
            <th class="${titleClass}">address</th>
            <th class="${titleClass}">role</th>
            <th class="${titleClass}">options</th>
        </tr>
        `
    }
    return "";
}


