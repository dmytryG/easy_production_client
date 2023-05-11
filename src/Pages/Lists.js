import {useEffect, useState} from "react";
import ListPrewiev from "../Components/ListPrewiev";
import LoadingNotification from "../Components/Notifications/LoadingNotification/LoadingNotification";
import {GetAuthorizationToken} from "../Services/SaveAuthorization";

async function getLists(setLists) {
    try {
        const response = await fetch('http://127.0.0.1:1234/list/all', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': GetAuthorizationToken()
            },
        })
        const response_data = await response.json();
        if (!response_data.is_err) {
            console.log(`Successfully got lists`);
            setLists(response_data.data);
        } else {
            console.error(`Error while logging in. Reason: ${response_data.data}`)
        }
    } catch (e) {
        console.log(`Err ${e}`);
    }
}

function Lists() {
    const [lists, setLists] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        getLists(setLists).catch(console.error).finally(() => setLoader(false));
    }, []);

    return (
        <div>
            {loader
                ? <LoadingNotification/>
                : lists.map((list) => {
                    return <ListPrewiev list={list} key="{list.id}"/>
                })
            }
        </div>
    )
}

export default Lists;