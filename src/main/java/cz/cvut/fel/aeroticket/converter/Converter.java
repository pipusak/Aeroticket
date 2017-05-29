package cz.cvut.fel.aeroticket.converter;


import javax.ejb.Local;

@Local
public interface Converter<FROM, TO> {

    TO convert(FROM source);

    TO convert(FROM source, TO instance);

}
