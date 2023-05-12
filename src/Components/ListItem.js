import {useState} from "react";

function ListItem({item, setList, onItemUpdate, ...props}) {
    function OnChange(target) {
        onItemUpdate({item, value: item.type === "value" ? target.target.value : target.target.checked});
    }

    return (
        <div>
            {item.itemName}
            {(item.type === "checkbox") ?
                <input type="checkbox" checked={item.value} onChange={OnChange}/>
                : <input type="textbox" value={item.value} onChange={OnChange}/>
            }
        </div>
    )
}

export default ListItem;