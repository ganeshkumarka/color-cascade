import React, { useEffect } from 'react';

const AdComponent: React.FC = () => {
    useEffect(() => {
        if (typeof window !== "undefined" && window.adsbygoogle) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('Ad error:', error);
            }
        }
    }, []);

    return (
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client={process.env.REACT_APP_AD_CLIENT} // Make sure to set this in your .env file
             data-ad-slot="9885012380" // Replace with your actual ad slot
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    );
};

export default AdComponent;
