
const URI_BASE = '/api/alarms';

/**
 * @param {String} id 
 * @param {Object} data 
 */
async function Save(id, data) {
	return id ? await Update(id, data) : await Create(data);
}

/**
 * @param {Object} data 
 */
async function Create(data) {
	const response = await fetch(URI_BASE, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await response.json();
}

/**
 * @param {String} id
 * @param {Object} data 
 */
async function Update(id, data) {
	const response = await fetch(`${URI_BASE}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await response.json();
}

/**
 * @param {String} id
 */
async function Delete(id) {
	await fetch(`${URI_BASE}/${id}`, {
		method: 'DELETE'
	});
	return id;
}

async function List() {
	const response = await fetch(`${URI_BASE}`);
	return await response.json();
}

export default {
	List,
	Create,
	Update,
	Save,
	Delete
}
