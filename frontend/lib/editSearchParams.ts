export function removeSearchParams(currentSearchParams: string | URLSearchParams, name: string) {
	const params = new URLSearchParams(currentSearchParams)
	params.delete(name);
	return params;
}

export function addSearchParam(currentSearchParams: string | URLSearchParams, name: string, value: string) {
	const params = new URLSearchParams(currentSearchParams)
	params.set(name, value);
	return params
}

