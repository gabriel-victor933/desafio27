export function notFoundException(message?: string){
    return {
        type: "application",
        code: 404,
        message: message || "Not Found!"
    }
}

export function forbiddenException(message?: string){
    return {
        type: "application",
        code: 403,
        message: message || "Forbidden!"
    }
}

export function balanceRequired(message?: string){
    return {
        type: "application",
        code: 404,
        message: message || "insufficient funds"
    }
}

export function invalidRequestException(message?: string){
    return {
        type: "application",
        code: 404,
        message: message || "Invalid format"
    }
}