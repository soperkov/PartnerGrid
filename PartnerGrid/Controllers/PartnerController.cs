﻿using Microsoft.AspNetCore.Mvc;
using PartnerGrid.Databases;
using PartnerGrid.Interfaces;
using PartnerGrid.Models;

namespace PartnerGrid.Controllers
{
    public class PartnerController : Controller
    {
        private readonly IRepository<PartnerModel> _partnerRepository;

        public PartnerController (IRepository<PartnerModel> partnerRepository)
        {
            _partnerRepository = partnerRepository;
        }   

        public async Task<IActionResult> Index()
        {
            var partners = await _partnerRepository.GetAllAsync();
            return View(partners);
        }

        public async Task<IActionResult> Details(int id)
        {
            var partner = await _partnerRepository.GetByIdAsync(id);
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
                await _partnerRepository.CreateAsync(model);
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, PartnerModel model)
        {
            if (id != model.PartnerId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                await _partnerRepository.UpdateAsync(model);
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _partnerRepository.DeleteAsync(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
