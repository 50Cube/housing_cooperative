package pl.lodz.p.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {

    @Size(min = 1, max = 32)
    @Pattern(regexp = "[a-zA-Z0-9!@$^&*]+")
    private String login;

    @Size(min = 8)
    private String password;

    @Size(min = 1, max = 32)
    @Pattern(regexp = "[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+")
    private String firstname;

    @Size(min = 1, max = 32)
    @Pattern(regexp = "[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+")
    private String lastname;

    @Email
    private String email;
    private List<String> accessLevels;
}
