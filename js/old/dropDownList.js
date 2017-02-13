var textSeparator = ";";
function OnListBoxSelectionChanged(listBox, args) {
//    if (args.index == 0)
//        args.isSelected ? listBox.SelectAll() : listBox.UnselectAll();
   // UpdateSelectAllItemState();
    UpdateText();
}
function UpdateSelectAllItemState() {
    IsAllSelected() ? checkListBox.SelectIndices([0]) : checkListBox.UnselectIndices([0]);
}
function IsAllSelected() {
    //    var selectedDataItemCount = checkListBox.GetItemCount() - (checkListBox.GetItem(0).selected ? 0 : 1);
    var selectedDataItemCount = checkListBox.GetItemCount() ;
    return checkListBox.GetSelectedItems().length == selectedDataItemCount;
}
function UpdateText() {
    var selectedItems = checkListBox.GetSelectedItems();
    var txt = GetSelectedItemsText(selectedItems);
    console.log("UpdateText", txt);
    if (txt.length != 0) {
      checkComboBox.SetText(txt);    
    }
  
}
function SynchronizeListBoxValues(dropDown, args) {
    checkListBox.UnselectAll();
    var texts = dropDown.GetText().split(textSeparator);
    var values = GetValuesByTexts(texts);
    checkListBox.SelectValues(values);
   // UpdateSelectAllItemState();
    UpdateText(); // for remove non-existing texts
}
function GetSelectedItemsText(items) {
    var texts = [];
    for (var i = 0; i < items.length; i++)
//        if (items[i].index != 0)
            texts.push(items[i].text);
    return texts.join(textSeparator);
}
function GetValuesByTexts(texts) {
    var actualValues = [];
    var item;
    for (var i = 0; i < texts.length; i++) {
        item = checkListBox.FindItemByText(texts[i]);
        if (item != null)
            actualValues.push(item.value);
    }
    return actualValues;
}