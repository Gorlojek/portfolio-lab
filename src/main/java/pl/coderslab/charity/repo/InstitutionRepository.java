package pl.coderslab.charity.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.coderslab.charity.entity.Category;
import pl.coderslab.charity.entity.Institution;

public interface InstitutionRepository extends JpaRepository<Institution,Long> {
}
