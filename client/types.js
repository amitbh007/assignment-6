"use strict";
const cellClass = "px-5 py-5 border-b border-gray-200 bg-white text-sm";
const ItemClass = "text-gray-900 whitespace-no-wrap";
const titleClass = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider";
const buttonClass = "mx-1 bg-blue-700 py-1 px-3 my-2 rounded-full text-white hover:text-gray-500 text-sm";
const inputClass = "box-content w-16 px-1 bg-blue-200 py-1 rounded-md";
let users = null;
var Role;
(function (Role) {
    Role[Role["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["SUBSCRIBER"] = 2] = "SUBSCRIBER";
})(Role || (Role = {}));
