using Microsoft.AspNetCore.Mvc;
using PartnerGrid.Databases;
using PartnerGrid.Interfaces;
using PartnerGrid.Models;

namespace PartnerGrid.Controllers
{
    public class PolicyController : Controller
    {
        private readonly IRepository<PolicyModel> _policyRepository;

        public PolicyController(IRepository<PolicyModel> policyRepository)
        {
            _policyRepository = policyRepository;
        }


        public async Task<IActionResult> Index()
        {
            var policies = await _policyRepository.GetAllAsync();
            return View(policies);
        }

        public async Task<IActionResult> Details(int id)
        {
            var policy = await _policyRepository.GetByIdAsync(id);
            if (policy == null)
            {
                return NotFound();
            }
            return View(policy);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PolicyModel model)
        {
            if (ModelState.IsValid)
            {
                await _policyRepository.CreateAsync(model);
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, PolicyModel model)
        {
            if (id != model.PolicyId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                await _policyRepository.UpdateAsync(model);
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _policyRepository.DeleteAsync(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
