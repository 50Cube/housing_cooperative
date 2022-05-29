package pl.lodz.p.accounts.entities;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "login", name = "login_unique"),
        @UniqueConstraint(columnNames = "email", name = "email_unique")
})
public class Account {

    @Id
    @Setter(lombok.AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;
    private String firstname;
    private String lastname;
    private String email;
}
