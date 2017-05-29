package cz.cvut.fel.aeroticket.format;

import javax.ws.rs.ext.ParamConverter;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class ZonedDateTimeJsonConverter implements ParamConverter<ZonedDateTime> {

    @Override
    public ZonedDateTime fromString(String value) {
        return ZonedDateTime.parse(value, DateTimeFormatter.ISO_DATE_TIME);
    }

    @Override
    public String toString(ZonedDateTime value) {
        return value.format(DateTimeFormatter.ISO_DATE_TIME);
    }

}
