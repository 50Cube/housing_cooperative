package pl.lodz.p.flats.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import pl.lodz.p.common.dto.AccountDto;
import pl.lodz.p.flats.configuration.FeignConfig;

import java.util.List;

@FeignClient(value = "ACCOUNTS-SERVICE", configuration = FeignConfig.class)
public interface AccountServiceClient {

    @GetMapping("/accounts/{login}")
    AccountDto getAccount(@PathVariable String login);

    @GetMapping("/accountsByLogin")
    List<AccountDto> getAccountsByLogin(@RequestParam List<String> logins);
}
