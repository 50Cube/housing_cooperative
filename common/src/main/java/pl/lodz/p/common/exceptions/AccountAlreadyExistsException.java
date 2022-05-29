package pl.lodz.p.common.exceptions;

public class AccountAlreadyExistsException extends AppBaseException {

    public static final String ACCOUNT_EXISTS = "account.exists";

    public AccountAlreadyExistsException() {
        super(ACCOUNT_EXISTS);
    }

    public AccountAlreadyExistsException(Throwable cause) {
        super(ACCOUNT_EXISTS, cause);
    }
}
