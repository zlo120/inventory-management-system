const GroupIDConverter = (id) => {
    switch (id){
        case 0:
            return "Employee";

        case 1:
            return "Admin";

        case 2: 
            return "Master"
    }
}

export default GroupIDConverter;