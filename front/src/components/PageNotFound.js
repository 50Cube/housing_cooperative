import { useTranslation } from 'react-i18next';

export default function PageNotFound() {

    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('not.found')}</h1>
        </div>
    )
}