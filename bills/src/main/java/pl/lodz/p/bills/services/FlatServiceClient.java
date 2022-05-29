package pl.lodz.p.bills.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.lodz.p.bills.configuration.FeignConfig;

@FeignClient(value = "FLATS-SERVICE", configuration = FeignConfig.class)
public interface FlatServiceClient {

    @GetMapping("/flatUser/{flatKey}")
    String getFlatUser(@PathVariable String flatKey);
}
