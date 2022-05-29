import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import { useTranslation } from 'react-i18next';
import { FormControl, Select, MenuItem, TextField, Button } from '@material-ui/core';
import FetchService from '../services/FetchService';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import locale from 'date-fns/locale/en-GB';
import BeatLoader from 'react-spinners/BeatLoader';
import { useKeycloak } from "@react-keycloak/web";

export default function CreateBill() {

    const { t } = useTranslation();
    const classes = useStyles();
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState({});
    const [flat, setFlat] = React.useState({});
    const [billTypes, setBillTypes] = React.useState([]);
    const [billType, setBillType] = React.useState("");
    const [cost, setCost] = React.useState("0.00");
    const [date, setDate] = React.useState(new Date());
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
        }
        FetchService.getAccountsWithFlat(keycloak.token)
            .then(response => {
                if (response) {
                    setUsers(response);
                }
            }).then(() => {
                setLoading(false);
            })
        FetchService.getBillTypes(keycloak.token)
            .then(response => {
                if (response) {
                    setBillTypes(response);
                }
            })
    }, [keycloak.tokenParsed, keycloak.token])

    const createBill = () => {
        setLoading(true);
        FetchService.createBill(user.login, billType, date.toISOString().substring(0, 10), cost, flat.area * cost, keycloak.token)
            .then(() => {
                window.location.replace("/");
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
                <h3>{t('choose.user')}</h3>
                <FormControl className={classes.flatUserChange}>
                    <Select defaultValue={''}>
                        {users.map(row => (
                            <MenuItem key={row.login} value={row.login} onClick={() => {
                                setUser(row);
                            }}>
                                {row.firstname} {row.lastname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br /><br /><br /><br />
                <h3>{t('choose.bill.type')}</h3>
                <FormControl className={classes.flatUserChange}>
                    <Select defaultValue={''} value={billType} onChange={event => {
                        setBillType(event.target.value);
                    }}>
                        {billTypes.map(row => (
                            <MenuItem key={row} value={row}>
                                {t(row)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br /><br /><br /><br />
                <h3>{t('cost')}</h3>
                <TextField
                    required
                    value={cost}
                    type="number"
                    inputProps={{
                        step: "0.01",
                        min: 0
                    }}
                    onChange={event => setCost(parseFloat(event.target.value).toFixed(2))}
                />
                <label>PLN</label>
                <br /><br /><br /><br />
                <h3>{t('payment.date')}</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    <KeyboardDatePicker
                        autoOk
                        value={date}
                        onChange={event => setDate(event)}
                        minDate={new Date()}
                        format="dd/MM/yyy"
                    />
                </MuiPickersUtilsProvider>
                <br /><br /><br /><br />
                {flat && cost ?
                    <h3>{t('cost.total')}: PLN {(flat.area * cost).toFixed(2)}</h3>
                    : null}
                <br /><br /><br /><br />
                <Button variant="contained" onClick={() => createBill()} disabled={
                    !user.login || billType === ""
                }>
                    {t('confirm')}
                </Button>
            </div>
        )
    }
}