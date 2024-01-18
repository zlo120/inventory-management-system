const FormatData = (data) => {
    return data.filter(element => element.serialimei != null)
}

export default FormatData;