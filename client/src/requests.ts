export const postRequest = (url: string, data: object) => {
    const token = window.localStorage.getItem('token');
    return window.fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(response => checkResponse(response));
}

export const getRequest = (url: string) => {
    const token = window.localStorage.getItem('token');
    return window.fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => checkResponse(response));
}

async function checkResponse(response: any) {
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error);
    }

    return result;
}