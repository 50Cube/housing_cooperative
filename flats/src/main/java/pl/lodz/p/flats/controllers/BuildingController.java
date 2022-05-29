package pl.lodz.p.flats.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.common.dto.BuildingDto;
import pl.lodz.p.common.dto.FlatDto;
import pl.lodz.p.common.exceptions.AppBaseException;
import pl.lodz.p.flats.services.BuildingService;
import pl.lodz.p.flats.services.FlatService;
import pl.lodz.p.flats.utils.ArrangeFlatRequest;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BuildingController {

    private final FlatService flatService;
    private final BuildingService buildingService;

    @RolesAllowed({"admin", "manager"})
    @GetMapping("/buildings")
    public List<BuildingDto> getBuildings() {
        return buildingService.getBuildings();
    }

    @RolesAllowed({"admin", "manager"})
    @GetMapping("/flats")
    public List<FlatDto> getFlats() {
        return flatService.getFlats();
    }

    @RolesAllowed({"admin", "manager"})
    @GetMapping("/flats/{buildingKey}")
    public List<FlatDto> getFlatsForBuilding(@PathVariable String buildingKey) {
        return flatService.getFlatsForBuilding(buildingKey);
    }

    @RolesAllowed({"admin", "client", "manager"})
    @GetMapping("/userFlat/{login}")
    public FlatDto getUserFlat(@PathVariable String login) throws AppBaseException {
        return flatService.getUserFlat(login);
    }

    @RolesAllowed({"admin", "manager"})
    @GetMapping("/flatUser/{flatKey}")
    public String getFlatUser(@PathVariable String flatKey) throws AppBaseException {
        return flatService.getFlatUser(flatKey);
    }

    @RolesAllowed({"admin", "manager"})
    @PatchMapping("/flat")
    public void arrangeFlat(@RequestBody ArrangeFlatRequest request) throws AppBaseException {
        flatService.arrangeFlat(request);
    }
}
