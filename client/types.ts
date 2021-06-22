const cellClass = "px-5 py-5 border-b border-gray-200 bg-white text-sm"
const ItemClass = "text-gray-900 whitespace-no-wrap"
const titleClass = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider" 
const buttonClass = "mx-1 bg-blue-700 py-1 px-3 my-2 rounded-full text-white hover:text-gray-500 text-sm"
const inputClass = "box-content w-16 px-1 bg-blue-200 py-1 rounded-md"
let users:any = null;

enum Role {
    SUPER_ADMIN,
    ADMIN,
    SUBSCRIBER
}

//user interface
interface User {
    firstName : string;
    middleName : string;
    lastName:string;
    email:string;
    phone:string;
    address:string;
    role:Role
}