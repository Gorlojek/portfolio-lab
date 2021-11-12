package pl.coderslab.charity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.entity.Category;
import pl.coderslab.charity.entity.Donation;
import pl.coderslab.charity.repo.CategoryRepository;
import pl.coderslab.charity.repo.DonationRepository;
import pl.coderslab.charity.repo.InstitutionRepository;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;

@Controller
public class DonationController {
    private final InstitutionRepository institutionRepository;
    private final CategoryRepository categoryRepository;
    private final DonationRepository donationRepository;

    public DonationController(InstitutionRepository institutionRepository, CategoryRepository categoryRepository, DonationRepository donationRepository) {
        this.institutionRepository = institutionRepository;
        this.categoryRepository = categoryRepository;
        this.donationRepository = donationRepository;
    }

    @GetMapping("/form")
    public String createForm(Model model,HttpSession session){
        model.addAttribute("donation", new Donation());
        model.addAttribute("categories",categoryRepository.findAll());
        model.addAttribute("institutions",institutionRepository.findAll());
        session.setAttribute("donation",new Donation());
        return "form";
    }
    @GetMapping("/form-sum")
    public String formSum(HttpSession session,Model model){
        Donation donation = (Donation) session.getAttribute("savedDonation");
        model.addAttribute("donation",donation);
        return "form-sum";
    }
    @PostMapping("/form-sum")
    public String create(HttpSession session){

        Donation donation = (Donation) session.getAttribute("savedDonation");

        donationRepository.save(donation);
        return "redirect:/form-confirmation";
    }

    @PostMapping("/form")
    public String saveDonationToSession(@ModelAttribute("donation") Donation donation, HttpSession session, Model model){
        session.setAttribute("savedDonation", donation);
        return "redirect:/form-sum";
    }
    @RequestMapping("/form-confirmation")
    public String formConfiramtionView(Model model){

        return "form-confirmation";
    }
}
