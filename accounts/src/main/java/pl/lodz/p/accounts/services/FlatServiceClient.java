package pl.lodz.p.accounts.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import pl.lodz.p.accounts.configuration.FeignConfig;
import pl.lodz.p.common.dto.FlatDto;

import java.util.List;

@FeignClient(value = "FLATS-SERVICE", configuration = FeignConfig.class)
public interface FlatServiceClient {

    @GetMapping("/flats")
    List<FlatDto> getFlats();
}
