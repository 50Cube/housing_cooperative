package pl.lodz.p.common.exceptions;

public class EmptyRolesException extends AppBaseException {

    public static final String EMPTY_ROLES = "empty.roles";

    public EmptyRolesException() {
        super(EMPTY_ROLES);
    }
}
