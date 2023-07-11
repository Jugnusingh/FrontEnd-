import React from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

class SubscribeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false,
            email: ''
        };
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handleSubscribe = () => {
        const { email } = this.state;

        // Validate email format
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Call the Gmail API to verify user email
        const gmailApiEndpoint = 'https://www.googleapis.com/gmail/v1/users/me/profile';
        const accessToken = 'AIzaSyC0qv0Yo_jL1LRubYue4lScqyHTfor-eFc'; // Replace with the actual access token

        axios.get(gmailApiEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                // Check if the retrieved email matches the user's input
                const userProfile = response.data;
                if (userProfile.emailAddress === email) {
                    // Call the YouTube API to subscribe the user
                    const youtubeApiEndpoint = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&key=${apiKey}`;
                    const apiKey = 'AIzaSyC0qv0Yo_jL1LRubYue4lScqyHTfor-eFc';
                    const channelId = 'UCilEr1rW-SIrJlJ5_ioKQfw';
                    const requestData = {
                        snippet: {
                            resourceId: {
                                kind: 'youtube#channel',
                                channelId: channelId
                            }
                        }
                    };

                    axios.post(youtubeApiEndpoint, requestData, {
                        params: {
                            key: apiKey
                        }
                    })
                        .then(response => {
                            // Handle success response
                            console.log('Subscription successful!');
                            this.setState({ subscribed: true });
                        })
                        .catch(error => {
                            // Handle error response
                            console.error('Subscription failed:', error);
                            alert('Subscription failed. Please try again later.');
                        });
                } else {
                    console.log('Email verification failed.');
                }
            })
            .catch(error => {
                console.error('Error retrieving user details:', error);
            });
    }

    validateEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    render() {
        const { subscribed, email } = this.state;

        return (
            <div className="button-container">
                <input
                    className="email-input"
                    type="email"
                    value={email}
                    onChange={this.handleEmailChange}
                    placeholder="Enter your email"
                />
                <button
                    className={`subscribe-button${subscribed ? ' subscribed' : ''}`}
                    onClick={this.handleSubscribe}
                >
                    {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
        );
    }
}

export default SubscribeButton;
