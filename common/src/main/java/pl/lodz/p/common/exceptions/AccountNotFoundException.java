package pl.lodz.p.common.exceptions;

public class AccountNotFoundException extends AppBaseException {

    public static final String ACCOUNT_NOT_FOUND = "account.not.found";

    public AccountNotFoundException() {
        super(ACCOUNT_NOT_FOUND);
    }

    public AccountNotFoundException(Throwable cause) {
        super(ACCOUNT_NOT_FOUND, cause);
    }
}
