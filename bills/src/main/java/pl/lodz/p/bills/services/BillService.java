package pl.lodz.p.bills.services;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import pl.lodz.p.bills.entities.Bill;
import pl.lodz.p.bills.mappers.BillMapper;
import pl.lodz.p.bills.repositories.BillRepository;
import pl.lodz.p.common.dto.AccountDto;
import pl.lodz.p.common.dto.BillDto;
import pl.lodz.p.common.dto.ReportMailDto;
import pl.lodz.p.common.exceptions.AppBaseException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final AccountServiceClient accountServiceClient;
    private final FlatServiceClient flatServiceClient;
    private final PdfService pdfService;
    private final RabbitTemplate rabbitTemplate;

    public void markAsPaid(String key) throws AppBaseException {
        Bill bill = billRepository.findByBusinessKey(key)
                .orElseThrow(() -> new AppBaseException("unexpected.error"));
        bill.setPaid(true);
        billRepository.saveAndFlush(bill);
    }

    public List<BillDto> getBills() {
        return BillMapper.toDtos(billRepository.findAll());
    }

    public void createBill(BillDto billDto) {
        Bill bill = BillMapper.toEntity(billDto);
        bill.setBusinessKey(UUID.randomUUID().toString());
        bill.setPaid(false);
        AccountDto accountDto = accountServiceClient.getAccount(billDto.getAccountDto().getLogin());
        bill.setUserLogin(accountDto.getLogin());
        billRepository.saveAndFlush(bill);
    }

    public List<BillDto> getBillsForUser(String login) {
        return BillMapper.toDtos(billRepository.findAllByUserLogin(login));
    }

    public List<BillDto> getBillsForFlat(String flatKey) {
        return BillMapper.toDtos(billRepository.findAllByUserLogin(flatServiceClient.getFlatUser(flatKey)));
    }

    public List<BillDto> getBillsPdf(String login) throws AppBaseException {
        try {
            return billRepository.findAll().stream()
                    .filter(bill -> bill.getUserLogin().equals(login))
                    .filter(bill -> bill.getDeadline().isAfter(LocalDate.now().minusDays(30))
                            || bill.getDeadline().isBefore(LocalDate.now().plusDays(30)))
                    .map(BillMapper::toDto)
                    .toList();
        } catch (DataAccessException e) {
            throw new AppBaseException("unexpected.error");
        }
    }

    public void sendReports() throws AppBaseException {
        List<ReportMailDto> reportMails = new ArrayList<>();
        for (AccountDto account : accountServiceClient.getAccounts()) {
            List<BillDto> bills = getReportBills(account.getLogin());
            reportMails.add(ReportMailDto.builder()
                    .login(account.getLogin())
                    .email(account.getEmail())
                    .content(pdfService.generatePdf(bills))
                    .build());
        }
        rabbitTemplate.convertAndSend("nsai", reportMails);
    }

    private List<BillDto> getReportBills(String login) {
        return billRepository.findAll().stream()
                .filter(bill -> bill.getUserLogin().equals(login))
                .filter(bill -> !bill.isPaid())
                .map(BillMapper::toDto)
                .toList();
    }
}
