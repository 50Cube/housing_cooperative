import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { useKeycloak } from "@react-keycloak/web";

export default function ListUsers() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        setLoading(true);
        FetchService.getAccounts(keycloak.token)
            .then(response => {
                console.log(response)
                if (response) {
                    setList(response);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [keycloak.token])

    const handleRoleChange = (login, role) => {
        setLoading(true);
        FetchService.changeRole(login, role, keycloak.token)
            .then(() => {
                window.location.reload();
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
            <Paper className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('username')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('email')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('name')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('surname')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('role.admin')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('role.manager')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('role.client')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(row => (
                            <TableRow key={row.login}>
                                <TableCell align="center">
                                    {row.login}
                                </TableCell>
                                <TableCell align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.surname}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControlLabel control={
                                        <Checkbox checked={row.accessLevels.includes("admin")} onChange={() => handleRoleChange(row.login, "admin")} />
                                    } />
                                </TableCell>
                                <TableCell align="center">
                                    <FormControlLabel control={
                                        <Checkbox checked={row.accessLevels.includes("manager")} onChange={() => handleRoleChange(row.login, "manager")} />
                                    } />
                                </TableCell>
                                <TableCell align="center">
                                    <FormControlLabel control={
                                        <Checkbox checked={row.accessLevels.includes("client")} onChange={() => handleRoleChange(row.login, "client")} />
                                    } />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}