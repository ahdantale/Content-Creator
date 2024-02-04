function errorFunction({isError, message, data, errorDetail}){
    if(isError){
        return {
            success : false,
            message : message,
            ...(errorDetail) && {error : {
                detail : errorDetail
            }}
        }
    } else {
        return {
            success : true,
            message : message,
            ...(data) && {data : data}
        }
    }

}

module.exports = errorFunction