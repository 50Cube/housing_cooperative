package pl.lodz.p.accounts.services;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.accounts.entities.Account;
import pl.lodz.p.accounts.mappers.AccountMapper;
import pl.lodz.p.accounts.repositories.AccountRepository;
import pl.lodz.p.common.dto.AccountDto;
import pl.lodz.p.common.dto.FlatDto;
import pl.lodz.p.common.exceptions.AccountAlreadyExistsException;
import pl.lodz.p.common.exceptions.AccountNotFoundException;
import pl.lodz.p.common.exceptions.AppBaseException;
import pl.lodz.p.common.exceptions.EmptyRolesException;

import javax.persistence.PersistenceException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = AppBaseException.class)
public class AccountService {

    @Value("${keycloak.realm}")
    private String realm;

    private final AccountRepository accountRepository;
    private final FlatServiceClient flatServiceClient;
    private final Keycloak keycloak;

    public void addAccount(AccountDto accountDto) throws AppBaseException {
        Account account = AccountMapper.toEntity(accountDto);
        try {
            accountRepository.saveAndFlush(account);
        } catch (PersistenceException | DataAccessException e) {
            if (e.getMessage().contains("login_unique")
                    || e.getMessage().contains("email_unique")) {
                throw new AccountAlreadyExistsException(e);
            } else {
                throw new AppBaseException(e);
            }
        }
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setType("password");
        credentialRepresentation.setValue(accountDto.getPassword());
        credentialRepresentation.setTemporary(false);

        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(accountDto.getLogin());
        userRepresentation.setEnabled(true);
        userRepresentation.setCredentials(List.of(credentialRepresentation));
        userRepresentation.setGroups(List.of("client"));
        keycloak.realm(realm).users().create(userRepresentation);
    }

    public AccountDto getAccount(String login) throws AppBaseException {
        AccountDto accountDto = AccountMapper.toDto(accountRepository.findAccountByLogin(login)
                .orElseThrow(AccountNotFoundException::new));
        UserResource userResource = getKeycloakUserResourceByLogin(login);
        accountDto.setAccessLevels(userResource.groups().stream().map(GroupRepresentation::getName).toList());
        return accountDto;
    }

    private UserResource getKeycloakUserResourceByLogin(String login) throws AppBaseException {
        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().search(login);
        if(userRepresentations.isEmpty()) throw new AccountNotFoundException();
        return  keycloak.realm(realm).users().get(userRepresentations.get(0).getId());
    }

    public List<AccountDto> getAccounts() {
        List<AccountDto> accountDtos = AccountMapper.toDtos(accountRepository.findAll());
        Map<String, UserResource> users = new HashMap<>();
        List<UserRepresentation> userRepresentations = keycloak.realm(realm).users().list();
        for(UserRepresentation user : userRepresentations)
            users.put(user.getUsername(), keycloak.realm(realm).users().get(user.getId()));
        for(AccountDto accountDto : accountDtos)
            accountDto.setAccessLevels(users.get(accountDto.getLogin()).groups().stream().map(GroupRepresentation::getName).toList());
        return accountDtos;
    }

    public List<AccountDto> getAccountsByLogin(List<String> logins) {
        return AccountMapper.toDtos(accountRepository.findAllByLoginIn(logins));
    }

    public void changeRole(String login, String role) throws AppBaseException {
        UserResource userResource = getKeycloakUserResourceByLogin(login);
        for(GroupRepresentation groupRepresentation : userResource.groups()) {
            if(groupRepresentation.getName().equalsIgnoreCase(role)) {
                if(userResource.groups().size() < 2) throw new EmptyRolesException();
                userResource.leaveGroup(groupRepresentation.getId());
                return;
            }
        }
        GroupRepresentation groupRepresentation = keycloak.realm(realm).groups().groups()
                .stream().filter(group -> group.getName().equalsIgnoreCase(role)).findFirst()
                .orElseThrow(AppBaseException::new);
        userResource.joinGroup(groupRepresentation.getId());
    }

    public List<AccountDto> getAccountsWithFlat() {
        List<FlatDto> flats = flatServiceClient.getFlats();
        return AccountMapper.toDtos(accountRepository.findAllByLoginIn(flats.stream().map(flat -> flat.getAccountDto().getLogin()).toList()));
    }
}
