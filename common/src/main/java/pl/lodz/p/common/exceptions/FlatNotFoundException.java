package pl.lodz.p.common.exceptions;

public class FlatNotFoundException extends AppBaseException {

    public static final String FLAT_NOT_FOUND = "flat.not.found";

    public FlatNotFoundException() {
        super(FLAT_NOT_FOUND);
    }
}
