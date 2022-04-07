$(() => {

    loadPeople();

    function loadPeople() {
        $.get('/people/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td>
         <button class='btn btn-primary' id='edit-button' data-id=${person.id} data-first-name=${person.firstName} data-last-name=${person.lastName} data-age=${person.age}>Edit</button>
    </td>
    <td>
        <button class='btn btn-danger' id='delete-button' data-id=${person.id}>Delete</button>
    </td>
</tr>`);
            });
        });
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();


        $.post('/people/addperson', { firstName, lastName, age }, function (person) {
            //console.log(person.id);
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });


    $("#people-table").on('click', '#edit-button', function () {
        const button = $(this);
        const id = button.data('id');
        const firstName = button.data('first-name');
        const lastName = button.data('last-name');
        const age = button.data('age');

        $("#first-name-modal").val(firstName);
        $("#last-name-modal").val(lastName);
        $("#age-modal").val(age);
        $("#id-modal").val(id);

        $("#editModal").modal();

       
    });

    $('#save-edit').on('click', function () {
        const firstName = $("#first-name-modal").val();
        const lastName = $("#last-name-modal").val();
        const age = $("#age-modal").val();
        const id = $("#id-modal").val();

        $.post('/people/editperson', { id, firstName, lastName, age }, function (person) {
            loadPeople();
        });

        $(".modal").modal('hide');
    });


    $("#people-table").on('click', "#delete-button", function () {
        const button = $(this);
        const id = button.data('id');

        $.post('/people/deletepersonbyid', { id }, function (person) {
            loadPeople();
        });
    });
});