import { store } from 'react-notifications-component';
import i18n from '../i18n';

const options = {
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"]
}

export const successNotification = (title, message, duration) => {
    store.addNotification({
        title: i18n.t(title),
        message: i18n.t(message),
        type: "success",
        ...options,
        dismiss: {
            duration: duration !== undefined ? duration : 8000,
            onScreen: true
        }
    });
}

export const infoNotification = (title, message, duration) => {
    store.addNotification({
        title: i18n.t(title),
        message: i18n.t(message),
        type: "info",
        ...options,
        dismiss: {
            duration: duration !== undefined ? duration : 8000,
            onScreen: true,
            pauseOnHover: true
        }
    });
}

export const warningNotification = (title, message) => {
    store.addNotification({
        title: i18n.t(title),
        message: i18n.t(message),
        type: "warning",
        ...options,
        dismiss: {
            duration: 0,
            showIcon: true
        }
    });
}

export const errorNotification = (title, message) => {
    store.addNotification({
        title: i18n.t(title),
        message: i18n.t(message),
        type: "danger",
        ...options,
        dismiss: {
            duration: 0,
            showIcon: true
        }
    });
}