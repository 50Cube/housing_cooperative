package pl.lodz.p.bills.entities;

import lombok.*;
import pl.lodz.p.bills.enums.BillType;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bill {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessKey;
    private BigDecimal cost;
    private BigDecimal totalCost;
    private LocalDate deadline;
    private boolean paid;

    @Enumerated(EnumType.STRING)
    private BillType billType;

    private String userLogin;
}
