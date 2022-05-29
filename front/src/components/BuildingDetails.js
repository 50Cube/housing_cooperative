import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Button, FormControl, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, InputLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { useKeycloak } from "@react-keycloak/web";

export default function BuildingDetails(props) {

    const { t } = useTranslation();
    const classes = useStyles();
    const [list, setList] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [login, setLogin] = React.useState("");
    const [flatKey, setFlatKey] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        setLoading(true);
        FetchService.getFlatsForBuilding(props.buildingKey, keycloak.token)
            .then(response => {
                if (response) {
                    setList(response);
                }
            });
        FetchService.getAccounts(keycloak.token)
            .then(response => {
                if (response) {
                    setUsers(response);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [props.buildingKey, keycloak.token])

    const arrangeFlat = () => {
        FetchService.arrangeFlat(login, props.buildingKey, flatKey, keycloak.token)
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
                <h1>{t('building.name')}: {props.buildingName}</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('flat.number')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('flat.area')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('flat.user')}
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(row => (
                            <TableRow key={row.number}>
                                <TableCell align="center">
                                    {row.number}
                                </TableCell>
                                <TableCell align="center">
                                    {row.area}
                                </TableCell>
                                <TableCell align="center">
                                    {row.accountDto ? <p>{row.accountDto.firstname} {row.accountDto.lastname}</p> : ""}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl className={classes.flatUserChange}>
                                        <InputLabel>{t('flat.user.change')}</InputLabel>
                                        <Select defaultValue={''}>
                                            {users.map(user => (
                                                <MenuItem key={user.login} value={user.login} onClick={() => {
                                                    setLogin(user.login);
                                                    setFlatKey(row.businessKey);
                                                }}>
                                                    {user.firstname} {user.lastname}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" onClick={() => arrangeFlat()}>
                                        {t('save')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br /><br />
                <Button variant="contained" onClick={() => window.location.reload()}>
                    {t('return')}
                </Button>
            </Paper>
        )
    }
}