var toggleCheckBox = function ()
{
    elem = document.getElementById("checkBox");
    if (elem.style.display === "none")
    {
        elem.style.display = "block"

    } else {
        elem.style.display = "none"
    }
}


var getItems = function ()
{
    items = []
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            items.push(Number($(this).val()));
        }
    });

    return items;
}


var createCompany = function ()
{

    var obj = {
        "name"          : $("#inputName").val(),
        "email"         : $("#inputEmail").val(), 
        "description"   : $("#inputDisc").val(),
        "reason"        : $("#inputReason").val(),
        "imgurl"        : $("#inputImage").val(),
        "paypal"        : $("#inputPayPal").val(),
        "thankyou"      : $("#inputTHX").val(),
        "itemids"       : getItems(),
        "street"        : $("#inputStreet").val(),
        "streetno"      : $("#inputStr-number").val(),
        "zipcode"       : $("#inputZip").val(),
        "city"          : $("#inputCity").val(),
        "owner"         : $("#inputOwner").val(),
        "type"          : $("#inputType").val(),
    }

    var data = JSON.stringify(obj);

    document.getElementById("page-top").style.cursor = "wait";

    $.post("137.74.140.50:3000/company",data,function(){
        console.log(data);
        document.getElementById("shopForm").reset();
        document.getElementById("page-top").style.cursor = "auto";
    })

}