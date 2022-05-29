package pl.lodz.p.flats.utils;

import lombok.Data;

@Data
public class ArrangeFlatRequest {

    private String login;
    private String buildingKey;
    private String flatKey;
}
