$(document).ready(function () {

    var baseUrl = '/Users/';

    const createUser = (user) => {

        $.ajax({
            url: baseUrl + 'Create',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (data) {
                appendUser(data);
                showAllert("Enregistrer avec succes")
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error(xhr.responseText);
            }
        });
    }

    const readUsers = () => {
        $.ajax({
            url: baseUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                clearTable();
                console.log(data)
                $.each(data, function (index, user) {
                    appendUser(user);
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error(xhr.responseText);
            }
        });
    }

    const updateUser = (user) => {
        $.ajax({
            url: baseUrl + 'Update',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (data) {
                clearTable();
                readUsers();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error(xhr.responseText);
            }
        });
    }

    function deleteUser(id) {
        $.ajax({
            url: baseUrl + 'Delete/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                clearTable();
                readUsers();
                showAllert("Supprimer avec succes avec succes")
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error(xhr.responseText);
            }
        });
    }

    function appendUser(user) {
        var row = `<tr>
                <td class='nom'> ${user.Name}</td>
                <td class='pseudo'> ${user.SurName} </td>
                <td class='email'> ${user.Email} </td>
                <td> <button class="delete" data-id=" ${user.Id} ">Delete</button> </td> 
                 
                </tr>`;
        $('#tableBody').append(row);
    }



    $('#search').on('input', () => {
        const searchvalue = $('#search').val();
        $('#tableBody').children().each((index, item) => {
            if (item.querySelector('.nom').innerHTML.toLocaleLowerCase().includes(searchvalue.toLocaleLowerCase())) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        })
    })


    function clearTable() {
        $('#tableBody').empty();
    }

    function showAllert(message) {
        $("#errormsg").empty();
        $("#errormsg").append(message)
        $('#alert').show();

        setTimeout(() => { $('#alert').hide(); }, 2000)

    }



    function hideForm() {
        $('.modal').hide();
        // effacer tout les champ du formulaire
        $('#nom').val("") =
            $('#pseudo').val('')
        $('#email').val('')
    }

    $('#nom').keyup(() => {
        var name = $('#nom').val();
        if (name) {
            $.ajax({
                url: baseUrl + 'GetSimilarName?name=' + name,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $('#suggestedList').empty();
                    $.each(data, (i, item) => {
                        $('#suggestedList').append($("<li class='sugesteditem'>").text(item.Name))
                    })
                    $(document).on('click', '.sugesteditem', function () {
                        $('#nom').val($(this).text())
                        $('#suggestedList').empty();
                    })
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error(xhr.responseText);
                }
            });
        } else {
            $('#suggestedList').empty();
        }
    });

    $('#addbtn').click(() => {
        $('.modal').show();
    });

    $('#closebtn').click(() => {
        hideForm();
    })

    $("#cancel").click(() => {
        hideForm();
    })


    $('#create-user').click(function () {
        var name = $('#nom').val();
        var surname = $('#pseudo').val();
        var email = $('#email').val();

        if (name !== '' && surname !== '') {
            var user = {
                Name: name,
                SurName: surname,
                Email: email,
            };

            createUser(user);
        }
    });

    $(document).on('click', '.delete', function () {
        var id = $(this).data('id');

        if (confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    });

    readUsers();
});
