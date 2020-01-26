
const URI_BASE = '/alarms';

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

async function Update(data) {
	const response = await fetch(`${URI_BASE}/${data._id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await response.json();
}

async function List() {
	const response = await fetch(`${URI_BASE}`);
	return await response.json();
}

export default {
	List,
	Create,
	Update
}
