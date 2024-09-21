export function log(message, data = {}) {
    if (DEBUG === "true") {
        console.log(message, JSON.stringify(data));
    }
}
