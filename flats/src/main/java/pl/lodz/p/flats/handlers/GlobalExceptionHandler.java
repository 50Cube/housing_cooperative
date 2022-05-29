package pl.lodz.p.flats.handlers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.lodz.p.common.exceptions.AppBaseException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        log.error("Handled exception", e);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e instanceof AppBaseException ? e.getMessage() : AppBaseException.UNEXPECTED_ERROR);
    }
}
