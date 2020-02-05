const URI_BASE = '/sounds';

async function List() {
	const response = await fetch(`${URI_BASE}`);
	return await response.json();
}

async function GetDefault() {
	const response = await fetch(`${URI_BASE}/default`)
	return await response.json().then(js => js.defaultSound);
}

export default {
	List,
	GetDefault
}
