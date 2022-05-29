package pl.lodz.p.common.exceptions;

public class AppBaseException extends Exception {

    public static final String UNEXPECTED_ERROR = "unexpected.error";

    public AppBaseException() {
        super(UNEXPECTED_ERROR);
    }

    public AppBaseException(String message) {
        super(message);
    }

    public AppBaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public AppBaseException(Throwable cause) {
        super(UNEXPECTED_ERROR, cause);
    }
}
