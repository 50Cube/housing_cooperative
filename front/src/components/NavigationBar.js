import React, { useEffect } from 'react';
import { Typography, Toolbar, FormControl, Select, MenuItem, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useStyles } from '../css/Styles';
import { getCurrentAccessLevel, getLanguage } from '../services/UserDataService';
import { useKeycloak } from "@react-keycloak/web";

export default function NavigationBar() {

    const { t } = useTranslation();
    const classes = useStyles();
    const [language, setLanguage] = React.useState(getLanguage());
    const [role, setRole] = React.useState(getCurrentAccessLevel());
    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (keycloak.hasRealmRole("admin")) {
            sessionStorage.setItem("role", "admin");
        } else if (keycloak.hasRealmRole("manager")) {
            sessionStorage.setItem("role", "manager");
        } else if (keycloak.hasRealmRole("client")) {
            sessionStorage.setItem("role", "client");
        }
    }, [keycloak])

    return (
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6" noWrap component={Link} to="/">
                NSAI
            </Typography>

            {getCurrentAccessLevel() === "admin" ?
                <div className={classes.toolbarRoleDiv}>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/users">
                        {t('list.users')}
                    </Typography>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/buildings">
                        {t('list.buildings')}
                    </Typography>
                </div>
                : null}

            {getCurrentAccessLevel() === "manager" ?
                <div className={classes.toolbarRoleDiv}>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/bill">
                        {t('create.bill')}
                    </Typography>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/bills">
                        {t('list.bills')}
                    </Typography>
                </div>
                : null}

            {getCurrentAccessLevel() === "client" ?
                <div className={classes.toolbarRoleDiv}>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/user">
                        {t('user.details')}
                    </Typography>
                </div>
                : null}

            {keycloak.authenticated ?
                <FormControl>
                    <Select className={classes.navigationLabel} value={role} placeholder="HERB" onChange={event => {
                        setRole(event.target.value);
                        sessionStorage.setItem("role", event.target.value);
                        window.location.reload();
                    }}>
                        {keycloak.hasRealmRole("admin") ? <MenuItem value={"admin"}>{t('admin')}</MenuItem> : null}
                        {keycloak.hasRealmRole("manager") ? <MenuItem value={"manager"}>{t('manager')}</MenuItem> : null}
                        {keycloak.hasRealmRole("client") ? <MenuItem value={"client"}>{t('client')}</MenuItem> : null}
                    </Select>
                </FormControl> : null}


            <FormControl>
                <Select className={classes.navigationLabel} value={language} onChange={event => {
                    setLanguage(event.target.value);
                    localStorage.setItem("lang", event.target.value);
                    window.location.reload();
                }}>
                    <MenuItem value={"pl"}>Polski</MenuItem>
                    <MenuItem value={"en"}>English</MenuItem>
                    <MenuItem value={"de"}>Deutsch</MenuItem>
                </Select>
            </FormControl>

            {keycloak.authenticated ?
                <React.Fragment>
                    <Button
                        type="button"
                        className={classes.navigationLabel}
                        onClick={() => {
                            keycloak.logout();
                            sessionStorage.removeItem("role");
                        }
                        }
                    >
                        {t('logout')}
                    </Button>
                </React.Fragment> :
                <React.Fragment>
                    <Typography className={classes.navigationLabel} component={Link} to="/register">
                        {t('register')}
                    </Typography>
                    <Button
                        type="button"
                        className={classes.navigationLabel}
                        onClick={() => keycloak.login()}
                    >
                        {t('login')}
                    </Button>
                </React.Fragment>}
        </Toolbar>
    )
}