import LoginForm from "../Components/LoginForm";
import SaveAuthorization from "../Services/SaveAuthorization";

function Login() {
    async function authorize(event) {
        try {
            const data = new FormData(event.target);
            const email = data.get('email');
            const password = data.get('password');
            const response = await fetch('http://127.0.0.1:1234/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email,
                    password
                })
            })
            const response_data = await response.json();
            // console.log(response_data);
            if (!response_data.is_err) {
                console.log(`Successfully logged in as ${response_data.data.user.fullName}`);
                SaveAuthorization(response_data.data.user, response_data.data.accessToken);
            } else {
                console.error(`Error while logging in. Reason: ${response_data.data}`)
            }
        } catch (e) {
            console.log(`Err ${e}`);
        }
    }

    return (
        <div>
            <LoginForm onSubmit={event => authorize(event)}/>
        </div>
    )
}

export default Login;