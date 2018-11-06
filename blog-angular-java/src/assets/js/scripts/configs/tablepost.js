function ConfigureTable() {
    var table = $('#tablePost').on().DataTable({
        "aLengthMenu": [[1, 5, 10, -1], [1, 5, 10, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        searching: false,
        pagingType: "simple"
    });
    table.order([0, 'desc']).draw();
    $('#tablePost_length').remove();

    $("#tablePost_previous").addClass("btn btn-primary");
    $("#tablePost_next").addClass("btn btn-primary");
    $("#tablePost_previous").css("width", "120px");
    $("#tablePost_next").css("width", "120px");

    $("#tablePost_paginate").addClass("float-right");

    $('#tablePost').on('draw.dt', function () {
        $("#tablePost_previous").addClass("btn btn-primary");
        $("#tablePost_next").addClass("btn btn-primary");
        $("#tablePost_previous").css("width", "120px");
        $("#tablePost_next").css("width", "120px");
    });
}

function RemoveTable(){
    $("#tablePost").remove();
    $("#tablePost_previous").remove();
    $("#tablePost_next").remove();
}

function BeginTable(){
    $("table").remove();
    $("#tablePost_info").remove();
    $("#tablePost_paginate").remove();
}