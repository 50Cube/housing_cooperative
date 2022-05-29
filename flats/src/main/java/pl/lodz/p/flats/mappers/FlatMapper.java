package pl.lodz.p.flats.mappers;

import lombok.experimental.UtilityClass;
import pl.lodz.p.common.dto.AccountDto;
import pl.lodz.p.common.dto.FlatDto;
import pl.lodz.p.flats.entities.Flat;

import java.util.List;

@UtilityClass
public class FlatMapper {

    public FlatDto toDto(Flat flat) {
        return FlatDto.builder()
                .businessKey(flat.getBusinessKey())
                .number(flat.getNumber())
                .area(flat.getArea())
                .buildingInfo(flat.getBuilding().getName() + ": " + flat.getBuilding().getCity() + ", " + flat.getBuilding().getStreet())
                .accountDto(AccountDto.builder().login(flat.getUserLogin()).build())
                .build();
    }

    public List<FlatDto> toDtos(List<Flat> entities) {
        return entities.stream()
                .map(FlatMapper::toDto)
                .toList();
    }
}
