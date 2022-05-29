package pl.lodz.p.bills.mappers;

import lombok.experimental.UtilityClass;
import pl.lodz.p.bills.entities.Bill;
import pl.lodz.p.bills.enums.BillType;
import pl.lodz.p.common.dto.AccountDto;
import pl.lodz.p.common.dto.BillDto;
import pl.lodz.p.common.utils.DateUtils;

import java.util.List;

@UtilityClass
public class BillMapper {

    public BillDto toDto(Bill bill) {
        return BillDto.builder()
                .businessKey(bill.getBusinessKey())
                .cost(bill.getCost())
                .totalCost(bill.getTotalCost())
                .deadline(DateUtils.dateToString(bill.getDeadline()))
                .paid(bill.isPaid())
                .billType(bill.getBillType().toString())
                .accountDto(AccountDto.builder().login(bill.getUserLogin()).build())
                .build();
    }

    public List<BillDto> toDtos(List<Bill> entities) {
        return entities.stream()
                .map(BillMapper::toDto)
                .toList();
    }

    public Bill toEntity(BillDto billDto) {
        return Bill.builder()
                .cost(billDto.getCost())
                .totalCost(billDto.getTotalCost())
                .billType(BillType.valueOf(billDto.getBillType()))
                .deadline(DateUtils.stringToDate(billDto.getDeadline()))
                .build();
    }
}
