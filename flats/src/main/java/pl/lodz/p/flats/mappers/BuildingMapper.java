package pl.lodz.p.flats.mappers;

import lombok.experimental.UtilityClass;
import pl.lodz.p.common.dto.BuildingDto;
import pl.lodz.p.flats.entities.Building;

import java.util.List;

@UtilityClass
public class BuildingMapper {

    public BuildingDto toDto(Building building) {
        return BuildingDto.builder()
                .businessKey(building.getBusinessKey())
                .name(building.getName())
                .city(building.getCity())
                .street(building.getStreet())
                .flats(FlatMapper.toDtos(building.getFlats()))
                .build();
    }

    public List<BuildingDto> toDtos(List<Building> entities) {
        return entities.stream()
                .map(BuildingMapper::toDto)
                .toList();
    }
}
