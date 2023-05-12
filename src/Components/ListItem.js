import {useState} from "react";

function ListItem({item, setList, onItemUpdate, ...props}) {
    function OnChange(target) {
        onItemUpdate({item, value: item.type === "value" ? target.target.value : target.target.checked});
    }

    function onTypeChanged(target) {
        console.log(target.target.value)
        onItemUpdate({item, type: target.target.value});
    }

    function onNameChanged(target) {
        onItemUpdate({item, itemName: target.target.value});
    }

    return (
        <div>
            <input type="text" placeholder="Item's name" onChange={onNameChanged} value={item.itemName}/>
            {/*{item.itemName}*/}
            {(item.type === "checkbox") ?
                <input type="checkbox" checked={item.value} onChange={OnChange}/>
                : <input type="text" value={item.value} onChange={OnChange}/>
            }
            <select onChange={onTypeChanged} defaultValue={item.type}>
                <option value="checkbox">Checkbox</option>
                <option value="value">Value</option>
            </select>
        </div>
    )
}

export default ListItem;