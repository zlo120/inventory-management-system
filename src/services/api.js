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

const ApiGetInventoryByDate = (date) => {
    return fetch(`https://localhost:7110/api/InventoryItem/GetInventoryByDate?date=${date}`)
}

export {
    ApiSendInventoryList,
    ApiGetAllDates,
    ApiGetInventoryByDate,
}