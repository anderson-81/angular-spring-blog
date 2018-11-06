function toAlert(title, message, page) {
    $("#titleModal").text(title);
    $("#messageModal").text(message);
    $("#modalInfo").modal("show");
    
    if(page !== undefined){
        $('#modalInfo').on('hidden.bs.modal', function () {
            $(location).attr("href", page);
        });
    }
}
            