using Microsoft.AspNetCore.Mvc;
using PartnerGrid.Databases;
using PartnerGrid.Models;

namespace PartnerGrid.Controllers
{
    public class PartnerController : Controller
    {
        private readonly PartnerRepository _partnerRepository;

        public PartnerController (PartnerRepository partnerRepository)
        {
            _partnerRepository = partnerRepository;
        }   

        public async Task<IActionResult> Index()
        {
            var partners = await _partnerRepository.GetAllPartnersAsync();
            return View(partners);
        }

        public async Task<IActionResult> Details(int id)
        {
            var partner = await _partnerRepository.GetPartnerByIdAsync(id);
            if (partner == null)
            {
                return NotFound();
            }
            return View(partner);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PartnerModel model)
        {
            if (ModelState.IsValid)
            {
                await _partnerRepository.CreatePartnerAsync(model);
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }
    }
}
