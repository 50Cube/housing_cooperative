package pl.lodz.p.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlatDto {

    private String businessKey;
    private int number;
    private double area;
    private AccountDto accountDto;
    private String buildingInfo;
}
