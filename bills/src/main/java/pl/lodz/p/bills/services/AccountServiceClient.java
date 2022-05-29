package pl.lodz.p.bills.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.lodz.p.bills.configuration.FeignConfig;
import pl.lodz.p.common.dto.AccountDto;

import java.util.List;

@FeignClient(value = "ACCOUNTS-SERVICE", configuration = FeignConfig.class)
public interface AccountServiceClient {

    @GetMapping("/accounts/{login}")
    AccountDto getAccount(@PathVariable String login);

    @GetMapping("/accounts")
    List<AccountDto> getAccounts();
}
