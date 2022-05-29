package pl.lodz.p.accounts.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.accounts.entities.Account;
import pl.lodz.p.common.exceptions.AppBaseException;

import java.util.List;
import java.util.Optional;

@Transactional(rollbackFor = AppBaseException.class)
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findAccountByLogin(String login);
    List<Account> findAllByLoginIn(List<String> logins);
}
