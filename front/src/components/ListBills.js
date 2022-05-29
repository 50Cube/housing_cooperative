import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { useTranslation } from 'react-i18next';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import BeatLoader from 'react-spinners/BeatLoader';
import { useKeycloak } from "@react-keycloak/web";

export default function ListBills() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        setLoading(true);
        FetchService.getBills(keycloak.token)
            .then(response => {
                if (response) {
                    setList(response);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [keycloak.token])

    const markAsPaid = (id) => {
        setLoading(true);
        FetchService.markBillAsPaid(id, keycloak.token)
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
                                {t('id')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('user')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('bill.type')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('payment.date')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('cost.total')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('payment.status')}
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(row => (
                            <TableRow key={row.businessKey}>
                                <TableCell align="center">
                                    {row.businessKey}
                                </TableCell>
                                <TableCell align="center">
                                    {row.user}
                                </TableCell>
                                <TableCell align="center">
                                    {row.billType}
                                </TableCell>
                                <TableCell align="center">
                                    {row.deadline}
                                </TableCell>
                                <TableCell align="center">
                                    PLN {row.totalCost.toFixed(2)}
                                </TableCell>
                                <TableCell align="center">
                                    {row.paid ? t('paid.yes') : t('paid.no')}
                                </TableCell>
                                <TableCell align="center">
                                    {!row.paid ?
                                        <Button variant="contained" onClick={() => markAsPaid(row.businessKey)}>
                                            {t('mark.as.paid')}
                                        </Button> : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}