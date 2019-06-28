function viewImg(file) {
    var view = document.getElementById('view');
    var fileReader = new FileReader();
    console.log(file.files[0]);
    if (file.files[0] && file.files){
        fileReader.readAsDataURL(file.files[0]);
        fileReader.onload = function (ev) {
            view.src = ev.target.result;
        }
    }
}
