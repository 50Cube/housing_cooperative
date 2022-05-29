package pl.lodz.p.bills.services;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.lodz.p.common.dto.BillDto;
import pl.lodz.p.common.exceptions.AppBaseException;

import java.io.ByteArrayOutputStream;
import java.text.DecimalFormat;
import java.util.List;

@Slf4j
@Service
public class PdfService {

    public byte[] generatePdf(List<BillDto> list) throws AppBaseException {
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, byteArrayOutputStream);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.addCell("Identyfikator");
            table.addCell("Przedmiot");
            table.addCell("Termin");
            table.addCell("Koszt");
            table.addCell("Status");

            DecimalFormat decimalFormat = new DecimalFormat("#.##");
            for (BillDto billDto : list) {
                table.addCell(billDto.getBusinessKey());
                table.addCell(billDto.getBillType());
                table.addCell(billDto.getDeadline());
                table.addCell(decimalFormat.format(billDto.getTotalCost()));
                if (billDto.isPaid()) table.addCell("OPLACONY");
                else table.addCell("NIEOPLACONY");
            }

            document.open();
            document.add(new Paragraph("Wykaz rachunków"));
            document.add(new Paragraph(Chunk.NEWLINE));
            document.add(table);
            document.close();
            return byteArrayOutputStream.toByteArray();
        } catch (Exception e) {
            log.error("An error occurred during PDF generation", e);
            throw new AppBaseException("pdf.error");
        }
    }
}
