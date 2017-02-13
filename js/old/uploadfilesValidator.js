var allowExtensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF', 'png', 'PNG', 'bmp', 'BMP','xls','xlsx'];
function OnTextChanged(uploadControl) {
    if (!isValidFileName(uploadControl.GetText())) {
        uploadControl.ClearText();
        alert("请选择有效文件");
    }
}
function isValidFileName(fileName) {
    var fileParts = fileName.split(".");
    var fileExtension = fileParts[fileParts.length - 1].toLowerCase();
    return arrayIndexOf(allowExtensions, fileExtension) != -1;
}
function arrayIndexOf(array, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element)
            return i;
    }
    return -1;
}