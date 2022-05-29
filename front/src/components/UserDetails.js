import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FetchService from '../services/FetchService';
import { LoadingCss } from '../css/Styles';
import BeatLoader from 'react-spinners/BeatLoader';
import { useKeycloak } from "@react-keycloak/web";

export default function UserDetails() {

    const { t } = useTranslation();
    const [user, setUser] = React.useState({});
    const [flat, setFlat] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        setLoading(true);
        if (keycloak.tokenParsed != null) {
            FetchService.getUserFlat(keycloak.tokenParsed.preferred_username, keycloak.token)
                .then(response => {
                    if (response) {
                        setFlat(response);
                    }
                })
            FetchService.getUser(keycloak.tokenParsed.preferred_username, keycloak.token)
                .then(response => {
                    if (response) {
                        setUser(response);
                    }
                }).then(() => {
                    setLoading(false);
                })
        }
    }, [keycloak.tokenParsed, keycloak.token])

    const generatePdf = () => {
        FetchService.generatePdf(keycloak.tokenParsed.preferred_username, keycloak.token)
            .then(response => {
                window.open(URL.createObjectURL(response));
            })
    }

    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        return (
            <div>
                <h2>{t('username')}: {user.login}</h2>
                <h2>{t('name.surname')}: {user.firstname} {user.lastname}</h2>
                <h2>{t('email')}: {user.email}</h2>
                {flat
                    ? <h2>{t('user.flat1')}: {flat.number} {t('user.flat2')} {flat.buildingInfo}</h2>
                    : <h2>{t('user.no.flat')}</h2>}
                <br /><br />
                <Button variant="contained" onClick={() => generatePdf()}>
                    {t('generate.pdf')}
                </Button>
            </div>
        )
    }
}