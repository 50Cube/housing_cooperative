package pl.lodz.p.common.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    public static String dateToString(LocalDate date) {
        if(date != null)
            return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        else return "";
    }

    public static LocalDate stringToDate(String date) {
        if(date != null)
            return LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        else return null;
    }
}
