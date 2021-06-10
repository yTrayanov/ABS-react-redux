const BASE_URL = 'http://localhost:5000/section/';

const sectionService = {
    createSection: async (rows, columns, seatClass, flightNumber) => {
        const res = await window.fetch(BASE_URL + 'create', {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rows, columns, seatClass, flightNumber })
        });

        return res;
    }
}

export default sectionService;