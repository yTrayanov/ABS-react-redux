export function checkResponse(response: any) {
    if (!response.success)
        throw new Error(response.message);
}