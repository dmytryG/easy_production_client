import LoginForm from "../Components/LoginForm";
import SaveAuthorization from "../Services/SaveAuthorization";
import {formToURLSearchParams} from "../Services/FormConvertor";
import RegisterForm from "../Components/RegisterForm";
import LoadingNotification from "../Components/Notifications/LoadingNotification/LoadingNotification";
import {useState} from "react";

function Register() {

    const [loader, setLoader] = useState(false);


    async function authorize(event) {
        try {
            setLoader(true);
            const data = new FormData(event.target);
            const params = formToURLSearchParams(data)
            const response = await fetch('http://127.0.0.1:1234/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            })
            const response_data = await response.json();
            if (!response_data.is_err) {
                console.log(`Successfully logged in as ${response_data.data.user.fullName}`);
                SaveAuthorization(response_data.data.user, response_data.data.accessToken);
            } else {
                console.error(`Error while logging in. Reason: ${response_data.data}`)
            }
            setLoader(false);
        } catch (e) {
            console.log(`Err ${e}`);
            setLoader(false);
        }
    }

    return (
        <div>
            {loader
                ?<LoadingNotification/>
                : <RegisterForm onSubmit={event => authorize(event)}/>
            }
        </div>
    )
}

export default Register;