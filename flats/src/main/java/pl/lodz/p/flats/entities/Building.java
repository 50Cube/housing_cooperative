package pl.lodz.p.flats.entities;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Building {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessKey;
    private String name;
    private String city;
    private String street;

    @OneToMany(mappedBy = "building", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private List<Flat> flats = new ArrayList<>();
}
