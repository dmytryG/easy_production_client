import {useParams} from "react-router-dom";
import {GetAuthorizationToken} from "../Services/SaveAuthorization";
import {useEffect, useState} from "react";
import LoadingNotification from "../Components/Notifications/LoadingNotification/LoadingNotification";
import ListPrewiev from "../Components/ListPrewiev";
import ListItem from "../Components/ListItem";
import ChildContainer from "../Components/Containers/ChildContainer";
import {objectToURLSearchParams} from "../Services/FormConvertor";

async function getList(setList, id) {
    try {
        const response = await fetch(`http://127.0.0.1:1234/list/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': GetAuthorizationToken()
            },
        })
        const response_data = await response.json();
        if (!response_data.is_err) {
            console.log(`Successfully got list`);
            setList(response_data.data);
        } else {
            console.error(`Error while logging in. Reason: ${response_data.data}`)
        }
    } catch (e) {
        console.log(`Err ${e}`);
    }
}

async function updateList(list) {
    console.log("Updating", list)
    try {
        const response = await fetch(`http://127.0.0.1:1234/list/${list._id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': GetAuthorizationToken()
            },
            body: new URLSearchParams({...list, items: JSON.stringify(list.items)}).toString()
        })
        const response_data = await response.json();
        if (!response_data.is_err) {
            console.log(`Successfully updated list`);
        } else {
            console.error(`Error while logging in. Reason: ${response_data.data}`)
        }
    } catch (e) {
        console.log(`Err ${e}`);
    }
}

async function deleteList(list) {
    console.log("Updating", list)
    try {
        const response = await fetch(`http://127.0.0.1:1234/list/${list._id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': GetAuthorizationToken()
            },
        })
        const response_data = await response.json();
        if (!response_data.is_err) {
            console.log(`Successfully updated list`);
        } else {
            console.error(`Error while logging in. Reason: ${response_data.data}`)
        }
    } catch (e) {
        console.log(`Err ${e}`);
    }
}

function List({...props}) {
    const params = useParams();
    const listId = params.id;

    const [list, setList] = useState({});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        getList(setList, listId).catch(console.error).finally(() => setLoader(false));
    }, []);

    function onItemUpdate({item, value, type, itemName}) {
        const items = list.items.map((iterItem) => {
            if (iterItem._id === item._id) {
                let new_item = item;
                if (value !== undefined && iterItem.value !== value) new_item = {...new_item, value: value}
                if (type  !== undefined && iterItem.type !== type) {
                    new_item = {...new_item, type: type, value: (type === "checkbox") ? false : ""}
                }
                if (itemName !== undefined && iterItem.itemName !== itemName) new_item = {...new_item, itemName: itemName}
                console.log("Value: ", value, "Type: ", type, "New item: ", new_item, "New type: ", new_item.type)
                return new_item;
            } else {
                return iterItem;
            }
        })
        setList({...list, items});
    }

    function onListNameChanged(event) {
        setList({...list, listName: event.target.value})
    }

    function onSave() {
        console.log("items", list.items);
        setLoader(true);
        updateList(list).catch(console.error).finally(() => setLoader(false));
    }

    function onDelete() {
        setLoader(true);
        deleteList(list).catch(console.error).finally(() => setLoader(false));
    }

    return (
        <div>
            {loader || !list.items
                ? <LoadingNotification/>
                : <ChildContainer>
                    <input type="text" value={list.listName} onChange={onListNameChanged}/>
                    <button onClick={onSave}>Save</button>
                    <button onClick={onDelete}>Delete</button>
                    {
                        list.items.map((item) =>
                            <ListItem item={item} onItemUpdate={onItemUpdate} key={item._id}/>
                        )}
                </ChildContainer>
            }

        </div>
    );

}

export default List;