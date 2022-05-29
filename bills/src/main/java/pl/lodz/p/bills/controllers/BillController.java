package pl.lodz.p.bills.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.bills.enums.BillType;
import pl.lodz.p.bills.services.BillService;
import pl.lodz.p.bills.services.PdfService;
import pl.lodz.p.common.dto.BillDto;
import pl.lodz.p.common.exceptions.AppBaseException;

import javax.annotation.security.RolesAllowed;
import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    private final PdfService pdfService;

    @RolesAllowed("manager")
    @PatchMapping("/bills/{key}")
    public void markBillAsPaid(@PathVariable String key) throws AppBaseException {
        billService.markAsPaid(key);
    }

    @RolesAllowed("manager")
    @GetMapping("/bills/types")
    public List<String> getBillTypes() {
        return Arrays.stream(BillType.values()).map(Enum::toString).toList();
    }

    @RolesAllowed("manager")
    @GetMapping("/bills")
    public List<BillDto> getBills() {
        return billService.getBills();
    }

    @RolesAllowed("manager")
    @PostMapping("/bills")
    public void createBill(@RequestBody BillDto billDto) {
        billService.createBill(billDto);
    }

    @RolesAllowed({"manager", "client"})
    @GetMapping("/billsForUser/{login}")
    public List<BillDto> getBillsForUser(@PathVariable String login) {
        return billService.getBillsForUser(login);
    }

    @RolesAllowed("manager")
    @GetMapping("/billsForFlat/{flatKey}")
    public List<BillDto> getBillsForFlat(@PathVariable String flatKey) {
        return billService.getBillsForFlat(flatKey);
    }

    @RolesAllowed("manager")
    @GetMapping("/reports")
    public void sendReports() throws AppBaseException {
        billService.sendReports();
    }

    @RolesAllowed("client")
    @GetMapping(value = "/billPdf/{login}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<?> generatePdf(@PathVariable String login) {
        try {
            List<BillDto> bills = billService.getBillsPdf(login);

            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(pdfService.generatePdf(bills));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + login + "-" + LocalDate.now() + ".pdf");

            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(byteArrayInputStream));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("unexpected.error");
        }
    }
}
