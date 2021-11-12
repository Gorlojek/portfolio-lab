package pl.coderslab.charity.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "institution")
@Data
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
}
