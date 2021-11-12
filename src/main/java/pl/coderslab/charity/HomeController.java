package pl.coderslab.charity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.repo.DonationRepository;
import pl.coderslab.charity.repo.InstitutionRepository;

import java.util.List;


@Controller
public class HomeController {
    private final InstitutionRepository institutionRepository;
    private final DonationRepository donationRepository;
    public HomeController(InstitutionRepository institutionRepository, DonationRepository donationRepository){
        this.institutionRepository = institutionRepository;
        this.donationRepository = donationRepository;
    }
    private List<Institution> institutions;

    @RequestMapping("/")
    public String homeAction(Model model){
        institutions = institutionRepository.findAll();
        model.addAttribute("institutions",institutions);
        model.addAttribute("sumOfAllBags",getSumOfAllBags());
        model.addAttribute("sumOfAllDonations",getSumOfAllDonations());
        return "index";
    }


    private Integer getSumOfAllBags(){
        if(donationRepository.sumOfAllBags()!=null){
            return donationRepository.sumOfAllBags();
        }
        return 0;
    }
    private Integer getSumOfAllDonations(){
        if(donationRepository.sumOfAllDonations()!=null){
            return donationRepository.sumOfAllDonations();
        }
        return 0;
    }
}
