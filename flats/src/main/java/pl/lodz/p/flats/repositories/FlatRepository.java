package pl.lodz.p.flats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.flats.entities.Flat;

import java.util.Optional;

public interface FlatRepository extends JpaRepository<Flat, Long> {

    Optional<Flat> findByBusinessKey(String businessKey);
    Optional<Flat> findByUserLogin(String login);
}
