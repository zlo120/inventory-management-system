const ApiGetAllData = () => {
    return fetch("https://localhost:7110/api/InventoryItem")
}

const ApiSendInventoryList = (data) => {
    let body = {
        "InventoryItems": data
    }

    console.log(data);
    
    return fetch('https://localhost:7110/api/InventoryItem', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
};

const ApiGetAllDates = () => {
    return fetch('https://localhost:7110/api/InventoryItem/GetAllDates')
}

const ApiGetAllByDate = (date) => {
    return fetch(`https://localhost:7110/api/InventoryItem?date=${date}`)
}

const ApiGetAllBySerial = (serial) => {
    return fetch(`https://localhost:7110/api/InventoryItem?serial=${serial}`)
}

const ApiGetAllByName = (name) => {
    return fetch(`https://localhost:7110/api/InventoryItem?name=${name}`)
}

export {
    ApiSendInventoryList,
    ApiGetAllDates,
    ApiGetAllData,
    ApiGetAllByName,
    ApiGetAllByDate,
    ApiGetAllBySerial,
}