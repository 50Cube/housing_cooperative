import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Register() {

    const { t } = useTranslation();
    const classes = useStyles();
    const { control, formState, getValues } = useForm({ mode: "onChange" });
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const register = (event) => {
        event.preventDefault();
        setLoading(true);
        FetchService.register(username, password, name, surname, email)
            .then(() => {
                localStorage.setItem("registered", "");
                window.location.replace("/");
            }).then(() => {
                setLoading(false);
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
            <div className={classes.loginWindow}>
                <form onSubmit={event => register(event)}>
                    <Controller
                        name={"login"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            pattern: { value: /^([a-zA-Z0-9!@$^&*]+)$/, message: t('wrong.format') },
                            maxLength: { value: 32, message: t('too.long') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                label={t('username') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={username}
                                onChange={event => {
                                    onChange(event);
                                    setUsername(event.target.value);
                                }}
                            />
                        }
                    />
                    <br />
                    <Controller
                        name={"password"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            minLength: { value: 8, message: t('pswd.too.short') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('password') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={password}
                                type="password"
                                onChange={event => {
                                    onChange(event);
                                    setPassword(event.target.value);
                                }}
                            />
                        }
                    />
                    <br />
                    <Controller
                        name={"repeatPassword"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            validate: (value) => getValues("password") === value || t('password.repeat.error')
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('password.repeat') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={repeatPassword}
                                type="password"
                                onChange={event => {
                                    onChange(event);
                                    setRepeatPassword(event.target.value);
                                }}
                            />
                        }
                    />
                    <br />
                    <Controller
                        name={"name"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            maxLength: { value: 32, message: t('too.long') },
                            pattern: { value: /^([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)$/, message: t('wrong.format') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('name') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={name}
                                onChange={event => {
                                    onChange(event);
                                    setName(event.target.value);
                                }}
                            />
                        }
                    />
                    <br />
                    <Controller
                        name={"surname"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            maxLength: { value: 32, message: t('too.long') },
                            pattern: { value: /^([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)$/, message: t('wrong.format') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('surname') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={surname}
                                onChange={event => {
                                    onChange(event);
                                    setSurname(event.target.value);
                                }}
                            />
                        }
                    />
                    <br />
                    <Controller
                        name={"email"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            maxLength: { value: 32, message: t('too.long') },
                            pattern: { value: /^([a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,})$/, message: t('wrong.format') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('email') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={email}
                                onChange={event => {
                                    onChange(event);
                                    setEmail(event.target.value);
                                }}
                            />
                        }
                    />
                    <div className={classes.loginButton}>
                        <Button type="submit" variant="contained" disabled={!formState.isValid}>
                            {t('confirm')}
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}