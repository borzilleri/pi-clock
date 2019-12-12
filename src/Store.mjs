import { promises as fsp } from 'fs';

let TYPES = {};

function register_class(cls) {
	if (TYPES.hasOwnProperty(cls.name)) {
		throw Error(`Type ${cls.name} already registered.`)
	}
	TYPES[cls.name] = cls;
}

function deconstruct_object(object) {
	if (!TYPES.hasOwnProperty(object.constructor.name)) {
		throw Error(`type ${object.constructor.name} not registered.`)
	}
	return {
		type: object.constructor.name,
		data: Object.entries(object)
	}
}

function serialize(object) {
	return JSON.stringify(deconstruct_object(object));
}

function resolve_typed_object(object) {
	if (!object.hasOwnProperty('type')) {
		throw Error("parsed js has no type property.");
	}
	if (!TYPES.hasOwnProperty(object.type)) {
		throw Error(`type ${js.type} not registered.`)
	}
	let data = new TYPES[object.type]();
	object.data.map(e => { data[e[0]] = e[1]; });
	return data;
}

function deserialize(js) {
	let object = JSON.parse(js);
	return resolve_typed_object(object)
}

function debug_info() {
	console.log(TYPES);
}

async function readJson(path) {
	return fsp.readFile(path, 'utf8')
		.then(strData => {
			let jsData = JSON.parse(strData);
			if (Array.isArray(jsData)) {
				return jsData.map(obj => resolve_typed_object(obj))
			}
			return deserialize(jsData);
		});
}

async function writeData(path, data) {
	if (Array.isArray(data)) {
		data = data.map(obj => deconstruct_object(obj))
	}
	else {
		data = deconstruct_object(obj);
	}
	return fsp.writeFile(path, JSON.stringify(data));
}


export default {
	serialize: serialize,
	deserialize: deserialize,
	registerClass: register_class,
	readJson: readJson,
	serializer_debug_info: debug_info
}
