package pl.lodz.p.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BillDto {

    private String businessKey;
    private BigDecimal cost;
    private BigDecimal totalCost;
    private String deadline;
    private boolean paid;
    private String billType;
    private AccountDto accountDto;
}
