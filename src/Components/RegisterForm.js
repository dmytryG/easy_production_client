function LoginForm({onSubmit, ...props}) {

    function onSubmitHandler(event) {
        event.preventDefault();
        onSubmit(event);
    }

    return(
        <form onSubmit={onSubmitHandler}>
            <div><label htmlFor="fullName">Full Name</label></div>
            <div><input id="fullName" name="fullName" type="text"/></div>
            <div><label htmlFor="email">Email</label></div>
            <div><input id="email" name="email" type="email"/></div>
            <div><label htmlFor="password">Password</label></div>
            <div><input id="password" name="password" type="password"/></div>
            <div><label htmlFor="cpassword">Confirm password</label></div>
            <div><input id="cpassword" name="cpassword" type="password"/></div>
            <input type="submit"/>
        </form>
    );
}

export default LoginForm;