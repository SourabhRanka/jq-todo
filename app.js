var itemno = 0; // global variable couting the items


function addItem() {
    // prepare individual item and add it to the list
    itemno++;
    var itemToAdd = $('#name').val(); // input text value
    if (!validateItem(itemToAdd)) {
        return;
    };

    var list_item = prepareListItem(itemno, itemToAdd); // prepare the list item

    $('#list').append(list_item); // adding the list item in list
    $('#name').get(0).value = ''; // clearing the text value after every entry

}

function validateItem(itemToAdd) {
    // valdiate to check if item is empty
    if (itemToAdd === '') {
        return false;
    } else {
        return true;
    }
}

function prepareListItem(itemno, itemToAdd) {
    // prepare the item and register the events to it
    var cb_node = createCheckBoxNode(itemno);
    var li_node = createLiNode(itemToAdd, itemno);
    var btn_node = createButtonNode(itemno);
    var div_node = createDivNode(cb_node, li_node, btn_node, itemno);



    btn_node.click(function (event) {
        $('#' + 'div' + event.target.id.substring(3)).remove();
    }); // adding click handler to button to delete the item


    cb_node.click(function (event) {
        if ($('#' + event.target.id).is(':checked')) {
            $('#' + 'li' + event.target.id.substring(2)).css({
                'textDecoration': 'line-through'
            })
        } else {
            $('#' + 'li' + event.target.id.substring(2)).css({
                'textDecoration': ''
            })
        };

    }); // adding click handler to checkbox to show it completed

    return div_node;
}


function createLiNode(itemToAdd, itemno) {
    // li and it's content
    var text_node_for_li = document.createTextNode(itemToAdd);
    var li_node = $("<li></li>");
    li_node.attr('id', 'li' + itemno);
    li_node.append(text_node_for_li);
    return li_node;
}


function createButtonNode(itemno) {
    // button and it's value
    var btn_node = $('<button>x</button>');
    btn_node.attr('id', 'btn' + itemno);
    return btn_node;
}

function createDivNode(cb_node, li_node, btn_node, itemno) {
    // creating div item to encapsulate all other nodes
    var div_node = $("<div><div>");
    div_node.append(cb_node);
    div_node.append(li_node);
    div_node.append(btn_node);
    div_node.attr('id', 'div' + itemno);
    return div_node;
}


function createCheckBoxNode(itemno) {
    // create checkbox 
    var cb_node = $('<input>', {
        type: "checkbox",
    });
    cb_node.attr('id', 'cb' + itemno);
    return cb_node;
}

function resetItems() {
    // reset the list 
    $("#list").empty();

}


function handle(e) {
    // hadling the enter event on addItem textbox
    if (e.keyCode === 13) {
        e.preventDefault(); // Ensure it is only this code that rusn
        addItem();
    }
}