import React, { useEffect } from 'react';
import { useStyles } from '../css/Styles';
import { successNotification } from '../utils/Notifications';
import { useTranslation } from 'react-i18next';

export default function Home() {
    
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        if(localStorage.getItem("logged") !== null) {
            successNotification("login.success", " ");
            localStorage.removeItem("logged");
        }
        if(localStorage.getItem("registered") !== null) {
            successNotification("registration.success", " ", 0);
            localStorage.removeItem("registered");
        }
        if(localStorage.getItem("confirmed") !== null) {
            successNotification("confirmation.success", " ", 0);
            localStorage.removeItem("confirmed");
        }
    }, [])

    return (
        <div>
            <div className={classes.homePageText}>
                <h1>{t('home')}</h1>
            </div>
        </div>
    )
}