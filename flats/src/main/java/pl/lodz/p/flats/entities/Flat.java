package pl.lodz.p.flats.entities;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Flat {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessKey;
    private int number;
    private double area;

    @ManyToOne
    private Building building;

    private String userLogin;
}
