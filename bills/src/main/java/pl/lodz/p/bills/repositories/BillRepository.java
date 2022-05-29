package pl.lodz.p.bills.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.bills.entities.Bill;

import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {

    Optional<Bill> findByBusinessKey(String businessKey);
    List<Bill> findAllByUserLogin(String login);
}
