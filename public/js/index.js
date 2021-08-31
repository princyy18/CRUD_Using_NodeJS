
$("#add_user").submit(function(event)
{
    alert('Data Inserted Successfully');
})

$("#update_user").submit(function(event)
{
    event.preventDefault();
    //retun array of objects
    var unindexed_array = $('#update_user').serializeArray();
    var data={}
    $.map(unindexed_array,function(n,i)
    {
        data[n['name']] = n['value'];
    })

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response)
    {
        alert("Data Updated sucessfully");
    })

})

if(window.location.pathname=='/')
{
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function()
    {
        var id=$(this).attr('data-id');

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method":"DELETE",
        }
        if(confirm("Do you really want to deleete this record ?")){
            $.ajax(request).done(function(response)
            {
                alert("Data Deleted sucessfully");
                location.reload();
            })
        }
    })
}
