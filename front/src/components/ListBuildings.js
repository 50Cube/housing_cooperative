import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BuildingDetails from './BuildingDetails';
import BeatLoader from 'react-spinners/BeatLoader';
import { useKeycloak } from "@react-keycloak/web";

export default function ListBuildings() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);
    const [showDetails, setShowDetails] = React.useState(false);
    const [buildingName, setBuildingName] = React.useState("");
    const [buildingKey, setBuildingKey] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        setLoading(true);
        FetchService.getBuildings(keycloak.token)
            .then(response => {
                if (response) {
                    setList(response);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [keycloak.token])

    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        if (showDetails !== true) {
            return (
                <Paper className={classes.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('building.name')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('city')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('street')}
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.city}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.street}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" onClick={() => {
                                            setShowDetails(true);
                                            setBuildingName(row.name);
                                            setBuildingKey(row.businessKey)
                                        }}>
                                            {t('show.details')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )
        } else {
            return (<BuildingDetails buildingName={buildingName} buildingKey={buildingKey} />)
        }
    }
}