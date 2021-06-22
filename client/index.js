"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//generic CRUD class
class CRUD {
    constructor(items) {
        this.items = items;
    }
    //create 
    create(e) {
        this.items.push(e);
    }
    //update
    update(i, e) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            //update user in db
            const p = yield updateData(users.items[i].email, e);
            if ((_a = p === null || p === void 0 ? void 0 : p.data) === null || _a === void 0 ? void 0 : _a.updateUser) {
                //if success then change Ui
                this.items = (_b = p === null || p === void 0 ? void 0 : p.data) === null || _b === void 0 ? void 0 : _b.updateUser;
                renderTable();
            }
        });
    }
    //delete
    delete(i) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            //do changes in db
            const p = yield deleteData((_a = users.items[i]) === null || _a === void 0 ? void 0 : _a.email);
            if ((_b = p === null || p === void 0 ? void 0 : p.data) === null || _b === void 0 ? void 0 : _b.deleteUser) {
                //if success then change in UI
                this.items = p.data.deleteUser;
                renderTable();
            }
        });
    }
}
//initial data fetching and setting
$(document).ready(() => {
    console.log("ready");
    $("#loadBtn").click(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        $("table").html("");
        //show loader when fetching
        $("#loader").css("display", "block");
        try {
            // get data from db
            const response = yield getData();
            const finalData = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.getUsers;
            $("#loader").css("display", "none");
            $("#loadBtn").html("Reload Data");
            //create class instance
            users = new CRUD(finalData);
            renderTable();
            //show the table
            $("table").css("display", "block");
            console.log(finalData);
        }
        catch (err) {
            $("#loader").css("display", "none");
            console.log(err);
        }
    }));
});
//helper functions for DOM
function saveInit(i) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        //iniilaize data which needs to be saved
        const roleInput = Number($(`#i_role${i}`).val());
        const e = {
            firstName: ((_a = $(`#i_fName${i}`).val()) === null || _a === void 0 ? void 0 : _a.toString()) || "",
            middleName: ((_b = $(`#i_mName${i}`).val()) === null || _b === void 0 ? void 0 : _b.toString()) || "",
            lastName: ((_c = $(`#i_lName${i}`).val()) === null || _c === void 0 ? void 0 : _c.toString()) || "",
            email: ((_d = $(`#i_email${i}`).val()) === null || _d === void 0 ? void 0 : _d.toString()) || "",
            phone: ((_e = $(`#i_phone${i}`).val()) === null || _e === void 0 ? void 0 : _e.toString()) || "",
            address: ((_f = $(`#i_address${i}`).val()) === null || _f === void 0 ? void 0 : _f.toString()) || "",
            role: roleInput == 0 ? Role.SUPER_ADMIN : roleInput == 1 ? Role.ADMIN : Role.SUBSCRIBER
        };
        users.update(i, e);
    });
}
function cancel(i) {
    $("table").find(`tr[id$="row${i}"]`).html(addRow({ type: "data", e: users.items[i], i }));
}
function edit(i) {
    $("table").find(`tr[id$="row${i}"]`).html(addRow({ type: "input", e: users.items[i], i }));
}
function renderTable() {
    console.log(users.items);
    $("table").html(addRow({ type: "title" }));
    users.items.forEach((e, i) => {
        $("table").append(`<tr id="row${i}">` + addRow({ type: "data", e, i }) + `</tr>`);
    });
}
function addRow({ type, e, i }) {
    if (type == "data" && e) {
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
        </td>`;
    }
    if (type == "input" && e) {
        console.log('input', e);
        return `
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_fName${i}" value="${e.firstName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_mName${i}" value="${e.middleName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_lName${i}" value="${e.lastName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_email${i}" value="${e.email}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_phone${i}" value="${e.phone}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_address${i}" value="${e.address}" type=""text /></td>
        <td class="${cellClass}" >
            <select id="i_role${i}">
                <option value="0" ${e.role == 0 ? 'selected' : ""} >${Role[0]}</option>
                <option value="1" ${e.role == 1 ? 'selected' : ""} >${Role[1]}</option>
                <option value="2" ${e.role == 2 ? 'selected' : ""} >${Role[2]}</option>
            </select>
        </td>
        <td class="${cellClass}" >
            <button type="button" class="${buttonClass}" onClick="saveInit(${i})">save</button> 
            <button type="button" class="${buttonClass}" onClick="cancel(${i})">cancel</button>
        </td>`;
    }
    if (type == "title") {
        return `
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
        `;
    }
    return "";
}
