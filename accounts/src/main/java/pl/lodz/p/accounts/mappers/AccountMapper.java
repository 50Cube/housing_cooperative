package pl.lodz.p.accounts.mappers;

import lombok.experimental.UtilityClass;
import pl.lodz.p.accounts.entities.Account;
import pl.lodz.p.common.dto.AccountDto;

import java.util.List;

@UtilityClass
public class AccountMapper {

    public Account toEntity(AccountDto dto) {
        return Account.builder()
                .login(dto.getLogin())
                .firstname(dto.getFirstname())
                .lastname(dto.getLastname())
                .email(dto.getEmail())
                .build();
    }

    public AccountDto toDto(Account entity) {
        return AccountDto.builder()
                .login(entity.getLogin())
                .firstname(entity.getFirstname())
                .lastname(entity.getLastname())
                .email(entity.getEmail())
                .build();
    }

    public List<AccountDto> toDtos(List<Account> entities) {
        return entities.stream()
                .map(AccountMapper::toDto)
                .toList();
    }
}
