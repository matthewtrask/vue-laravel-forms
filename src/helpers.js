function getFileExtension(file) {
    return file.name.substr(file.name.lastIndexOf('.') + 1);
}

function isFile(field) {
    return Boolean(field) && Boolean(field.size);
}

export { getFileExtension, isFile }