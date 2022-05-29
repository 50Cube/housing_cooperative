package pl.lodz.p.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportMailDto implements Serializable {

    private String login;
    private String email;
    private byte[] content;
}
