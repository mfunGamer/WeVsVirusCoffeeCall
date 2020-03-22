
var price   = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,8];
var ids     = [2,3]
var bool    = [  true, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false ];

var selectedThis = function(nr)
{
    console.log(nr)
    elem = document.getElementById("div" + nr);
    bool[nr-1] = !bool[nr-1];

    if(bool[nr-1]){
        elem.style.backgroundColor = "#8ed1cc";
        elem.style.border = "1px solid #8ed1cc";
    }else{
        elem.style.backgroundColor = "#f5fcfc";
        elem.style.border = "1px solid #8ed1cc";
    }

}

var toggleCheckBox = function ()
{
    elem = document.getElementById("checkBox");
    if (elem.style.display === "none")
    {
        elem.style.display = "block"

        box = document.getElementById("checkBoxDiv");

        for(i = 1; i < 43; i++){

            div = document.createElement("div");
            div.style.cssText = "height: 48px; width: 36px; display:inline-block; padding: 0 0 0 0px; margin-top : 5px; margin-right : 5px; margin-left: 5px; border-radius : 4px;";
            div.style.backgroundColor = "#f5fcfc";
            div.style.border = "1px solid #8ed1cc";
            div.id = "div" + i;

            src = i < 10 ? "img/items/item-icon-0" + i + ".png" : "img/items/item-icon-" + i + ".png";
            img = document.createElement("img");
            img.src = src;
            img.style.cssText = "max-width:100%; max-height:100%;"

            label = document.createElement("label");
            label.for = "img" + i;
            label.innerHTML = price[i] + "€";
            label.style.cssText = "font-family: 'Antic'; color : #a10b2c; border-radius : 4px";
            label.style.border = "1px solid #69071c";
            label.style.backgroundColor = "#f5fcfc";

            str = "selectedThis(" + i + ")"
            div.setAttribute("onclick",str);


            if(bool[i-1] == true){
                div.style.backgroundColor = "#8ed1cc";
                div.style.border = "1px solid #8ed1cc";
            }

            div.appendChild(img);
            div.appendChild(label);
            box.appendChild(div);
        }

    } else {
        elem.style.display = "none"
        box = document.getElementById("checkBoxDiv");
        while(box.firstChild){
            box.removeChild(box.lastChild);
        }
    }
}


var getItems = function ()
{
    res = [];
    for(i = 0; i < bool.length; i++)
    {
        if(bool[i]){
            res.push(ids[i]);
        }
    }
    return res;
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

    $.ajax({
        method: "POST",
        url: "http://137.74.140.50:3000/company",
        data: data,
        contentType: "application/json; charset=utf-8"
    }).done(function () {
        document.getElementById("shopForm").reset();
        elem = document.getElementById("checkBox");
        elem.style.display = "none"
        box = document.getElementById("checkBoxDiv");
        while(box.firstChild){
            box.removeChild(box.lastChild);
        }

        document.getElementById("page-top").style.cursor = "auto";
    });


}