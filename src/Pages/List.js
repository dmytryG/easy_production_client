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

function List({...props}) {
    const params = useParams();
    const listId = params.id;

    const [list, setList] = useState({});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        getList(setList, listId).catch(console.error).finally(() => setLoader(false));
    }, []);

    function onItemUpdate({item, value}) {
        const items = list.items.map((iterItem) => {
            if (iterItem._id === item._id) {
                return {...item, value: value}
            } else {
                return iterItem;
            }
        })
        setList({...list, items});
    }

    function onSave() {
        console.log("items", list.items);
        setLoader(true);
        updateList(list).catch(console.error).finally(() => setLoader(false));
    }

    return (
        <div>
            {loader || !list.items
                ? <LoadingNotification/>
                : <ChildContainer>
                    <button onClick={onSave}>Save</button>
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