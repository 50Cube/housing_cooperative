package pl.lodz.p.accounts.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.accounts.services.AccountService;
import pl.lodz.p.common.dto.AccountDto;
import pl.lodz.p.common.exceptions.AppBaseException;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/register")
    public void addAccount(@RequestBody @Valid AccountDto account) throws AppBaseException {
        accountService.addAccount(account);
    }

    @GetMapping("/accounts/{login}")
    public AccountDto getAccount(@PathVariable String login) throws AppBaseException {
        return accountService.getAccount(login);
    }

    @RolesAllowed({"admin", "manager"})
    @GetMapping("/accounts")
    public List<AccountDto> getAccounts() {
        return accountService.getAccounts();
    }

    @RolesAllowed({"admin", "manager"})
    @GetMapping("/accountsByLogin")
    public List<AccountDto> getAccountsByLogin(@RequestParam List<String> logins) {
        return accountService.getAccountsByLogin(logins);
    }

    @RolesAllowed("admin")
    @PatchMapping("/accounts/{login}/{role}")
    public void changeRole(@PathVariable String login, @PathVariable String role) throws AppBaseException {
        accountService.changeRole(login, role);
    }

    @RolesAllowed({"admin", "manager"})
    @GetMapping("/accountsFlat")
    public List<AccountDto> getAccountsWithFlat() {
        return accountService.getAccountsWithFlat();
    }
}
