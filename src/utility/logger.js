export function log(message, data = {}) {
    if (DEBUG === "true") {
        console.log(message, JSON.stringify(data));
    }
}

export function error(message, data = {}) {
    if (DEBUG === "true") {
        console.error(message, JSON.stringify(data));
    }
}
