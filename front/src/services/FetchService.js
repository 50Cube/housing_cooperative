import { errorNotification } from '../utils/Notifications';

const URL = "http://localhost:8000/";
const ACCOUNTS_SERVICE = URL + "accounts-service/";
const FLATS_SERVICE = URL + "flats-service/";
const BILLS_SERVICE = URL + "bills-service/";

class FetchService {

    register = async (login, password, name, surname, email) => {
        const response = await fetch(ACCOUNTS_SERVICE + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "login": login,
                "password": password,
                "firstname": name,
                "lastname": surname,
                "email": email
            })
        });
        if (response.ok) {
            return await response.text();
        } else {
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    getAccounts = async (jwt) => {
        const response = await fetch(ACCOUNTS_SERVICE + "accounts", {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        }
    }

    changeRole = async (login, role, jwt) => {
        const response = await fetch(ACCOUNTS_SERVICE + "accounts/" + login + "/" + role, {
            method: "PATCH",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.text();
        }
    }

    getBuildings = async (jwt) => {
        const response = await fetch(FLATS_SERVICE + "buildings", {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        }
    }

    getFlatsForBuilding = async (name, jwt) => {
        const response = await fetch(FLATS_SERVICE + "flats/" + name, {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        } else {
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    arrangeFlat = async (login, name, number, jwt) => {
        const response = await fetch(FLATS_SERVICE + "flat", {
            method: "PATCH",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" },
            body: JSON.stringify({
                "login": login,
                "buildingKey": name,
                "flatKey": number
            })
        });
        if (response.ok) {
            return await response.text();
        } else {
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    getUser = async (login, jwt) => {
        const response = await fetch(ACCOUNTS_SERVICE + "accounts/" + login, {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        } else {
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    getBillTypes = async (jwt) => {
        const response = await fetch(BILLS_SERVICE + "bills/types", {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        }
    }

    getAccountsWithFlat = async (jwt) => {
        const response = await fetch(ACCOUNTS_SERVICE + "accountsFlat", {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        }
    }

    getUserFlat = async (login, jwt) => {
        const response = await fetch(FLATS_SERVICE + "userFlat/" + login, {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        }
    }

    createBill = async (login, billType, deadline, cost, totalCost, jwt) => {
        const response = await fetch(BILLS_SERVICE + "bills", {
            method: "POST",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" },
            body: JSON.stringify({
                "accountDto": {
                    "login": login
                },
                "billType": billType,
                "deadline": deadline,
                "cost": cost,
                "totalCost": totalCost
            })
        });
        if (response.ok) {
            return await response.text();
        } else {
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    getBills = async (jwt) => {
        const response = await fetch(BILLS_SERVICE + "bills", {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.json();
        }
    }

    markBillAsPaid = async (key, jwt) => {
        const response = await fetch(BILLS_SERVICE + "bills/" + key, {
            method: "PATCH",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" }
        });
        if (response.ok) {
            return await response.text();
        } else {
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    generatePdf = async (login, jwt) => {
        const response = await fetch(BILLS_SERVICE + "billPdf/" + login, {
            method: "GET",
            headers: { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" },
            responseType: 'blob'
        });
        if (response.ok) {
            return await response.blob();
        } else {
            let json = await response.json();
            errorNotification(json, " ");
        }
    }
}

export default new FetchService();