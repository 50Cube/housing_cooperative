package pl.lodz.p.flats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.flats.entities.Building;

public interface BuildingRepository extends JpaRepository<Building, Long> {
}
