import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { Link } from 'react-router-dom';

const CancellationPolicy = () => {
    const [showPolicy, setShowPolicy] = useState(false);
    const transitions = useTransition(showPolicy, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(20px)' },
    });

    const togglePolicy = () => {
        setShowPolicy(!showPolicy);
    };

    return (
        <div className="cancelation-policy">
            <h1 className="cancelation-policy-heading">Cancellation Policy</h1>
            <button className="cancelation-policy-button" onClick={togglePolicy}>
                {showPolicy ? 'Hide Policy' : 'Show Policy'}
            </button>

            {transitions((styles, item) =>
                item && (
                    <animated.div style={styles}>
                        <div>
                            <div className="cancelation-policy-text">
                                <h3>
                                    DALALTECHNOLOGIES believes in providing the best experience for our customers. Please read our cancellation and refund policy for PDF file purchases:
                                </h3>
                                <ul>
                                    <li>
                                        Cancellations will only be considered if the request is made immediately after placing the order and before the download link is accessed. Once the download link has been accessed, cancellation requests cannot be accommodated.
                                    </li>
                                    <li>
                                        Refunds or exchanges are not available for PDF file purchases, unless the file is found to be corrupted or inaccessible. If you experience any issues with the downloaded file, please contact our Customer Service team within 2 days of purchase for assistance.
                                    </li>
                                    <li>
                                        In case you encounter any technical difficulties or have trouble accessing the PDF file, please reach out to our Customer Service team for support. We will work to resolve the issue as quickly as possible.
                                    </li>
                                    <li>
                                        Please note that any warranties or guarantees associated with the content of the PDF file are the responsibility of the respective authors or publishers. Any concerns or complaints regarding the content should be directed to them.
                                    </li>
                                    <li>
                                        Additionally, please be aware that the PDF file provided is for your assistance only. It is not editable, and we kindly request that you use your own knowledge and understanding to perform all tasks and complete your assignment. We do not provide editable files or offer services for making modifications to the file.
                                    </li>
                                    <li>
                                        We understand the importance of maintaining the integrity of our work and appreciate your cooperation in not copying the file exactly. Instead, we encourage you to use it as a reference and apply your own creativity and problem-solving skills to complete your assignment.
                                    </li>
                                    <li>
                                        Furthermore, please refrain from requesting the removal of our logo or any other links from the assignment. As a company, we strive to provide the best experience for all our customers, and the inclusion of our branding and links is part of our service.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </animated.div>
                )
            )}

            <Link to="/" className="cancelation-policy-link">Back to Home</Link>
        </div>
    );
};

export default CancellationPolicy;
