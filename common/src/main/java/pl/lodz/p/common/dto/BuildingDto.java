package pl.lodz.p.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingDto {

    private String businessKey;
    private String name;
    private String city;
    private String street;
    private List<FlatDto> flats;
}
