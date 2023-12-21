import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export const VerifySupplier = () => {
    const [isError, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get the current URL
        const currentUrl = window.location.href;

        // Extract the parameters from the URL
        const urlParams = new URLSearchParams(currentUrl);

        // Get the values of the parameters
        const token = urlParams.get('token');

        // Make an API request to verify the user
        axios.get(`https://test-back-end-dszgwhplxa-el.a.run.app/verifyLink?token=${token}`)
            .then(response => {
                // Handle the response from the backend (if needed)
                localStorage.setItem('token',token)
                navigate('/home');
            })
            .catch(error => {
                // Handle any errors (if needed)
                console.error('Error:', error);
                setError(true);
            });
    }, [navigate]);

    return (
        <div >
            {!isError ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <div>
                    <h1>Oops! Something Went Wrong</h1>
                    <p>We're sorry, but there seems to be an error with the link you've followed.</p>
                    <p>Please try the following:</p>
                    <ul>
                        <li>Double-check the URL to make sure it's correct.</li>
                        <li>Return to the <a href="/">homepage</a>.</li>
                        <li>Contact our <a href="/contact">support team</a> for assistance.</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
export default VerifySupplier;
