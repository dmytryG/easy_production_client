function formToURLSearchParams(form_data) {
    const form_data_obj = {};
    form_data.forEach((value, key) => (form_data_obj[key] = value));
    return new URLSearchParams(form_data_obj)
}

export {formToURLSearchParams};