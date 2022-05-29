package pl.lodz.p.flats.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.p.common.dto.BuildingDto;
import pl.lodz.p.flats.mappers.BuildingMapper;
import pl.lodz.p.flats.repositories.BuildingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuildingService {

    private final BuildingRepository buildingRepository;

    public List<BuildingDto> getBuildings() {
        return BuildingMapper.toDtos(buildingRepository.findAll());
    }
}
